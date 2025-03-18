import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { logout } from '../../slice/adminLogin';

const styles = `
.sidebar {
  min-width: 250px;
  max-width: 250px;
  min-height: 100vh;
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
  transition: all 0.3s;
}

.sidebar .nav-link {
  color: #495057;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s;
}

.sidebar .nav-link:hover {
  color: #0d6efd;
  background-color: rgba(13, 110, 253, 0.1);
  border-radius: 0.375rem;
}

.sidebar .nav-link.active {
  color: #0d6efd;
  background-color: rgba(13, 110, 253, 0.1);
  border-radius: 0.375rem;
}

.logo-section {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #dee2e6;
}

.user-section {
  border-top: 1px solid #dee2e6;
  padding: 1rem;
  margin-top: auto;
}

.dropdown-toggle::after {
  margin-left: auto;
}

.sidebar-icon {
  font-size: 1.25rem;
  width: 1.25rem;
  height: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(window.location.pathname);

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const navItems = [
    {
      icon: "bi-speedometer2",
      label: "Dashboard",
      path: "/dashboard"
    },
    {
      icon: "bi-people",
      label: "Users",
      path: "/users"
    },
    {
      icon: "bi-check-circle",
      label: "Designer Approvals",
      path: "/designers"
    },
    {
      icon: "bi-person-check",
      label: "Designers",
      path: "/certified-designer"
    },
    {
      icon: "bi-ban",
      label: "Block User/Designer",
      path: "/blocked-designer"
    },
    {
      icon: "bi-file-earmark-spreadsheet",
      label: "Jobsheets",
      path: "/jobsheet"
    },
    {
      icon: "bi-wallet",
      label: "Designer Payments",
      path: "/designer-payments"
    },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="sidebar d-flex flex-column">
        <div className="logo-section">
          <h5 className="mb-0 d-flex align-items-center">
            <span className="bg-primary text-white p-2 rounded me-2">F</span>
            Finest Interiors
          </h5>
        </div>

       
        <nav className="nav flex-column my-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${activePath === item.path ? 'active' : ''}`}
              onClick={() => setActivePath(item.path)}
            >
              <i className={`${item.icon} sidebar-icon`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="user-section mt-auto">
          <div className="dropdown">
            <button
              className="btn btn-light d-flex align-items-center gap-2 w-100"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="user"
                className="rounded-circle"
                width="32"
                height="32"
              />
              <span className="flex-grow-1 text-start">Admin User</span>
              <i className="bi bi-chevron-down"></i>
            </button>
            <ul className="dropdown-menu w-100">
              <li>
                <a className="dropdown-item" href="#settings">
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogOut}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;