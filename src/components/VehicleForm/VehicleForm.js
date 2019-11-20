import React from "react";
import { Col, Form, Button, Row } from "react-bootstrap";
import "./VehicleForm.css";

const makes = [
  "Abarth",
  "AC",
  "ACE",
  "Aero",
  "Alfa Romeo",
  "Alpina",
  "Alpine",
  "Alpine-Renault",
  "Alvis",
  "AM General",
  "Armstrong Siddeley",
  "Aston Martin",
  "Audi",
  "Austin",
  "Austin Healey",
  "Bedford",
  "Bentley",
  "Berkeley",
  "BMW",
  "Bond",
  "Bufori",
  "Buick",
  "Bullet",
  "Cadillac",
  "Caterham",
  "Chery",
  "Chevrolet",
  "Chrysler",
  "Citroen",
  "Custom",
  "Daewoo",
  "Daihatsu",
  "Daimler",
  "Datsun",
  "De Tomaso",
  "DeSoto",
  "Dodge",
  "Elfin",
  "Eunos",
  "Ferrari",
  "Fiat",
  "Ford",
  "Ford Performance Vehicles",
  "Foton",
  "FSM",
  "Fulda",
  "Fuso",
  "Galloway",
  "Geely",
  "GMC",
  "Great Wall",
  "Harley-Davidson",
  "Haval",
  "HDT",
  "Hillman",
  "Hino",
  "Holden",
  "Holden Special Vehicles",
  "Honda",
  "Hudson",
  "Humber",
  "Hummer",
  "Hupmobile",
  "Hyundai",
  "Infiniti",
  "International",
  "Isuzu",
  "Iveco",
  "Jaguar",
  "Jeep",
  "Jensen",
  "JMC",
  "Kia",
  "Koenigsegg",
  "KTM",
  "Lada",
  "Lamborghini",
  "Lancia",
  "Land Rover",
  "LDV",
  "Lexus",
  "Leyland",
  "Lincoln",
  "London Taxi Company",
  "Lotus",
  "Mack",
  "Mahindra",
  "Maserati",
  "Matra",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "Mercury",
  "MG",
  "MINI",
  "Mitsubishi",
  "Morgan",
  "Morris",
  "Nash",
  "Nissan",
  "Oldsmobile",
  "Opel",
  "Packard",
  "Peugeot",
  "Plymouth",
  "Pontiac",
  "Porsche",
  "Proton",
  "Purvis",
  "RAM",
  "Rambler",
  "Renault",
  "Riley",
  "Rolls-Royce",
  "Rover",
  "Saab",
  "Singer",
  "SKODA",
  "smart",
  "SsangYong",
  "Standard",
  "Studebaker",
  "Subaru",
  "Sunbeam",
  "Suzuki",
  "Tata",
  "Tesla",
  "Toyota",
  "TRD",
  "Triumph",
  "TVR",
  "Ultima",
  "Vanden Plas",
  "Vauxhall",
  "Volkswagen",
  "Volvo",
  "Westfield",
  "Willys",
  "Wolseley",
  "ZX Auto"
];

const VehicleForm = props => (
  <Col>
    <h3>Vehicle Details</h3>

    <Row>
      <Col>
        <Form.Group xs={5} controlId="rego">
          <Form.Label>Registration</Form.Label>
          <Form.Control id="rego" type="text" />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="State">
          <Form.Label>State</Form.Label>
          <Form.Control as="select" id="state">
            <option value="VIC">Victoria</option>
            <option value="NSW">New South Wales</option>
            <option value="QLD">Queensland</option>
            <option value="ACT">Australian Capital Terittory</option>
            <option value="WA">Western Australia</option>
            <option value="SA">South Australia</option>
            <option value="TAS">Tasmania</option>
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
    <Col xs={{ span: 12 }}>
      <Button
        xs={6}
        id="searchRego"
        variant="success"
        type=""
        onClick={props.searchRego}
      >
        Search
      </Button>
      <Button
        xs={6}
        id="manualEntry"
        variant="success"
        type=""
        onClick={props.manualEntry}
      >
        Manual Entry
      </Button>
    </Col>

    {props.loading ? (
      <div class="loader-container">
        <div class="sk-chase">
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
        </div>
      </div>
    ) : props.displayCard ? (
      !props.vehicleDetails.rego ? (
        <Col id="container">
          <h5>
            Unable to fetch vehicle information. Please try again or enter the
            vehicle details manually
          </h5>
        </Col>
      ) : (
        <div class="card-container">
          <div class="vehicle-card">
            <div class="rego-container">
              <div class="rego-inner">{props.vehicleDetails.rego}</div>
            </div>
            <h5>{props.vehicleDetails.description}</h5>
            <table>
              <tr>
                <th>Engine</th>
                <td>{props.vehicleDetails.engine}</td>
              </tr>
              <tr>
                <th>Vin Number</th>
                <td>{props.vehicleDetails.vin}</td>
              </tr>
              <tr>
                <th>Rego Expiry</th>
                <td>{props.vehicleDetails.exp}</td>
              </tr>
            </table>
          </div>
        </div>
      )
    ) : props.manual ? (
      <Col>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Make</Form.Label>
            <Form.Control as="select" id="make">
              {makes.map(make => (
                <option value={make}>{make}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="model">
            <Form.Label>Model</Form.Label>
            <Form.Control id="model" type="text" />
          </Form.Group>

          <Form.Group controlId="regoMan">
            <Form.Label>Registration Number</Form.Label>
            <Form.Control id="regoMan" type="text" />
          </Form.Group>
        </Form>
      </Col>
    ) : (
      <Col id="container">
        <h5>
          To begin enter the registration number and state above or manually
          enter the vehicle details
        </h5>
      </Col>
    )}

    {props.loading ? null : (
      <Col id="buttonGroup">
        <Button
          id="backButton"
          variant="success"
          type=""
          onClick={props.prevStep}
        >
          Previous Step
        </Button>

        <Button
          id="submitButton"
          variant="success"
          type="submit"
          onClick={props.nextStep}
        >
          Next Step
        </Button>
      </Col>
    )}
  </Col>
);

export default VehicleForm;
