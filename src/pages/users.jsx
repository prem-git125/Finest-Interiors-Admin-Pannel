import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminUser } from "../thunks/adminUser";
import { setPage, setSearch } from "../slice/adminUser";
import { userBlock } from "../thunks/userBlock";
import { useEffect } from "react";
import asset from '../api/helper'
import defaultImg from '../assets/images/default2.jpeg'

const UserPage = () => {
  const dispatch = useDispatch();
  const { data = [], page = 1, limit = 10, search = "", totalItems = 0, totalPages = 0, status = "idle",
  } = useSelector((state) => state.adminUser || {});

  useEffect(() => {
    dispatch(adminUser({ page, limit, search }));
  }, [dispatch, page, limit, search]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleBlock = async (id) => {
    await dispatch(userBlock(id));
    dispatch(adminUser({ page, limit, search }));
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="col-py-3">
      <h2 className="text-start">Customers</h2>
      <hr />
      <div className="mb-3">
        <input type="text" placeholder="Search..." className="form-control w-50" value={search} 
          onChange={handleSearchChange} autoFocus
        />
      </div>

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>First-Name</th>
            <th>Last-Name</th>
            <th>Profile</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.firstName}</td>
              <td>{admin.lastName}</td>
              <td><img src={admin.profileUrl ? asset(admin.profileUrl) : defaultImg} alt="Profile" className="rounded-circle" style={{ width: "50px", height: "50px" }}></img></td>
              <td>{admin.email}</td>
              <td><button className="btn btn-danger" onClick={() => handleBlock(admin.id)}>Block</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between mt-3">
        <div>
          Showing {limit * (page - 1) + 1} to{" "}{Math.min(limit * page, totalItems)} of {totalItems} entries
        </div>
        <nav>
          <ul className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${page === index + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
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

export default UserPage;
