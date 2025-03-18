import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminDesigner } from "../thunks/adminDesigner";
import { setPage, setSearch } from "../slice/adminDesigner";
import { resetApproval, selectApprovalStatus } from "../slice/adminDesignerApproval";
import { adminDesignerApproval } from "../thunks/adminDesignerApproval";

const designers = () => {
  const dispatch = useDispatch();
  const adminDesignerState = useSelector((state) => state.adminDesigner);

  const {
    data = [],
    page = 1,
    limit = 10,
    search = "",
    totalItems = 0,
    totalPages = 0,
    status = "idle",
    error,
  } = adminDesignerState;

  const { status: approvalStatus,
    error: approvalerror,
  } = useSelector(selectApprovalStatus)

  useEffect(() => {
    if (approvalStatus === 'succeeded') {
      dispatch(resetApproval())
    }

    dispatch(adminDesigner({ page, limit, search }));
  }, [dispatch, page, limit, search, approvalStatus]);

  const handleApproval = (id) => {
    dispatch(adminDesignerApproval(id))
  }

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };


  if (status === "loading" || approvalStatus === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed" || approvalStatus === "failed") {
    return <p> Error: {error} || {approvalerror} </p>;
  }

  return (
    <>
      <div className="col-py-3">
        <h2>Designer Approvals</h2>
        <hr />
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
              {/* <th>Username</th> */}
              <th>UserId</th>
              <th>Certificates</th>
              <th>Approval-status</th>
              <th>Approvals</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((admin) => (
                <tr key={admin.id}>
                  {/* <td>{admin.firstName}</td> */}
                  <td>{admin.userId}</td>
                  <td>{admin.certificateUrl}</td>
                  <td>{admin.approval}</td>
                  <td>
                    {admin.approval === 'not-approved' ? (
                      <>
                        <button
                          className="btn btn-outline-primary m-2"
                          onClick={() => handleApproval(admin.id)}
                        >
                          Approve
                        </button>
                        <button className="btn btn-outline-danger">
                          Decline
                        </button>
                      </>
                    ) : (
                      <span>Approved</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )}
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
    </>
  );
};

export default designers;
