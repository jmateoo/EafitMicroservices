import React, { Component } from 'react'

import { Col, Container, Row, Button } from 'reactstrap'
import DataTable from './Components/Tables/DataTable'
import MapMarkers from './Components/Tables/MapMarkers'
import ModalForm from './Components/Modals/Modal'
import LoginModal from './Components/Modals/LoginModal'
import SignupModal from './Components/Modals/SignupModal'
import NotificationToast from './Components/Modals/NotificationToast'


class App extends Component {
  state = {
    items: [],
    isSignedIn: false,
    averageLocation: [52.51, 13.38],
    visible: false,
    message: '',
    success: null,
  }
  
  constructor(props) {
    super(props);
    this.checkSignin = this.checkSignin.bind(this);
    this.signout = this.signout.bind(this);
    this.getButton = this.getButton.bind(this);
    this.getAverageLocation = this.getAverageLocation.bind(this);
  } 

  checkSignin(){
    fetch(`${process.env.REACT_APP_HOST}/auth/checksignin`, { method: "post", credentials: "include"})
      .then(response => {
        if(!response.ok) this.setState({isSignedIn: false});
        else this.setState({isSignedIn: true});
      })
  }

  signout() {
    fetch(`${process.env.REACT_APP_HOST}/auth/signout`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    })
    .then(response => {
      this.setState({isSignedIn: false, items: []})
    })
    // .then(response => {
    //   window.location.reload(true);
    // })
      .catch(err => console.log(err))
  }

  getItems(){
    console.log("get_items");
    fetch(`${process.env.REACT_APP_HOST}/bicycles`, {credentials: "include"})
      .then(response => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then(response => response.result)
      .then(items => this.setState({items: items, averageLocation: this.getAverageLocation(items)}))
      .catch(err => {
        // this.setState({items: [{id: null, color: "", model: "Login failed!", lat: null, long: null}]});
        console.log(err);
      });
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }), () => this.setState({averageLocation: this.getAverageLocation(this.state.items)}));
  }

  updateNotificationState = ({ visible, success, message }) => {
    this.setState({
      visible,
      message,
      success
    });
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray }, () => this.setState({averageLocation: this.getAverageLocation(this.state.items)}));
    // window.location.reload(true);
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems });
    // window.location.reload(true);
  }

  getButton() {
    if (this.state.isSignedIn) {
      return (
        <Row>
          <Col md={2} lg={2}>
            <Button color="danger" onClick={this.signout}>Sign Out</Button>
          </Col>
        </Row>
      )
    }
    else {
      return (
      <Row>
        <Col md={2} lg={2}>
          <LoginModal buttonLabel="Login"/>
        </Col>
        <Col md={2} lg={2}>
          <SignupModal buttonLabel="Signup"/>
        </Col>
        <Col md={10} lg={10}>
        </Col>
      </Row>)
    }
  }

  getAverageLocation(items) {
    // console.log("get_average_location");
    if (!items) return this.state.averageLocation;
    let lat = 0;
    let long = 0;
    let count = 0;
    items.forEach(item => {
      if(item.lat != null && item.long != null) {
        lat += item.lat;
        long += item.long;
        count++;
      }
    });
    console.log("lat: " + lat + " long: " + long + " count: " + count)
    if (count !== 0) {
      return [lat/count, long/count];
    }
    return this.state.averageLocation;
  }

  componentDidMount(){
    this.getItems();
    this.checkSignin();
  }

  render() {
    return (
      <Container className="App">
          <br/>
          <this.getButton/>
          {/* <br/> */}
          {(this.state.visible) ? 
            <NotificationToast 
              message={this.state.message} 
              success={this.state.success} 
              updateState={this.updateNotificationState}/> : null
          }
          <Col>
            <h1 style={{margin: "20px 0"}}>Red Bicycles</h1>
          </Col>
        <Row>
          <Col>
            <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} updateNotificationState={this.updateNotificationState} />
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary"
              data={this.state.items}>
              Download CSV
            </CSVLink> */}
            <ModalForm buttonLabel="Add Bicycle" addItemToState={this.addItemToState} updateNotificationState={this.updateNotificationState}/>
          </Col>
        </Row>
        <Row>
          <MapMarkers items={this.state.items} averageLocation={this.state.averageLocation}/>
        </Row>
      </Container>
    )
  }
}

export default App