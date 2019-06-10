import './Safety.css';
import React from 'react';

const Safety = ({ urbanscore }) => {
    if(!urbanscore) {
        return <div></div>
    }

    return (
        <div>
            Safety
        </div>
    );
}

export default Safety;