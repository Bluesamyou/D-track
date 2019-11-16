import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import "./Pending.css";
import fire from "../../firebase/fire";
import moment from "moment";

class Pending extends Component {
  state = {
    pendings: [],
    time: new Date(),
    index: 0,
    loading: true
  };

  componentWillMount() {
    fire
      .database()
      .ref("/loans")
      .on("child_added", snap => {
        if (snap.val().timeIn === "") {
          var pushObj = {
            customer: { ...snap.val().customer },
            vehicle: { ...snap.val().vehicle },
            licenceimg: snap.val().licenceimg,
            sig: snap.val().sig,
            timeOut: snap.val().timeOut,
            timeIn: snap.val().timeIn,
            key: snap.key
          };
          console.log(snap.key);
          this.setState({
            pendings: [...this.state.pendings, pushObj]
          });
        }
      });

    this.sleep(2000).then(() => {
      this.setState({ loading: false });
    });
  }

  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  clockIn = ref => {
    console.log(ref);
    var changeItem = {
      ...this.state.pendings[ref],
      timeIn: this.state.time,
      testing: true
    };
    var key = this.state.pendings[ref].key;
    console.log(key);
    delete changeItem["key"];

    fire
      .database()
      .ref(`loans/${key}`)
      .update(changeItem);
    var updatedArray = this.state.pendings;
    updatedArray.splice(ref, 1);

    this.setState({ pendings: updatedArray });
  };

  render() {
    return (
      <Col>
        {this.state.pendings.length === 0 && this.state.loading ? (
          <div className="loading-div">
            <h1>Loading cars currently on loan</h1>
          </div>
        ) : this.state.pendings.length ? (
          this.state.pendings.map((loans, index) => (
            <div class="card-container">
              <div class="vehicle-card">
                <div class="rego-container">
                  <div class="rego-inner">{loans.vehicle.rego}</div>
                </div>
                <h5>{loans.vehicle.description}</h5>
                <table>
                  <tr>
                    <th>Customer</th>
                    <td>
                      {loans.customer.firstname + " " + loans.customer.lastname}
                    </td>
                  </tr>
                  <tr>
                    <th>Loaned on</th>
                    <td>{moment(loans.timeOut).format("L")}</td>
                  </tr>
                  <tr>
                    <th>Phone Number</th>
                    <td>{loans.customer.phone}</td>
                  </tr>
                </table>
                <hr></hr>
                Select returned time below
                <Flatpickr
                  data-enable-time
                  value={this.state.time}
                  onChange={date => this.setState({ time: date })}
                  options={{ disableMobile: true }}
                />
                <Button id="clockIn" onClick={() => this.clockIn(index)}>
                  Mark as returned
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-loan-div">
            <h1>No cars currently on loan</h1>
          </div>
        )}
      </Col>
    );
  }
}

export default Pending;
