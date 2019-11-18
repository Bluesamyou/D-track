import React from "react";
import { Col, Form, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "./CustomerForm.css";
import FileUploader from "react-firebase-file-uploader";
import firebase from "../../firebase/fire";

const uploadImage = () => {
  document.getElementById("licenceNumber").click();
};

const CustomerForm = props => (
  <Col>
    <h3>Customer Details</h3>
    <Form>
      <Form.Group controlId="firstname">
        <Form.Label>
          First Name <span style={{ color: "red" }}>*</span>{" "}
          <span style={{ color: "red" }}>{props.error.firstname}</span>
        </Form.Label>
        <Form.Control
          id="firstname"
          type="text"
          defaultValue={props.placeholder.firstname}
          onChange={props.verify}
        />
      </Form.Group>

      <Form.Group controlId="lastname">
        <Form.Label>
          Last Name <span style={{ color: "red" }}>*</span>{" "}
          <span style={{ color: "red" }}>{props.error.lastname}</span>
        </Form.Label>
        <Form.Control
          id="lastname"
          type="text"
          defaultValue={props.placeholder.lastname}
          onChange={props.verify}
        />
      </Form.Group>

      <Form.Group controlId="address">
        <Form.Label>
          Address <span style={{ color: "red" }}>*</span>{" "}
          <span style={{ color: "red" }}>{props.error.address}</span>
        </Form.Label>
        <Typeahead
          className="address"
          onInputChange={value => {
            props.addressFetch(value);
          }}
          options={props.autofill}
          // defaultInputValue={props.placeholder.address}
        />
      </Form.Group>

      <Form.Group controlId="phone">
        <Form.Label>
          Phone <span style={{ color: "red" }}>*</span>{" "}
          <span style={{ color: "red" }}>{props.error.phone}</span>
        </Form.Label>
        <Form.Control
          id="phone"
          type="tele"
          defaultValue={props.placeholder.phone}
          onChange={props.verify}
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          id="email"
          type="email"
          defaultValue={props.placeholder.email}
        />
      </Form.Group>

      <Form.Group controlId="licenceno">
        <Form.Label>
          Upload Licence Image <span style={{ color: "red" }}>*</span>{" "}
          <span style={{ color: "red" }}>{props.error.licenceno}</span>
        </Form.Label>
        <FileUploader
          id="licenceNumber"
          type="file"
          accept="image/*"
          storageRef={firebase.storage().ref("Licenses")}
          name="images"
          onUploadStart={props.uploadStart}
          onUploadSuccess={props.uploadSuccess}
          onProgress={props.handleProgess}
          // onChange={props.verify}
        />
        <Button
          id="imageUpload"
          style={
            props.checkUpload
              ? { background: "rgb(105, 231, 189)" }
              : { background: "none" }
          }
          onClick={uploadImage}
        >
          {props.checkUpload ? (
            <i class="fas fa-check"></i>
          ) : (
            <i class="fas fa-camera"></i>
          )}
        </Button>
      </Form.Group>

      <Form.Group controlId="salesperson">
        <Form.Label>Sales Person</Form.Label>
        <Form.Control
          id="salesPerson"
          type="text"
          defaultValue={props.placeholder.salesPerson}
        />
      </Form.Group>
    </Form>
    <Col id="buttonGroup" xs={12}>
      <Button
        id="submitButton"
        variant="success"
        type="button"
        onClick={props.nextStep}
        disabled={props.enableButton}
      >
        Next Step
      </Button>
    </Col>
  </Col>
);

export default CustomerForm;
