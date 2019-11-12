import React from 'react'
import {Col, Form, Button} from 'react-bootstrap'
import {Typeahead} from 'react-bootstrap-typeahead'
import "./DriverForm.css"
import FileUploader from 'react-firebase-file-uploader'
import firebase from 'firebase'
const DriverForm = (props) => (

    <Col>
    <h3>Driver Details</h3>
    <Form>
    <Form.Group controlId="driverfirstname">
        <Form.Label >First Name</Form.Label>
        <Form.Control id="driverfirstname" type="text" defaultValue={props.checked ?  props.placeholder.firstname : ""} />
    </Form.Group>

    <Form.Group controlId="lastname">
        <Form.Label >Last Name</Form.Label>
        <Form.Control id="driverlastname" type="text" defaultValue={props.checked ?  props.placeholder.lastname : ""} />
    </Form.Group>

    <Form.Group controlId="driveraddress">
    <Form.Label>Address</Form.Label>
    <Typeahead
            className="address"
            defaultInputValue ={props.checked ?  props.placeholder.address : ""}
            onInputChange={(value) => {
                props.addressFetch(value)
                }
            }
            options={props.autofill}/> 
  </Form.Group>

    <Form.Group controlId="licenceno">
        <FileUploader 
            accept="image/*" 
            storageRef={firebase.storage().ref("images")}
            name="images"
            onUploadStart={props.uploadStart}
            onUploadSuccess={props.uploadSuccess}
        />
    </Form.Group>
</Form>
<Col id="buttonGroup">
<Button id="backButton" variant="success" type="" onClick={props.prevStep} >
    Previous Step
  </Button>

  <Button id="submitButton" variant="success" type="submit" onClick={props.nextStep} >
    Next Step
  </Button>
</Col>
</Col>
)

export default DriverForm