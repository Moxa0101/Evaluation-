import React from 'react';
import '../assets/JsonP.css';
import Userdata from '../records.json';

function JsonParsing() {
  const getStatusClass = (status) => {
    if (status === "Active") return "status-green";
    if (status === "Inactive") return "status-red";
    if (status === "Pending") return "status-yellow";
    return "";
  };

  return (
    <div className="container">
      {Userdata.map((record, index) => (
        <div className="record-box" key={index}>
          <div ><span className="field-label">Name: </span> <span className='style'>{record.Name}</span></div>

          <div> <span className="field-label">  Email:</span><span className='style'>{record.Email}</span></div>

          <div> <span className="field-label"> Status:</span> 
          <span className= {getStatusClass(record.status)}>{record.status}</span></div>
        </div>
      ))}
    </div>
  );
}

export default JsonParsing;
