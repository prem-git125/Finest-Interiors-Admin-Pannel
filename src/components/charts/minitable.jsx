import React, { useEffect } from 'react';
import { topFiveDesigner } from '../../thunks/userdesignerCharts';
import { useDispatch, useSelector } from 'react-redux';
import asset from '../../api/helper';

const Minitable = () => {
    const { designerData } = useSelector((state) => state.userdesignerCharts);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(topFiveDesigner());
    },[dispatch]);

  return (
    <div className="container">
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr className="bg-dark text-white">
                <th scope="col" className="py-2">Name</th>
                <th scope="col" className="py-2">Profile</th>
                <th scope="col" className="py-2">Email</th>
                <th scope="col" className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {designerData.map((designer) => (
                <tr key={designer.id}>
                  <td>{designer.firstName}</td>
                  <td>
                    <img
                      src={asset(designer.profileUrl)}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: '40px', height: '35px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>{ designer.email }</td>
                  <td>{designer.status === 1 ? "Blocked" : "Active"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Minitable;