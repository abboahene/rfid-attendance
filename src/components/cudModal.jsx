import React from 'react';

const CudModal = ({title, body, action}) =>{
    
    return (
        <>
            <div className="modal fade" id="cudModal" tabIndex="-1" role="dialog" aria-labelledby="cudModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded shadow-lg">
                    <div className="modal-header">
                        <h5 className="modal-title" id="cudModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-success rounded shadow-sm">{ action || 'Save changes'}</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CudModal;