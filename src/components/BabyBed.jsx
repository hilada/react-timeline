import React from 'react';

const BabyBed = (props) => {
    return ( 
        <h3 className='text-center text-primary'>Baby Bed {props._id}</h3>
        <table>
            <thead>
                <th>{new Date()}</th>
            </thead>
            <tbody>
                
            </tbody>
        </table>

     );
}
 
export default BabyBed;