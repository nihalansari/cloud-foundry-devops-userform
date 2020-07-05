import React from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import axios from "axios";

var options = {
  token : "password123",
  SCPCFAPI : "https://api.cf.eu10.hana.ondemand.com",
  SCPCFORG  : "",
  SCPCFSPACE : ""
};
var headers = {
  Accept:         'application/json',
  Authorization:  'Basic YWRtaW46MTE4MTAyZTQzNjA4NjBkMDIyNjQ1ZTRjNTc3YjA3YzAwYQ==',
};

const JenkinsHost = "https://94764eeedcb7.ngrok.io/";

const ValidatedLoginForm = () => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        //console.log("Logging in", values);
        console.log("values.cforg :" +values.cforg);
        setSubmitting(false);
        
        let callCredsUpdate = "scriptler/run/changeCredentialUseridAndPassword.groovy?guestuserid=" 
                              + values.email 
                              + "&guestpassword=" 
                              + values.password
                              + "&guestuserid2=" 
                              + values.email2
                              + "&guestpassword2=" 
                              + values.password2;

        //step #1 update github creds   
        axios.post(JenkinsHost + callCredsUpdate ,options, {headers})
        .then(res => {
                      console.log(res.data);
                      console.log("CF SPACE: " + values.cfspace + " CF ORG: " + values.cforg);
                      //step #2 trigger jenkins pipeline job   
                      let CallRemoteJob = "job/remote-job-2/buildWithParameters?SCPCFAPI=" 
                                          + values.cfapi 
                                          + "&SCPCFSPACE=" + values.cfspace  
                                          + "&SCPCFORG=" + values.cforg;

                      axios.post( JenkinsHost + CallRemoteJob , options, {headers})
                      .then(res => {
                             console.log(res.data);
                      }).catch(err => {
                             console.log("Error from POST call: ", err);
                      });                                    
                                          
      }).catch(err => {
          console.log("Error in request to Authorize Guest User: ", err);
      });

      }, 500);
    }}

    validationSchema={Yup.object().shape({
      email: Yup.string()
        .email()
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Your enterprise github userID</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
          />
          <label htmlFor="password">Your github Personal Access Token</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            //className={errors.password && touched.password && "error"}
          />
          
   
          <label htmlFor="email2">CF userID</label>
          <input
            name="email2"
            type="text"
            placeholder="Enter your email"
            value={values.email2}
            onChange={handleChange}
            onBlur={handleBlur}
            //className={errors.email && touched.email && "error"}
          />
          
          <label htmlFor="password2">CF Password</label>
          <input
            name="password2"
            type="password"
            placeholder="Enter your password"
            value={values.password2}
            onChange={handleChange}
            onBlur={handleBlur}
            //className={errors.password && touched.password && "error"}
          />
          <label htmlFor="cfapi">CF API</label>
          <input
            name="cfapi"
            type="text"
            placeholder="Enter CF API endpoint"
            value={values.cfapi}
            onChange={handleChange}
            //onBlur={handleBlur}
          //  className={errors.email && touched.email && "error"}
          />
          
          <label htmlFor="cforg">CF Organization</label>
           <input
            name="cforg"
            type="text"
            placeholder="Enter CF org"
            value={values.cforg}
            onChange={handleChange}
            onBlur={handleBlur}
            //className={errors.email && touched.email && "error"}
          />
         
        <label htmlFor="cfspace">CF Space</label>
          <input
            name="cfspace"
            type="text"
            placeholder="Enter CF Space you wish to deploy to"
            value={values.cfspace}
            onChange={handleChange}
            onBlur={handleBlur}
         //   className={errors.email && touched.email && "error"}
          />
          
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      );
    }}
  </Formik>
);

export default ValidatedLoginForm;
