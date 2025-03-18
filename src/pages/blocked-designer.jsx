import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchingBlockedUsers } from '../thunks/FetchingBlockedUsers'
import { setSearch, setPage } from '../slice/FetchingBlockedUsers'
import defaultImg from '../assets/images/default2.jpeg'
import { userUnblock } from  '../thunks/userUnblock'
import asset from '../api/helper'

const blockedDesigner = () => {
    const dispatch = useDispatch();
    const { data = [], loading, error, totalItems = 0, totalPages = 0, page = 1, status = "idle", search = "", limit = 10 } = useSelector(state => state.FetchingBlockedUsers);

    useEffect(() => {
        dispatch(FetchingBlockedUsers({ page, limit, search }));
    }, [page, limit, search]);

    const handleSearchChange = (e) => {
        dispatch(setSearch(e.target.value));
    };

    const handlePageChange = (newPage) => { 
        dispatch(setPage(newPage));
    };

    const handleUnblock = async (id) => {
        await dispatch(userUnblock(id));
        dispatch(FetchingBlockedUsers({ page, limit, search }));
    }

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <h2>{error}</h2>
    }

    return (
        <div className='col py-2'>
            <h2>Blocked Designer</h2>
            <hr />
            <div className="mb-3">
                <input type="text" placeholder="Search..." className="form-control w-25" autoFocus
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Profile</th>
                        <th>Roles</th>
                        <th>Approval-status</th>
                        <th>Approvals</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.firstName}{" "}{item.lastName}</td>
                            <td>{item.email}</td>
                            <td><img
                                className="rounded-circle"
                                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', }}
                                alt="avatar"
                                src={item.profileUrl ? asset(item.profileUrl) : defaultImg}
                            /></td>
                            <td>
                                {item.role_id === 1 ? "Admin" : item.role_id === 2 ? "User" : item.role_id === 3 ? "Designer" : "Unknown"}
                            </td>
                            <td>{item.status === 0 ? "Unblocked" : "Blocked"}</td>
                            <td><button className="btn btn-success" onClick={() => handleUnblock(item.id)}>Unblock</button></td>
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
    )
}

export default blockedDesigner
