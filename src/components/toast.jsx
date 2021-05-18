import React from 'react';

function Toast() {


  return (
    <>
    <div id="toast" className="card text-white bg-primary mb-3" style={{maxWidth: "20rem"}}>
      <div className="card-header">Message</div>
      <div className="card-body">
        {/* <h4 className="card-title">Student is already present</h4> */}
        <p id="toastContent"className="card-text"></p>
      </div>
    </div>
  </>
  );
}

export default Toast;
