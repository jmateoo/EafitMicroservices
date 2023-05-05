import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitForm = e => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_HOST}/auth/signin`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      credentials: "include"
    })
    .then(response => response.json())
    .then(payload => {
      if (payload.statusCode >= 200 && payload.statusCode < 300) {
        window.location.reload(true);
      }
      else {
        window.alert(`Failure\n${payload.message}`)
      }
    })
    .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    // if(this.props.item){
    //   const { id, BicycleId, color, model, lat, long } = this.props.item;
    //   const bicycleid = BicycleId;
    //   this.setState({ id, bicycleid, color, model, lat, long });
    // }
  }

  render() {
    return (
      <Form onSubmit={this.submitForm}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" onChange={this.onChange} value={this.state.password === null ? '' : this.state.password}  />
        </FormGroup>
        <Button>Login</Button>
      </Form>
    );
  }
}

export default LoginForm;