import React, { useEffect } from 'react';
import PieChart from '../components/charts/piechart';
import Card from '../components/charts/card';
import BarChart from '../components/charts/barchart';
import Minitable from '../components/charts/minitable';
import { useSelector, useDispatch } from 'react-redux';
import {
  JobsheetCounts,
  CompletedJobsheetCounts,
  PendingJobsheetCounts,
  TotalRevenue,
} from '../thunks/JobsheetCounts';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { totalJobsheets, completedJobsheets, pendingJobsheets, totalRevenue, loading, error, } = useSelector((state) => state.JobsheetCounts);

  useEffect(() => {
    dispatch(JobsheetCounts());
    dispatch(CompletedJobsheetCounts());
    // dispatch(PendingJobsheetCounts());
    dispatch(TotalRevenue());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-4">Error: {error}</div>;
  }

  return (
    <div className="col py-2">
      <h2>Dashboard</h2>
      <hr />
      <div className="row mb-1">
        <Card iconClass="bi bi-journal-check" label="Total Jobsheets" value={totalJobsheets} bgColor="#E3F2FD" iconColor="#2196F3" />
        <Card iconClass="bi bi-check-circle" label="Completed Jobsheets" value={completedJobsheets} bgColor="#E8F5E9" iconColor="#4CAF50" />
        <Card iconClass="bi bi-hourglass-split" label="Pending Jobsheets" value={pendingJobsheets} bgColor="#FFF3E0" iconColor="#FF9800" />
        <Card iconClass="bi bi-currency-dollar" label="Total Revenue" value={`₹${parseFloat(totalRevenue).toFixed(2)}`} bgColor="#E8F5E9" iconColor="#4CAF50" />
      </div>

      <div className="row">

        <div className="col-md-4 d-flex justify-content-center">
          <PieChart />
        </div>

        <div className="col-md-8 ">
          <Minitable/>
        </div>
      </div>

      <div className="row mt-3">
        <div className='col-md-6'>
          <BarChart />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
