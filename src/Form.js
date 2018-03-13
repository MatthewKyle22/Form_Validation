import React from "react";

export default class Form extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  change = event => {
    this.props.onChange({ [event.target.name]: event.target.value });
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      firstNameError: "",
      lastNameError: "",
      usernameError: "",
      emailError: "",
      passwordError: ""
    };
    // why is NaN not validating..
    if (this.state.firstName.length <= 1) {
      isError = true;
      alert("First name needs to be atleast 2 characters long");
    }
    if (this.state.lastName.length <= 1) {
      isError = true;
      alert("Last name needs to be atleast 2 characters long");
    }
    if (this.state.username.length <= 4) {
      alert("Username needs to be atleast 4 characters long");
    }
    if (this.state.email.indexOf("@") === -1) {
      isError = true;
      alert("Email is Invalid");
    }
    if (this.state.password !== this.state.confirmPassword) {
      isError = true;
      alert("Your passwords do not match!");
    }
  };

  onSubmit = event => {
    event.preventDefault();
    const err = this.validate();
    if (!err) {
      // this clears form inputs
      this.setState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      this.props.onChange({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    }
  };

  // Will check while client is typing
  check = event => {
    if (
      document.getElementById("password").value ===
      document.getElementById("confirm_password").value
    ) {
      document.getElementById("message").style.color = "green";
      document.getElementById("message").innerHTML = "matching";
    } else {
      document.getElementById("message").style.color = "red";
      document.getElementById("message").innerHTMl = "not matching";
    }
  };

  render() {
    return (
      <form>
        <input
          name="firstName"
          placeholder="First name"
          value={this.state.firstName}
          onChange={event => this.change(event)}
        />
        <br />
        <input
          name="lastName"
          placeholder="Last name"
          value={this.state.lastName}
          onChange={event => this.change(event)}
        />
        <br />
        <input
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={event => this.change(event)}
        />
        <br />
        <input
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={event => this.change(event)}
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          id="password"
          value={this.state.password}
          onChange={event => this.change(event)}
          // Will check while client is typing
          onKeyUp={event => this.check(event)}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          id="confirm_password"
          value={this.state.confirmPassword}
          onChange={event => this.change(event)}
          // Will check while client is typing
          onKeyUp={event => this.check(event)}
        />
        <span id="message" />

        <br />
        <button onClick={event => this.onSubmit(event)}>Submit</button>
      </form>
    );
  }
}
