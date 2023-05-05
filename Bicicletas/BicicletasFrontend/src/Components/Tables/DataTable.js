import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import ModalForm from '../Modals/Modal';


class DataTable extends Component {
  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch(`${process.env.REACT_APP_HOST}/bicycles/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
    })
    .then(response => {
      if (response.ok) {
        window.alert(`Successfull\nDeleted successfully!`)
        // this.props.updateNotificationState({
        // visible: true,
        // message: 'Bicycle deleted successfully',
        // success: true,
        // })
      }
      else {
        window.alert(`Failure\nDelete failed!`)
        // this.props.updateNotificationState({
        // visible: true,
        // message: payload.message,
        // success: false,
        // })
      }
      return response
    })
    .then(response => {
      this.props.deleteItemFromState(id);
      // this.toggle();
    })
    .catch(err => console.log(err))
  }

  }

  render() {
    // console.log(this.props.items);
    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.color}</td>
          <td>{item.model}</td>
          <td>({item.lat}, {item.long})</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState} updateNotificationState={this.props.updateNotificationState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>
                Delete
              </Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Color</th>
            <th>Model</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable