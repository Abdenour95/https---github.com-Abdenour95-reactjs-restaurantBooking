import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewBooking = (props) => {
  const url = "http://localhost:3000/bookings/";
  const navigate = useNavigate();
//   const { bookingId } = useParams();
  const [state, setState] = useState({
    bookingId: "",
    bookingData: null,
    infoMessage: "",
  });

  const messages = {
    INFO: "The booking has been deleted! Please refresh the page.",
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setState ({...state, [name]:value})
   
  };

  const handleAction = (action) => {
    if (action === "onDelete") {
      axios
        .delete(`http://localhost:3000/bookings/${state.id}`)
        .then((res) => {
          state.infoMessage = messages.INFO;  
          window.location.reload();
        })
        .catch((err) => {
          state.infoMessage = "not found"
        });


    } else if (action === "isUpdate") {
      navigate("/updateBooking/" + state.id);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch (url + state.bookingId).then ((res)=>{
        return res.json()
    }).then ((response)=>{
        setState(response);
    })
    //   .catch((error) => {
          
    //       state.infoMessage="Reservation for booking id: " + state.bookingId + " is not found!",
    //       state.bookingData=null,
       
    //   })
  };

 

  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">
        <br />
        <div className="card">
          <div className="card-header bg-custom">
            <h4>View Booking</h4>
          </div>
          <div className="card-body view">
            <form
              className="form"
              data-testid="viewBooking-form"
              onSubmit={onSubmit}
            >
              <div className="form-group">
                <label>Booking Id</label>
                <input
                  onChange={onChange}
                  type="text"
                  data-testid="bookingid"
                  name="bookingId"
                  className="form-control"
                  placeholder="Enter a booking id"
                  value={state.bookingId}
                />
              </div>
              <button
                name="button"
                type="submit"
                className="btn btn-primary mt-2"
              >
                Get Booking
              </button>
            </form>

            <table className="table bordered">
  <thead className="thead">
    <tr>
      <th>Booking Id</th>
      <th>Buffet Name</th>
      <th>Email Id</th>
      <th>Plate Count</th>
      <th>Booking Date</th>
      <th>Action Items</th>
    </tr>
  </thead>
  <tbody>
    {/* Render booking data */}
    {state && (
      <tr key={state.bookingId}>
        <td data-testid="id">{state.id}</td>
        {/* Render other booking data fields */}
        <td>{state.buffetName}</td>
        <td>{state.emailId}</td>
        <td>{state.plateCount}</td>
        <td>{state.bookedOn}</td>
        <td>
          {/* Render action items */}
          <button onClick={() => handleAction("onDelete")}>Delete</button> &nbsp;
          <button onClick={() => handleAction("isUpdate")}>Update</button>
        </td>
      </tr>
    )}
  </tbody>
</table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBooking;
