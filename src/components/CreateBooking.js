import React, { useState } from 'react';
import {validation} from '../validators/validation';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CreateBooking = (props) => {
  let history = useNavigate();
  const url = "http://localhost:3000/bookings/";

  const [state, setState] = useState({
    buffetName: '',
    bookedOn: '',
    emailId: '',
    plateCount: '',
  });

  const [formErrors, setFormErrors] = useState({
    emailIdError: '',
    plateCountError: '',
    buffetNameError: '',
    bookedOnError: '',
  });

  const [mandatory, setMandatory] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [valid, setValid] = useState(false);

  const [messages] = useState({
    emailId_ERROR: 'Please enter a valid email',
    PLATE_COUNT_ERROR: 'Plate count(s) should be 1 or more',
    BUFFET_NAME_ERROR: 'Please select buffet type',
    BOOKED_ON_ERROR: 'Booking date should be after today\'s date',
    ERROR: 'Something went wrong',
    MANDATORY: 'Enter all the form fields',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mandatory) {
      setErrorMessage(messages.MANDATORY);
      return;
    }

    axios
      .post(url, state)
      .then((response) => {
        setState({bookingId: response.data.id });
        setSuccessMessage(`Booking is successfully created with bookingId: ${response.data.id}`);
      })
      .catch((err) => {
        setErrorMessage(messages.ERROR);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const fieldValue = value;
    const error = validateField(name, fieldValue, state);

    setState({ ...state, [name]: fieldValue });
    setFormErrors({ ...formErrors, [name]: error });
  };

  const validateField = (name, value, state) => {
    let errors = formErrors;

    switch (name) {
      case 'buffetName':
        if (validation.validateBuffetName(state.buffetName)) {
          errors.buffetNameError = messages.BUFFET_NAME_ERROR;
        } else {
          errors.buffetNameError = '';
        }
        break;
      case 'emailId':
        if (!validation.validateEmail(state.emailId)) {
          errors.emailIdError = messages.emailId_ERROR;
        } else {
          errors.emailIdError = '';
        }
        break;
      case 'plateCount':
        if (!validation.validatePlateCount(state.plateCount)) {
          errors.plateCountError = messages.PLATE_COUNT_ERROR;
        } else {
          errors.plateCountError = '';
        }
        break;
      case 'bookedOn':
        if (!validation.validateBookedOn(state.bookedOn)) {
          errors.bookedOnError = messages.BOOKED_ON_ERROR;
        } else {
          errors.bookedOnError = '';
        }
        break;
      default:
        break;
    }

    setFormErrors(errors);
    setMandatory(Object.values(errors).every((error) => error === ''));
  };

  return (
    <React.Fragment>
      <div className="CreateBooking">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header bg-custom">
                <h4>Book Your Buffet</h4>
              </div>
              <div className="card-body">
                <form className="form" data-testid="buffet-form" noValidate onSubmit={(event) => handleSubmit(event)}>
                  <div>
                    <label>Buffet Name</label>
                    <select
                      name="buffetName"
                      data-testid="buffetName"
                      className="form-control"
                      onChange={handleChange}
                      value={state.buffetName}
                    >
                      <option value="" disabled>
                        Select a buffet
                      </option>
                      <option value="SouthIndianFestivalSpecial">South Indian Festival Special</option>
                      <option value="NorthIndianFestivalSpecial">North Indian Festival Special</option>
                      <option value="ChineseSpecial">Chinese Special</option>
                    </select>
                    {formErrors.buffetNameError && <span data-testid="buffetName-error" className="text-danger">{formErrors.buffetNameError}</span>}
                  </div>

                  <div className="form-group">
                    <label>Email Id</label>
                    <input
                      type="email"
                      data-testid="emailId"
                      name="emailId"
                      className="form-control"
                      placeholder="Enter your email"
                      value={state.emailId}
                      required
                      onChange={handleChange}
                    />
                    {formErrors.emailIdError && <span className="error">{formErrors.emailIdError}</span>}
                    <span data-testid="email-error" className="text-danger"></span>
                  </div>

                  <div className="form-group">
                    <label>Plate Count</label>
                    <input
                      type="number"
                      data-testid="plateCount"
                      name="plateCount"
                      className="form-control"
                      placeholder="Number of plates"
                      value={state.plateCount}
                      required
                      onChange={handleChange}
                    />
                    {formErrors.plateCountError && <span data-testid="plateCount-error" className="text-danger">{formErrors.plateCountError}</span>}
                  </div>

                  <div className="form-group">
                    <label>Booking Date</label>
                    <input
                      type="date"
                      data-testid="bookedOn"
                      name="bookedOn"
                      className="form-control"
                      onChange={handleChange}
                      value={state.bookedOn}
                      required
                    />
                    {formErrors.bookedOnError && <span data-testid="bookingDate-error" className="text-danger">{formErrors.bookedOnError}</span>}
                  </div>

                  <button data-testid="button" type="submit" name="active" className="btn btn-primary" disabled={!valid}>
                    Book Buffet
                  </button>

                  <h4>{successMessage}</h4>
                  <h4>{errorMessage}</h4>
                  <div data-testid="mandatory" className="text-danger">
                    {mandatory && messages.MANDATORY}
                  </div>
                  <div data-testid="error" className="text-danger">
                    {!mandatory && errorMessage}
                  </div>
                  <div data-testid="success" className="text-success">
                    {successMessage}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateBooking;
