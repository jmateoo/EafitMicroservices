import React, { Component } from 'react'
import { Toast, ToastHeader, ToastBody } from 'reactstrap'

class NotificationToast extends Component {
    constructor(props) {
        super(props)
        this.state = {
          visible: false,
          message: '',
          success: null
        }
    }

    componentDidMount(){
        this.setState({ 
            visible: this.props.visible,
            message: this.props.message,
            success: this.props.success
        });
      }

    render() {
        const closeBtn = <button className="close" >&times;</button>

        return (
            <Toast className={(this.state.success) ? "bg-success" : "bg-danger"} close={closeBtn}>
                <ToastHeader toggle={function noRefCheck(){}} color={(this.state.success) ? "success" : "danger"}>
                    {(this.state.success) ? "Successful" : "Failed"}
                </ToastHeader>
                <ToastBody>
                {this.state.message}
                </ToastBody>
            </Toast>
        )
    }
}

// class NotificationModal extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       modal: false
//     }
//   }

//   toggle = () => {
//     this.setState(prevState => ({
//       modal: !prevState.modal
//     }))
//   }

//   render() {
//       const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>
//       return (
//       <div>
//         <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
//           <ModalHeader toggle={this.toggle} close={closeBtn}>{(this.props.success) ? "Successful" : "Failed"}</ModalHeader>
//           <ModalBody>
//           </ModalBody>
//         </Modal>
//       </div>
//     )
//   }
// }

export default NotificationToast;