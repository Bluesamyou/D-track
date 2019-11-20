import React, { Component } from "react";
import { Col, Table, Badge, Button } from "react-bootstrap";
import "./Dashboard.css";
import fire from "../../firebase/fire";

class Dashboard extends Component {
  state = {
    loans: [],
    filterList: [],
    show: false
  };

  componentWillMount() {
    this.getLoans();
  }

  getLoans() {
    fire
      .database()
      .ref("/loans")
      .on("child_added", snap => {
        var obj = {
          customer: {
            ...snap.val().customer
          },
          vehicle: {
            ...snap.val().vehicle
          },
          licenceimg: snap.val().licenceimg,
          sig: snap.val().sig,
          timeOut: snap.val().timeOut,
          timeIn: snap.val().timeIn,
          key: snap.key
        };
        this.setState({ filterList: [...this.state.filterList, obj] });
        this.setState({ loans: [...this.state.loans, obj] });
      });
  }

  printRow = ref => {
    var newWin = window.open(
      `${this.state.filterList[ref].key}`,
      "windowName",
      "height=1000,width=700"
    );
    newWin.document.write(`<h1>Customer Data Summary</h1>
        <h3>Customer</h3>
        <table style="width:100%; border: 2px solid black;">
        <tr>
          <td><strong>Name</strong></td>
          <td>${this.state.filterList[ref].customer.firstname +
            " " +
            this.state.filterList[ref].customer.lastname}</td> 
        </tr>
        <tr>
          <td><strong>Address</strong></td>
          <td>${this.state.filterList[ref].customer.address}</td> 
        </tr>
        <tr>
            <td><strong>Phone</strong></td>
            <td>${this.state.filterList[ref].customer.phone}</td> 
        </tr>
        <tr>
            <td><strong>Email</strong></td>
            <td>${
              this.state.filterList[ref].customer.email === undefined
                ? ""
                : this.state.filterList[ref].customer.email
            }</td> 
        </tr>
        <tr>
            <td><strong>Licence</strong></td>
            <td><img src="${
              this.state.filterList[ref].licenceimg
            }" width="200" height="100"></td> 
        </tr>
      </table>

      <h3>Vehicle</h3>

      <table style="width:100%; border: 2px solid black;">
      <tr>
        <td><strong>Registration Number</strong></td>
        <td>${this.state.filterList[ref].vehicle.rego}</td> 
      </tr>
      <tr>
        <td><strong>Make/Model</strong></td>
        <td>${this.state.filterList[ref].vehicle.description}</td> 
      </tr>
    </table>
    
    <h3>Times & Agreements</h3>

    <table style="width:100%; border: 2px solid black;">
    <tr>
        <td><strong>Vehicle Time Out</strong></td>
        <td>${
          new Date(this.state.filterList[ref].timeOut)
            .toString("dddd, dd MMMM yyyy HH:mm:ss")
            .split("GMT")[0]
        }</td> 
    </tr>
    <tr>
        <td><strong>Vehicle Time In</strong></td>
        <td>${
          this.state.filterList[ref].timeIn === ""
            ? "Not returned"
            : new Date(this.state.filterList[ref].timeIn)
                .toString("dddd, dd MMMM yyyy HH:mm:ss")
                .split("GMT")[0]
        }</td> 
    </tr>
    <tr>
        <td><strong>Agreed to T&Cs</strong></td>
        <td>Yes</td> 
    </tr>
    <tr>
      <td><strong>Customer Signature</strong></td>
      <td><img src=${
        this.state.filterList[ref].sig
      } width="200" height="100"/></td> 
    </tr>

  </table>
`);
  };

  searchByRego = e => {
    console.log(e.target.value);
    var tempArray = [];
    if (e.target.value === "") {
      this.setState({
        filterList: this.state.loans
      });
    } else {
      for (var i = 0; i < this.state.filterList.length; i++) {
        if (
          this.state.filterList[i].vehicle.rego
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          tempArray.push(this.state.filterList[i]);
        }
      }
      this.setState({
        filterList: tempArray
      });
    }
  };

  // outTimeSearch = time => {
  //   console.log(time.length);
  //   if (time.length === 2) {
  //     var tempArray = [];
  //     for (var i = 0; i < this.state.loans.length; i++) {
  //       if (this.state.loans[i].timeOut !== undefined) {
  //         var startDate = new Date(time[0]);
  //         var endDate = new Date(time[1]);
  //         var outDate = new Date(this.state.loans[i].timeOut);
  //         var inDate = new Date(this.state.loans[i].timeIn);
  //         // eslint-disable-next-line
  //         if (
  //           (outDate.getDate() >= startDate.getDate() &&
  //             outDate.getDate() <= endDate.getDate()) ||
  //           (inDate.getDate() >= startDate.getDate() &&
  //             inDate.getDate() <= endDate.getDate())
  //         ) {
  //           tempArray.push(this.state.loans[i]);
  //         }
  //       }
  //     }

  //     this.setState({
  //       filterList: tempArray
  //     });
  //   }
  // };

  render() {
    return (
      <Col>
        <input
          placeholder="Registration"
          id="regoSearch"
          type="text"
          onChange={this.searchByRego}
        />
        <Button
          xs={2}
          id="reloadButton"
          onClick={this.getLoan}
          variant="success"
          type=""
        >
          <i class="fas fa-sync-alt"></i>
        </Button>

        {this.state.filterList.length === 0 ? (
          <div className="loading-div">
            <h1>Loading loan history</h1>
          </div>
        ) : (
          <Table
            striped
            bordered
            hover
            variant="dark"
            size="sm"
            className="dashboard-table"
          >
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Registration</th>
                <th>Out Date</th>
                <th>In Date</th>
                <th>Status</th>
                <th>Print</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filterList.map((loans, index) => (
                <tr>
                  <td>
                    {loans.customer.firstname + " " + loans.customer.lastname}
                  </td>
                  <td>{loans.vehicle.rego}</td>
                  <td>
                    {
                      new Date(loans.timeOut)
                        .toString("dddd, dd MMMM yyyy HH:mm:ss")
                        .split("GMT")[0]
                    }
                  </td>
                  <td>
                    {loans.timeIn === ""
                      ? null
                      : new Date(loans.timeIn)
                          .toString("dddd, dd MMMM yyyy HH:mm:ss")
                          .split("GMT")[0]}
                  </td>
                  <td>
                    {loans.timeIn === "" ? (
                      <Badge variant="warning">On Loan</Badge>
                    ) : (
                      <Badge variant="success">Returned</Badge>
                    )}
                  </td>
                  <td>
                    <Button
                      className="printButton"
                      variant="danger"
                      onClick={() => this.printRow(index)}
                    >
                      <i class="fas fa-print"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    );
  }
}

export default Dashboard;
