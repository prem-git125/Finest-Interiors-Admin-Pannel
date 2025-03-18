import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiredDesigners } from '../thunks/HiredDesigners';
import { setPage, setSearch } from '../slice/HiredDesigners';
import defaultImg from '../assets/images/default2.jpeg';
import asset from '../api/helper';
import { CreateOrder, VerifyPayment } from '../thunks/DesignerPayment';
import { useRazorpay } from "react-razorpay";

const DesignerPayments = () => {
  const dispatch = useDispatch();
  const Razorpay = useRazorpay();

  const { data = [], loading, error, totalItems = 0, totalPages = 0, page = 1, search = "", limit = 10 } = useSelector(state => state.HiredDesigners);
  const { orderId, loading: razorpayLoading, error: razorpayError, paymentSuccess } = useSelector(state => state.DesignerPayment);

  useEffect(() => {
    dispatch(HiredDesigners({ page, limit, search }));
  }, [page, limit, search]);

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  const handlePayment = async (designer) => {
    try {
      const createOrder = await dispatch(CreateOrder({
        designer_id: designer.user.id,
        total_amount: designer.designer_budget * 0.915,
        job_sheet_apply_id: designer.id,
      }));

      if (createOrder.payload?.orderID) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: createOrder.payload.total_amount * 100,
          order_id: createOrder.payload.orderID,
          name: `${designer.user.firstName} ${designer.user.lastName}`,
          description: `Payment for Designer ${designer.user.firstName} ${designer.user.lastName}`,
          image: asset(designer.user.profileUrl),
          handler: function (response) {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              job_sheet_apply_id: designer.id,
            };
            dispatch(VerifyPayment(paymentData));
          },
          prefill: {
            name: `${designer.user.firstName} ${designer.user.lastName}`,
            email: designer.user.email,
          },
          theme: { color: "#6a216a" }
        };
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='col-py-3'>
      <h2>Designer Payments</h2>
      <hr />

      <div className="mb-3">
        <input type="text" placeholder="Search..." className="form-control w-25" autoFocus value={search} onChange={handleSearchChange} />
      </div>

      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Designer Profile</th>
            <th>Designer</th>
            <th>Client</th>
            <th>Email</th>
            <th>Payment</th>
            <th>Jobsheet Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((designer) => (
            <tr key={designer.user.id}>
              <td><img src={designer.user.profileUrl ? asset(designer.user.profileUrl) : defaultImg} className='rounded-circle' style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', }} alt='none' /></td>
              <td>{designer.user.firstName} {designer.user.lastName}</td>
              <td>{designer.job_sheet_details.user.firstName} {designer.job_sheet_details.user.lastName}</td>
              <td>{designer.user.email}</td>
              <td>
                {(
                  +designer.designer_budget * 0.915
                ).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </td>
              <td>{designer.job_sheet_details.job_sheet_title}</td>
              <td className='text-capitalize'><span className='badge text-bg-success'>{designer.status}</span></td>
              <td>
                {designer.finish_work_status === 'accepted' && designer.status === 'hired' && (
                  <button className='btn btn-outline-primary' onClick={() => handlePayment(designer)}>Pay Now</button>
                )}
              </td>
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

export default DesignerPayments;
