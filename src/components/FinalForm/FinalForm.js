import React from 'react'
import './FinalForm.css'
import { Col, Form, Button } from 'react-bootstrap'
import SignaturePad from 'react-signature-pad-wrapper'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/dark.css'


const FinalForm = (props) => (
    <Col>
        <Form.Group controlId="outtime">
            <Form.Label>OUT TIME </Form.Label>
            <Flatpickr
                data-enable-time
                value={new Date()}
                onChange={date => props.setDate}
                options={{ disableMobile: true }} />
        </Form.Group>


        <Form.Label>Signature</Form.Label>
        <div id="signaturePad">

            <SignaturePad id="signaturePad" options={{ minWidth: 2, maxWidth: 2, penColor: 'rgb(255, 0, 0)' }} />
        </div>

        <Col id="buttonGroup">
            <Button id="backButton" variant="success" type="" onClick={props.prevStep} >
                Previous Step
            </Button>

            <Button id="finalSubmit" onClick={props.toURL}>Submit booking</Button>

        </Col>



    </Col>



)



export default FinalForm