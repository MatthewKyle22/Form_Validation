import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class Form extends React.Component {
  state = {
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
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

    if (
      this.state.firstName.length <= 1 ||
      this.state.firstName.match("[0-9]")
    ) {
      isError = true;
      errors.firstNameError =
        "First name needs to be atleast 2 characters long and contain only letters";
    }
    if (this.state.lastName.length <= 1 || this.state.lastName.match("[0-9]")) {
      isError = true;
      errors.lastNameError =
        "Last name needs to be atleast 2 characters long and contain only letters";
      // alert(
      //   "Last name needs to be atleast 2 characters long and contain only letters"
      // );
    }
    if (this.state.username.length <= 4) {
      isError = true;
      errors.usernameError = "Username needs to be atleast 4 characters long";
      // alert("Username needs to be atleast 4 characters long");
    }
    if (this.state.email.indexOf("@") === -1) {
      isError = true;
      errors.emailError = "Email is Invalid";
      // alert("Email is Invalid");
    }
    if (
      (this.state.password.length | this.state.confirmPassword.length) ===
      0
    ) {
      isError = true;
      errors.passwordError = "You must create a password";
    }
    if (this.state.password !== this.state.confirmPassword) {
      isError = true;
      errors.passwordError = "Your passwords do not match!";
      // alert("Your passwords do not match!");
    }
    if (isError === false) {
      alert("~!~!~VALID~!~!~");
    }
    this.setState({
      ...this.state,
      ...errors
    });

    console.log(errors);
    return isError;
  };

  onSubmit = event => {
    event.preventDefault();
    const err = this.validate();
    if (!err) {
      // this clears form inputs
      this.setState({
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",
        username: "",
        usernameError: "",
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
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
      document.getElementById("password").value !==
      document.getElementById("confirm_password").value
    ) {
      document.getElementById("message").style.color = "red";
      document.getElementById("message").innerHTMl = "not matching";
    } else {
      document.getElementById("message").style.color = "green";
      document.getElementById("message").innerHTML = "matching";
    }
  };

  render() {
    return (
      <form>
        <TextField
          name="firstName"
          floatingLabelText="First Name"
          value={this.state.firstName}
          onChange={event => this.change(event)}
          errorText={this.state.firstNameError}
        />
        <br />
        <TextField
          name="lastName"
          floatingLabelText="Last Name"
          errorText={this.state.lastNameError}
          value={this.state.lastName}
          onChange={event => this.change(event)}
        />
        <br />
        <TextField
          name="username"
          floatingLabelText="Username"
          errorText={this.state.usernameError}
          value={this.state.username}
          onChange={event => this.change(event)}
        />
        <br />
        <TextField
          name="email"
          floatingLabelText="Email"
          errorText={this.state.emailError}
          value={this.state.email}
          onChange={event => this.change(event)}
        />
        <br />
        <TextField
          name="password"
          type="password"
          floatingLabelText="Password"
          errorText={this.state.passwordError}
          id="password"
          value={this.state.password}
          onChange={event => this.change(event)}
          // Will check while client is typing
          onKeyUp={event => this.check(event)}
        />
        <TextField
          name="confirmPassword"
          type="password"
          floatingLabelText="Confirm Password"
          errorText={this.state.passwordError}
          id="confirm_password"
          value={this.state.confirmPassword}
          onChange={event => this.change(event)}
          // Will check while client is typing
          onKeyUp={event => this.check(event)}
        />
        <br />
        <span id="message" />
        <br />
        <RaisedButton
          label="Submit"
          onClick={event => this.onSubmit(event)}
          primary
        />
      </form>
    );
  }
}
