import React from 'react';

const SalaryDetails = ({job, select}) => {
    return (
        <div onClick={select}>{job}</div>
    );
}

export default SalaryDetails;