import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
// import NotificationToast from "../Modals/NotificationModal.js"

class AddEditForm extends React.Component {
  state = {
    id: null,
    color: '',
    model: '',
    lat: null,
    long: null,
    success: null,
    message: '',
    notificationToogle: false
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_HOST}/bicycles`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        color: this.state.color,
        model: this.state.model,
        lat: this.state.lat,
        long: this.state.long,
      }),
      credentials: "include"
    })
    .then(response => response.json())
    .then(payload => {
      if (payload.statusCode >= 200 && payload.statusCode < 300) {
        window.alert(`Successfull\n${payload.message}`)
        // this.props.updateNotificationState({
        // visible: true,
        // message: payload.message,
        // success: true,
        // })
      }
      else {
        window.alert(`Failure\n${payload.message}`)
        // this.props.updateNotificationState({
        // visible: true,
        // message: payload.message,
        // success: false,
        // })
      }
      return payload;
    })
    .then(payload => payload.result)
    .then(item => {
      this.props.addItemToState(item);
      this.props.toggle();
    })
    .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_HOST}/bicycles/${this.state.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        color: this.state.color,
        model: this.state.model,
        lat: this.state.lat,
        long: this.state.long,
      }),
      credentials: "include"
    })
    .then(response => response.json())
    .then(payload => {
      if (payload.statusCode >= 200 && payload.statusCode < 300) {
        console.log(payload)
        window.alert(`Successfull\n${payload.message}`)
        // this.props.updateNotificationState({
        // visible: true,
        // message: payload.message,
        // success: true,
        // })
      }
      else {
        console.log(payload)
        window.alert(`Failure\n${payload.message}`)
        // this.props.updateNotificationState({
        // visible: true,
        // message: payload.message,
        // success: false,
        // })
      }
      return payload
    })
    .then(payload => payload.result)
    .then(item => {
      // console.log("item:", item);
      this.props.updateState(item);
      this.props.toggle();
    })
    .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, color, model, lat, long } = this.props.item;
      this.setState({ id, color, model, lat, long });
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        {/* <NotificationToast success={this.state.success} message={this.state.message} visible={this.state.visible}>
        </NotificationToast> */}
        <FormGroup>
          <Label for="id">ID</Label>
          <Input readOnly type="text" name="id" id="id" onChange={this.onChange} value={this.state.id === null ? '' : this.state.id} />
        </FormGroup>
        <FormGroup>
          <Label for="color">Color</Label>
          <Input type="text" name="color" id="color" onChange={this.onChange} value={this.state.color === null ? '' : this.state.color}  />
        </FormGroup>
        <FormGroup>
          <Label for="model">Model</Label>
          <Input type="model" name="model" id="model" onChange={this.onChange} value={this.state.model === null ? '' : this.state.model}  />
        </FormGroup>
        <FormGroup>
          <Label for="lat">Latitude</Label>
          <Input type="text" name="lat" id="lat" onChange={this.onChange} value={this.state.lat === null ? '' : this.state.lat}  />
        </FormGroup>
        <FormGroup>
          <Label for="long">Longitude</Label>
          <Input type="text" name="long" id="long" onChange={this.onChange} value={this.state.long === null ? '' : this.state.long}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm