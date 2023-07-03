import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBooking = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  let [booking, setBooking] = useState({});
  let [buffetName, setBuffetName] = useState("");
  let [emailId, setEmailId] = useState("");
  let [plateCount, setPlateCount] = useState("");
  let [bookedOn, setBookedOn] = useState("");
  let [success, setSuccess] = useState("");
  let [errMsg, setErrMsg] = useState("");

  const messages = {
    ERROR: "Something went wrong",
    MANDATORY: "All fields are mandatory",
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/bookings/${id}`)
      .then((response) => {
        setBooking(response.data.booking);
        setBuffetName(response.data.buffetName);
        setEmailId(response.data.emailId);
        setPlateCount(response.data.plateCount);
        setBookedOn(response.data.bookedOn);
      })
      .catch((error) => {
        setErrMsg(messages.ERROR);
        console.error(error);
      });
  }, [id]);

  const update = (e) => {
    e.preventDefault();
    let newBooking = {
      buffetName,
      emailId,
      plateCount,
      bookedOn,
    //   id: booking.id,
    };

    if (
      buffetName.length === 0 ||
      emailId.length === 0 ||
      plateCount.length === 0 ||
      bookedOn.length === 0
    ) {
      setErrMsg(messages.MANDATORY);
    } else {
      axios
        .put(`http://localhost:3000/bookings/${id}`, newBooking)
        .then((res) => {
          setSuccess("Booking has been updated");
          // navigate("/bookBuffet")
        })
        .catch((err) => {
          setErrMsg(messages.ERROR);
        });
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="card">
            <div className="card-header bg-custom">
              <h4>Update Booking</h4>
            </div>
            <div className="card-body">
              <form data-testid="update-form" onSubmit={(event) => update(event)}>
                <label htmlFor="buffetName">Buffet Name</label>
                <select
                  data-testid="buffetName"
                  name="buffetName"
                  className="form-control"
                  value={buffetName}
                  onChange={(e) => setBuffetName(e.target.value)}
                >
                  <option value="" disabled>Select a buffet</option>
                  <option value="SouthIndianFestivalSpecial">South Indian Festival Special</option>
                  <option value="NorthIndianFestivalSpecial">North Indian Festival Special</option>
                  <option value="ChineseSpecial">Chinese Special</option>
                </select>

                <label htmlFor="emailId">Email ID</label>
                <input
                  onChange={(e) => setEmailId(e.target.value)}
                  data-testid="emailId"
                  type="email"
                  name="emailId"
                  className="form-control"
                  value={emailId}
                  placeholder="Enter email ID"
                />

                <label htmlFor="plateCount">Plate Count</label>
                <input
                  onChange={(e) => setPlateCount(e.target.value)}
                  data-testid="plateCount"
                  type="number"
                  name="plateCount"
                  className="form-control"
                  value={plateCount}
                  placeholder="Enter plate count"
                />

                <button
                  type="submit"
                  name="active"
                  className="btn btn-primary mt-2"
                >
                  Update Booking
                </button>

                {success && <p data-testid="success" className="text-success">{success}</p>}
                {errMsg && <p data-testid="error" className="text-danger">{errMsg}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpdateBooking;
