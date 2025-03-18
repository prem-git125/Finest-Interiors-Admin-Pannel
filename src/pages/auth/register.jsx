import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const register = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light" style={{
      background: 'linear-gradient(to right, #6a11cb, #2575fc)'
    }}>
      <div className="card shadow-lg border-0" style={{ borderRadius: '15px', maxWidth: '450px', width: '100%' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-primary">Create Your Account</h3>
            <p className="text-muted">Please fill in the details to sign up</p>
          </div>

          {/* Image Upload Section */}
          <div className="text-center mb-4">
            <div className="position-relative">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="rounded-circle"
                style={{ width: '100px', height: '100px', objectFit: 'cover', border: '5px solid white', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
              />
              <input
                type="file"
                className="form-control position-absolute"
                style={{ top: '75px', left: '50%', transform: 'translateX(-50%)', width: '50px', height: '50px', opacity: 0, cursor: 'pointer' }}
              />
              <i className="bi bi-camera-fill position-absolute text-primary" style={{ top: '90px', left: '50%', transform: 'translateX(-50%)', fontSize: '1.5rem', cursor: 'pointer' }}></i>
            </div>
          </div>

          <form>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control rounded-pill"
                id="firstName"
                placeholder="First Name"
                required
                style={{ paddingLeft: '20px', backgroundColor: '#f7f9fc' }}
              />
              <label htmlFor="firstName" style={{ paddingLeft: '20px' }}>First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control rounded-pill"
                id="lastName"
                placeholder="Last Name"
                required
                style={{ paddingLeft: '20px', backgroundColor: '#f7f9fc' }}
              />
              <label htmlFor="lastName" style={{ paddingLeft: '20px' }}>Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control rounded-pill"
                id="email"
                placeholder="name@example.com"
                required
                style={{ paddingLeft: '20px', backgroundColor: '#f7f9fc' }}
              />
              <label htmlFor="email" style={{ paddingLeft: '20px' }}>Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control rounded-pill"
                id="password"
                placeholder="Password"
                required
                style={{ paddingLeft: '20px', backgroundColor: '#f7f9fc' }}
              />
              <label htmlFor="password" style={{ paddingLeft: '20px' }}>Password</label>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="agreeTerms"
                required
              />
              <label className="form-check-label text-secondary" htmlFor="agreeTerms">
                I agree to the <a href="#!" className="text-primary" style={{ textDecoration: 'none' }}>terms and conditions</a>
              </label>
            </div>
            <button
              className="btn btn-primary w-100 rounded-pill mb-3"
              type="submit"
              style={{  background: 'linear-gradient(to right, #6a11cb, #2575fc)', border: 'none' }}
            >
              Sign Up
            </button>
            <div className="text-center">
              <p className="text-secondary mb-0">Already have an account? <Link to={'/auth/login'} href="#!" className="text-primary" style={{ textDecoration: 'none' }}>Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default register;
