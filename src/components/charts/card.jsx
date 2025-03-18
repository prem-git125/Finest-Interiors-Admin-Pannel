import React from 'react';

const Card = ({ iconClass, value, label, bgColor, iconColor }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className="card text-center shadow-sm border-2" style={{ borderRadius: '8px' }}>
        <div className="card-body d-flex align-items-center">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '8px',
              backgroundColor: bgColor,
              color: iconColor,
              marginRight: '15px',
            }}
          >
            <i className={iconClass} style={{ fontSize: '1.5rem' }}></i>
          </div>
          <div>
            <h5 className="mb-0 fw-bold text-start">{value}</h5>
            <p className=" mb-0">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
