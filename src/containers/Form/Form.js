import React, { Component } from "react";
import CustomerForm from "../../components/CustomerForm/CustomerForm";
import VehicleForm from "../../components/VehicleForm/VehicleForm";
import FinalForm from "../../components/FinalForm/FinalForm";
import fire from "../../firebase/fire";
import request from "request";
import Axios from "axios";
import Swal from "sweetalert2";

class Form extends Component {
  state = {
    step: 1,
    addresses: [],
    customer: {},
    driver: {},
    driverImg: {},
    vehicle: null,
    times: {
      outdate: new Date()
    },
    sig_64: "",
    loading: false,
    progress: 0,
    displayCard: false,
    manual: false,
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    licenceno: "",
    formErrors: {
      email: "",
      password: "",
      address: "",
      phone: "",
      licenceno: ""
    },
    firstnameValid: false,
    lastnameValid: false,
    phoneValid: false,
    licenceValid: false,
    formValid: false,
    imageUrl: null
  };

  verifyMake = () => {
    if (this.state.manual) {
      if (
        this.state.vehicle !== null &&
        this.state.vehicle.rego !== "" &&
        this.state.vehicle.description !== ""
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.state.vehicle !== null) {
        return true;
      } else {
        return false;
      }
    }
  };

  verifyCustomer = e => {
    var id = e.target.id;
    var value = e.target.value;
    this.setState({ [id]: value });

    this.validateField(id, value);
  };

  validateField = (id, value) => {
    console.log(id);
    var fieldErrors = this.state.formErrors;
    var firstnameValid = this.state.firstnameValid;
    var lastnameValid = this.state.lastnameValid;
    var phoneValid = this.state.phoneValid;
    var licenceValid = this.state.licenceValid;
    switch (id) {
      case "firstname":
        firstnameValid = value !== "" && value.length > 1;
        fieldErrors.firstname = firstnameValid ? "" : "invalid format";
        break;
      case "lastname":
        lastnameValid = value !== "" && value.length > 1;
        fieldErrors.lastname = lastnameValid ? "" : "invalid format";
        break;
      case "phone":
        phoneValid = value !== "" && value.length === 10;
        fieldErrors.phone = phoneValid ? "" : "Wrong format";
        break;
      case "licenceno":
        licenceValid = value !== "";
        fieldErrors.licenceno = licenceValid
          ? ""
          : "Please upload a licensce image";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldErrors,
        firstnameValid: firstnameValid,
        lastnameValid: lastnameValid,
        phoneValid: phoneValid,
        licenceValid: licenceValid
      },
      this.validateForm
    );
  };

  validateForm = () => {
    this.setState({
      formValid:
        this.state.firstnameValid &&
        this.state.lastnameValid &&
        this.state.phoneValid &&
        this.state.licenceValid
    });
  };
  getAddress = value => {
    if (value.length % 3 === 0) {
      request(
        {
          method: "GET",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: `https://loan-car-dashboard.herokuapp.com/api/addressFetch/?q=${value}`
        },
        (err, resp, body) => {
          console.log(body);
          this.setState({ addresses: [" ", ...JSON.parse(body)] });
        }
      );
    }
  };

  searchRego = () => {
    this.setState({ loading: true });

    var rego = document.getElementById("rego").value;
    var state = document.getElementById("state").value;

    Axios({
      method: "POST",
      url: `https://loan-car-dashboard.herokuapp.com/api/regoFetch`,
      data: {
        rego: rego,
        state: state
      }
    }).then(res => {
      console.log(res.data);
      this.setState({
        vehicle: {
          rego: res.data["registrationNumber"],
          description: res.data.vehicle,
          exp: res.data["expiryDate"],
          vin: res.data.vin,
          engine: res.data.engine
        },
        loading: false,
        displayCard: true,
        manual: false
      });
    });
  };

  uploadStart = () => {
    this.loadSwal();
  };

  loadSwal = () => {
    Swal.fire({
      title: "<span style='color:white;'>Uploading image ...</span>",
      html: `<span style='color:white;'>${this.state.progress}%</span>
                <div class="progress">
                    <div class="progress-bar" style="width: ${this.state.progress.toString()}%" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                </div>`,
      allowOutsideClick: false,
      background: "#000",
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
  };

  handleProgress = progress => {
    console.log(progress);
    this.setState({ progress });
    Swal.update({
      html: `
        <span style='color:white; margin-bottom:10px;'>${
          this.state.progress
        }%</span>
        <div class="progress">
        <div class="progress-bar" style="width: ${this.state.progress.toString()}%" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
        </div>`
    });
  };

  uploadSuccess = filename => {
    Swal.update({
      html: `
        <span style='color:white; margin-bottom:10px;'>${this.state.progress}%</span>
        <div class="progress">
        <div class="progress-bar" style="width: 100%" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
        </div>`
    });
    fire
      .storage()
      .ref("Licenses")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ imageUrl: url }));

    Swal.fire({
      type: "success",
      background: "#000",
      title: '<span style="color:white;">Image succesfully uploaded</span>',
      showConfirmButton: true,
      timer: 1500
    });

    this.setState({ licenceValid: true }, this.validateForm);
  };

  manualEntry = () => {
    this.setState({ manual: true, loading: false, displayCard: false });
  };

  nextStep = () => {
    var stateObj = {};

    if (this.state.step === 1) {
      var inputs = document.getElementsByTagName("input");

      for (var index = 0; index < inputs.length; ++index) {
        var id = inputs[index].id;

        var value = inputs[index].value;

        if (value !== "") {
          if (id === "" && value !== "") {
            stateObj.address = value;
          } else if (inputs[index].type === "checkbox") {
            stateObj[id] = inputs[index].checked;
          } else {
            stateObj[id] = value;
          }
        }
      }

      console.log(stateObj);

      this.setState({ customer: stateObj });

      this.setState({ step: this.state.step + 1 });
    }

    if (this.state.step === 2) {
      if (this.state.manual) {
        this.setState({
          vehicle: {
            rego: document.getElementById("regoMan").value,
            description: `${document.getElementById("make").value} ${
              document.getElementById("model").value
            }`,
            exp: "",
            vin: "",
            engine: ""
          }
        });
      }

      var validMake = setTimeout(this.verifyMake(), 1000);

      if (validMake) {
        this.setState({ step: this.state.step + 1 });
      } else {
        Swal.fire({
          type: "error",
          background: "#000",
          title: '<span style="color:white;">Invalid Vehicle Details</span>',
          toast: true,
          position: "bottom",
          timer: 3000
        });
      }
    }
  };

  toURL = () => {
    this.setState({
      sig_64: document.querySelector("canvas").toDataURL("image/jpeg")
    });

    Swal.fire({
      title: '<strong style="color : #3FC3EE;">TERMS AND CONDITIONS</strong>',
      type: "info",
      background: "#000",
      textColor: "#FFF",
      html: `<div style='text-align:left; color: white;'>
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
            </div>`,

      showCloseButton: false,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Accept",
      confirmButtonAriaLabel: "Accept",
      cancelButtonText: "Cancel",
      cancelButtonAriaLabel: "Cancel"
    }).then(result => {
      if (result.value) {
        var saveObj = {
          customer: { ...this.state.customer },
          vehicle: { ...this.state.vehicle },
          licenceimg: this.state.imageUrl,
          sig: this.state.sig_64,
          timeOut: String(this.state.times.outdate),
          timeIn: ""
        };
        console.log(saveObj);
        fire
          .database()
          .ref("/loans")
          .push(saveObj);

        Swal.fire({
          type: "success",
          background: "#000",
          title: '<span style="color:white;">Entry succesfully created</span>',
          timer: 1500
        });

        document.reload();
      }
    });
  };

  dateChange = date => {
    if (date !== "Invalid Date") {
      this.setState({ times: { outdate: date } });
    }
  };
  lastStep = () => {
    this.setState({ step: this.state.step - 1 });
  };

  render() {
    return (
      <div>
        {this.state.step === 1 ? (
          <CustomerForm
            checkUpload={this.state.imageUrl}
            addressFetch={this.getAddress}
            autofill={this.state.addresses}
            setAddress={this.setAddress}
            nextStep={this.nextStep}
            placeholder={this.state.customer}
            uploadStart={this.uploadStart}
            uploadSuccess={this.uploadSuccess}
            handleProgess={this.handleProgress}
            verify={this.verifyCustomer}
            error={this.state.formErrors}
            enableButton={!this.state.formValid}
          />
        ) : this.state.step === 2 ? (
          <VehicleForm
            displayCard={this.state.displayCard}
            loading={this.state.loading}
            searchRego={this.searchRego}
            vehicleDetails={this.state.vehicle}
            manualEntry={this.manualEntry}
            manual={this.state.manual}
            nextStep={this.nextStep}
            prevStep={this.lastStep}
          />
        ) : (
          <FinalForm
            toURL={this.toURL}
            dateChange={this.dateChange}
            setDate={this.state.times.outdate}
            prevStep={this.lastStep}
          />
        )}
      </div>
    );
  }
}

export default Form;
