import React from 'react';

const ErrorMessage = ({displayError}) => {

    if(displayError) {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title">
                        <h1>There Has Been An Error Loading The Page</h1>
                    </div>
                </div>
            </div>
        );
    }

    return <div></div>;
}   

export default ErrorMessage;