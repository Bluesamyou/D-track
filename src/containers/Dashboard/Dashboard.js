import React, {
    Component
} from 'react'
import {
    Col,
    Table,
    Badge,
    Button
} from 'react-bootstrap'
import Swal from 'sweetalert2'
import request from 'request'
import './Dashboard.css'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/dark.css'

class Dashboard extends Component {

    state = {
        loans: [],
        filterList: [],
        show: false
    }

    componentWillMount() {
        this.getLoan()
    }

    getLoan = () => {
        Swal.fire({
            title: "<span style='color:white;'>Fetching info ...</span>",
            background: '#000',
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })
        request({
            uri: `https://loan-car-ef3d4.firebaseio.com/loans.json`,
            method: 'GET'
        }, (err, resp, body) => {
            var loansObj = JSON.parse(body)
            var loans = []
            var keys = Object.keys(loansObj)
            console.log()

            for (var i = 0; i < keys.length; i++) {
                try {
                    var obj = {
                        customer: {
                            ...loansObj[keys[i]].customer
                        },
                        vehicle: {
                            ...loansObj[keys[i]].vehicle
                        },
                        licenceimg: loansObj[keys[i]].licenceimg,
                        sig: loansObj[keys[i]].sig,
                        timeOut: loansObj[keys[i]].timeOut,
                        timeIn: loansObj[keys[i]].timeIn,
                        key: keys[i]
                    }
                    if (loansObj[keys[i]].vehicle.rego !== undefined &&
                        loansObj[keys[i]].vehicle.description !== undefined &&
                        loansObj[keys[i]].customer.firstname !== undefined &&
                        loansObj[keys[i]].timeOut !== undefined) {
                        loans.push(obj)
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            console.log(loans)
            this.setState({
                loans: loans,
                filterList: loans
            })

            Swal.close()
        })

    }



    printRow = (ref) => {
        var newWin = window.open(`${this.state.filterList[ref].key}`, 'windowName', 'height=1000,width=700');
        newWin.document.write(`<h1>Customer Data Summary</h1>
        <h3>Customer</h3>
        <table style="width:100%; border: 2px solid black;">
        <tr>
          <td><strong>Name</strong></td>
          <td>${this.state.filterList[ref].customer.firstname + " " + this.state.filterList[ref].customer.lastname}</td> 
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
            <td>${this.state.filterList[ref].customer.email === undefined ? "" :  this.state.filterList[ref].customer.email}</td> 
        </tr>
        <tr>
            <td><strong>Licence</strong></td>
            <td><img src="${this.state.filterList[ref].licenceimg}" width="200" height="100"></td> 
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
        <td>${new Date(this.state.filterList[ref].timeOut).toString("dddd, dd MMMM yyyy HH:mm:ss").split('GMT')[0]}</td> 
    </tr>
    <tr>
        <td><strong>Vehicle Time In</strong></td>
        <td>${this.state.filterList[ref].timeIn === "" ? "Not returned" : new Date(this.state.filterList[ref].timeIn).toString("dddd, dd MMMM yyyy HH:mm:ss").split('GMT')[0]}</td> 
    </tr>
    <tr>
        <td><strong>Agreed to T&Cs</strong></td>
        <td>Yes</td> 
    </tr>
    <tr>
      <td><strong>Customer Signature</strong></td>
      <td><img src=${this.state.filterList[ref].sig} width="200" height="100"/></td> 
    </tr>

  </table>

  <h3>Terms & Conditions</h3>
         
  <div style='text-align:left;'>
  <ol/>
  <li> To drive the vehicle in a skillful, lawful and careful manner, remaining within the state of Victoria. </li>
  <li>Will not do anything to invalidate the insurance in respect of the vehicle and to indemnify Genesis Motors Isuzu UTE of any loss (including Legal cost) arising from any breach of the obligations herein or any damage suffered by any party as a reslit of an incident involving the vehicle which is not the subject of the insurance coverage provided herein.</li>
  <li>Not to drive the vehicle under the influence of alcohol or drugs.</li>
  <li>To report any damage, complete any claim form and provide assistance with any claim as requested.</li>
  <li>Not to repair the vehicle or create any lien over it.</li>
  <li>Not to smoke in or transport animals of any nature in the vehicle.</li>
  <li>To ensure that the vehicle is parked safely with keys removed.</li>
  <li>To reimburse Genesis Motors Isuzu UTE in respect of any loss advertising from a breach of the customer’s obligation.</li>
  <li><strong><span style='color:red;'>To pay all road tolls, parking infringements and all traffic violations, or similar charges in relation to the borrowers use of the vehicle and to advice Genesis Motors Isuzu UTE of any such cost incurred and to immediately upon demand pay any toll or charge notified to the customer by Genesis Motors Isuzu UTE (an administration fees of $50 shall apply if the toll or charge in not paid within seven (7) days of demand)</span></strong></li>
  <li>To return the vehicle immediately upon request and permit recovery of the vehicle at any time by Genesis Motors Isuzu UTE  for which purpose Genesis Motors Isuzu UTE may enter any premises upon which the vehicle is located(forcibly if necessary).</li>
  <li>That in respect of any accidental loss or damage caused by the customer’s use of the vehicle whilst on loan to the customer, to pay  immediately  upon demand the lesser of the cost of repair of such damage or the insurance excess except (i) in the case of the breach of  this agreement in which case the borrower shall be liable for all damages to the vehicle and to any third party property however caused; and (ii) except in the event were the customer is able to claim under another insurance policy which they must do in the first instance.</li>
  <li>That the insurance as stated herein is the totality of the insurance offered and is subject to the terms of Genesis Motors Isuzu UTE’s insurance policy, a copy of which is available upon request.</li>
  <li>That if there is more than one customer liability shall be joint and several</li>
  <li>That Genesis Motors Isuzu UTE is not liable for any loss or damage suffered by customer or any other person arising out of or in connection with the use of the vehicle (subject to any limitations imposed by the Trade Practices Act)</li>
  <li>Not to use the Vehicle for carrying loads or other than on sealed roads.</li>
  <li>That Genesis Motors Isuzu UTE is not responsible for any property stolen from or damaged in the vehicle either during the period of loan or after return of the vehicle to Genesis Motors Isuzu UTE.</li>
  </ol>

  <span style='color:red; font-weight: bold;'>Note: Insurance excess of $2,000 applies</span>
  </div>`)

    }

    searchByRego = (e) => {
        console.log(e.target.value)
        var tempArray = []
        if (e.target.value === "") {
            this.setState({
                filterList: this.state.loans
            })
        } else {
            for (var i = 0; i < this.state.filterList.length; i++) {
                if (this.state.filterList[i].vehicle.rego.toLowerCase().includes(e.target.value.toLowerCase())) {
                    tempArray.push(this.state.filterList[i])
                }
            }
            this.setState({
                filterList: tempArray
            })
        }
    }

    outTimeSearch = (time) => {
        console.log(time.length)
        if (time.length === 2) {
            var tempArray = []
            for (var i = 0; i < this.state.loans.length; i++) {
                if (this.state.loans[i].timeOut !== undefined) {
                    var startDate = new Date(time[0])
                    var endDate = new Date(time[1])
                    var outDate = new Date(this.state.loans[i].timeOut)
                    var inDate = new Date(this.state.loans[i].timeIn)
                    // eslint-disable-next-line
                    if (outDate.getDate() >= startDate.getDate() && outDate.getDate() <= endDate.getDate() ||
                        inDate.getDate() >= startDate.getDate() && inDate.getDate() <= endDate.getDate()) {
                        tempArray.push(this.state.loans[i])
                    }
                }
            }

            this.setState({
                filterList: tempArray
            })
        }


    }

    
    render() {
        return (
            
            <Col>
                        <Flatpickr
                        id="flatpickr"
                        placeholder="Out Time"
                        value={this.state.time}
                        onChange={(date) => this.outTimeSearch(date)}
                        options={{disableMobile : true, mode : "range"}}/>
                        <input placeholder="Registration" id="regoSearch" type="text" onChange={this.searchByRego}/>
                        <Button xs={2} id="reloadButton" onClick={this.getLoan} variant="success" type=""><i class="fas fa-sync-alt"></i></Button> 

                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                        <th>Registration</th>
                        <th>Customer Name</th>
                        <th>Out Date</th>
                        <th>In Date</th>
                        <th>Status</th>
                        <th>Print</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filterList.map((loans, index) => (
                            <tr>
                            <td>{loans.vehicle.rego}</td>
                            <td>{loans.customer.firstname + " " + loans.customer.lastname }</td>
                            <td>{new Date(loans.timeOut).toString("dddd, dd MMMM yyyy HH:mm:ss").split('GMT')[0]}</td>
                            <td>{loans.timeIn === "" ? null : new Date(loans.timeIn).toString("dddd, dd MMMM yyyy HH:mm:ss").split('GMT')[0]}</td>
                            <td>{loans.timeIn === "" ? 
                                    <Badge variant="warning">On Loan</Badge> :
                                    <Badge variant="success">Returned</Badge>}</td>
                            <td>
                                <Button id="printButton" variant="danger" onClick={() => this.printRow(index)}>
                                    <i class="fas fa-print"></i>
                                </Button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                    </Table>
            </Col>
        )
    }
}

export default Dashboard