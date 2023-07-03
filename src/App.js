import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom';
import ViewBooking from './components/ViewBooking';
import CreateBooking from './components/CreateBooking';
import UpdateBooking from './components/UpdateBooking';


function App() {
  return (

    <BrowserRouter>

<div>
        <nav data-testid="navbar" className="navbar navbar-expand-lg p-2 navbar-dark bg-danger">
          <span className="navbar-brand">Restaurant</span>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" data-testid="bookBuffet-link" to="/bookBuffet">Book Buffet</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" data-testid="viewBookings-link" to="/viewBooking">View Booking</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* Define routes for different components */}
          <Route path="/" element={<ViewBooking/>} />
          <Route path="/bookBuffet" element={<CreateBooking />} />
          <Route path="/viewBooking" element={<ViewBooking />} />
          <Route path="/updateBooking/:id" element={<UpdateBooking/>} />
          
        </Routes>
   </div>     
    </BrowserRouter>
   
  );
}

export default App;
