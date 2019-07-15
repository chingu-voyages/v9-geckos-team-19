import React from 'react';

const ErrorMessage = ({searchError}) => {

    if(searchError) {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-text">
                        <h1>Please Try Another Search Term</h1>
                    </div>
                </div>
            </div>
        );
    }

    return <div></div>;
}   

export default ErrorMessage;