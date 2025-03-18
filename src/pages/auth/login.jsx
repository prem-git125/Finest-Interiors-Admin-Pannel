import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { adminLogin } from '../../thunks/adminLogin'
import { LoginSchema } from '../../validations/validationSchemas';

const login = () => {
  
  const [formData,setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { message, isLogin, loading, error } = useSelector(
    (state) => state.adminLogin
  );

  const validateForm = () => {
    const { error } = LoginSchema.validate(formData, { abortEarly: false });
    if (!error) return null;

    const validationErrors = {};
    error.details.forEach(detail => {
      validationErrors[detail.path[0]] = detail.message;
    });
    return validationErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        dispatch(adminLogin(formData));
        if (isLogin) {
          navigate('/users');
        }
      } catch (loginError) {
        console.error('Login failed:', loginError);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light" style={{
      background: 'linear-gradient(to right, #6a11cb, #2575fc)'
    }}>
      <div className="card shadow-lg border-0" style={{ borderRadius: '15px', maxWidth: '400px', width: '100%' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-primary">Welcome Back</h3>
            <p className="text-muted">Please login to your account</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control rounded-pill"
                id="email"
                onChange={handleChange}
                name='email'
                value={formData.email}
                placeholder="name@example.com"
                required
                style={{ paddingLeft: '20px', backgroundColor: '#f7f9fc' }}
              />
              <label htmlFor="email" style={{ paddingLeft: '20px' }}>Email address</label>
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control rounded-pill"
                id="password"
                onChange={handleChange}
                name='password'
                value={formData.value}
                placeholder="Password"
                required
                style={{ paddingLeft: '20px', backgroundColor: '#f7f9fc' }}
              />
              <label htmlFor="password" style={{ paddingLeft: '20px' }}>Password</label>
              {errors.email && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="rememberMe"
              />
              <label className="form-check-label text-secondary" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <button
              className="btn btn-primary w-100 rounded-pill mb-3"
              type="submit"
              style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)', border: 'none' }}
            >
              Login
            </button>
            <div className="text-center">
              <p className="text-secondary mb-0">Don't have an account? <Link to={'/auth/register'} className="text-primary" style={{ textDecoration: 'none' }}>Sign Up</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
