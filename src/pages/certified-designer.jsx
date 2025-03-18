import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminCertifiedDesigners } from "../thunks/adminCertifiedDesigners";
import { setPage, setSearch } from "../slice/adminCertifiedDesigners";
import { userBlock } from "../thunks/userBlock";
import { userUnblock } from "../thunks/userUnblock";
import { useEffect } from "react";
import asset from '../api/helper'
import defaultImg from '../assets/images/default2.jpeg'

const CertifiedDesigner = () => {
  const dispatch = useDispatch();
  const {
    data = [],
    page = 1,
    limit = 10,
    search = "",
    totalItems = 0,
    totalPages = 0,
    status = "idle",
  } = useSelector((state) => state.adminCertifiedDesigners || {});

  useEffect(() => {
    dispatch(adminCertifiedDesigners({ page, limit, search }));
  }, [dispatch, page, limit, search]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleStatusChange = async (id, currentStatus) => {
    try {
      if (currentStatus === 1) {
        await dispatch(userUnblock(id));
      } else {
        await dispatch(userBlock(id));
      }
      // After the block/unblock, refresh the user list
      dispatch(adminCertifiedDesigners({ page, limit, search }));
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="col-py-3">
      <h2>Certified Designers</h2>
      <hr></hr>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search..."
          className="form-control w-25"
          value={search}
          onChange={handleSearchChange}
          autoFocus
        />
      </div>

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>First-Name</th>
            <th>Profile</th>
            <th>Last-Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.firstName}</td>
              <td>
                <img
                  className="rounded-circle"
                  style={{
                    width: '50px',
                    height: '50px', 
                    borderRadius: '50%',
                    objectFit: 'cover', 
                  }}
                  alt="avatar"
                  src={admin.profileUrl ? asset(admin.profileUrl) : defaultImg}
                />
              </td>
              <td>{admin.lastName}</td>
              <td>{admin.email}</td>
              <td>{admin.status === 1 ? "Blocked" : "Active"}</td>
              <td>
                {admin.status === 1 ? (
                  <button
                    className="btn btn-success"
                    onClick={() => handleStatusChange(admin.id, admin.status)}
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleStatusChange(admin.id, admin.status)}
                  >
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between mt-3">
        <div>
          Showing {limit * (page - 1) + 1} to{" "}
          {Math.min(limit * page, totalItems)} of {totalItems} entries
        </div>
        <nav>
          <ul className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${page === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CertifiedDesigner;
