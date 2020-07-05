import React from "react";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      email2: "",
      password2: "",
      cfapi: "",
      cforg: "",
      cfspace: ""

    };
    
  }

  componentDidMount() {
    console.log("Hello");
    this.getData();
  }

  getData () {

      console.log("in getData()");
  }

  render() {
    const { email, password, emailB, passwordB } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={this.handleChange}
        />
        <label htmlFor="email2">Email2</label>
        <input
          name="email2"
          type="text"
          placeholder="Enter your email"
          value={email2}
          onChange={this.handleChange}
        />
        <label htmlFor="password2">Password2</label>
        <input
          name="password2"
          type="password"
          placeholder="Enter your password"
          value={password2}
          onChange={this.handleChange}
        />
        <label htmlFor="cfapi">cfapi</label>
        <input
          name="cfapi"
          type="text"
          placeholder="Enter CF endpoint"
          value={cfapi}
          onChange={this.handleChange}
        />
        <label htmlFor="cforg">cforg</label>
        <input
          name="cforg"
          type="text"
          placeholder="Enter CF Org"
          value={cforg}
          onChange={this.handleChange}
        />
        <label htmlFor="cfspace">cfspace</label>
        <input
          name="cfspace"
          type="text"
          placeholder="Enter CF Space"
          value={cfspace}
          onChange={this.handleChange}
        />
        
        <button type="submit">Submit</button>
      </form>
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    console.log("Submitting");
    console.log(this.state);
  };
}
