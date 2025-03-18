import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setPage } from '../slice/FetchingUserJobsheet';
import { FetchingUserJobsheet } from '../thunks/FetchingUserJobsheet';
import defaultImg from '../assets/images/default2.jpeg';
import '../style/tooltip.css';
import asset from '../api/helper';

const Jobsheet = () => {
    const dispatch = useDispatch();
    const { data = [], page = 1, limit = 10, search = "", totalItems = 0, totalPages = 0, status = 'idle' } = useSelector(state => state.FetchingUserJobsheet || {});

    useEffect(() => {
        dispatch(FetchingUserJobsheet({ page, limit, search }));
    }, [dispatch, page, limit, search]);

    const handlePageChange = (newPage) => {
        dispatch(setPage(newPage));
    };

    const handleSearchChange = (e) => {
        dispatch(setSearch(e.target.value));
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error</div>;
    }

    return (
        <div className="col py-3">
            <h2>Jobsheets</h2>
            <hr></hr>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search"
                    value={search}
                    onChange={handleSearchChange}
                    autoFocus
                />
            </div>

            <table className="table table-striped table-bordered">
                <thead className='thead-dark'>
                    <tr>
                        <th>Jobsheet ID</th>
                        <th>Profile</th>
                        <th>Customer Name</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Budget</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <img src={asset(item.user.profileUrl) || defaultImg} alt="profile" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                            </td>
                            <td>{item.user.firstName}{" "}{item.user.lastName}</td>
                            <td>
                                <span
                                    className="tooltip-element text-muted text-truncate d-inline-block"
                                    style={{ maxWidth: '150px' }}
                                >
                                    {item.job_sheet_title}
                                    <span className="tooltip-text">{item.job_sheet_title}</span>
                                </span>
                            </td>
                            <td>
                                <span
                                    className="tooltip-element text-muted text-truncate d-inline-block"
                                    style={{ maxWidth: '150px' }}
                                >
                                    {item.job_sheet_description}
                                    <span className="tooltip-text">{item.job_sheet_description}</span>
                                </span>
                            </td>
                            <td>{(+item.budget).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                            <td>{new Date(item.from_to).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}</td>
                            <td>{new Date(item.end_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}</td>
                            <td>
                                <span className={`badge text-capitalize ${item.status === 'pending' ? 'bg-warning text-dark' :
                                        item.status === 'approved' ? 'bg-success' :
                                            item.status === 'completed' ? 'bg-primary' :
                                                'bg-danger'}`}>
                                    {item.status}
                                </span>
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

export default Jobsheet;
