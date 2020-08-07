import React from 'react';

const GetMonthName = (number) => {

    var montharray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return  montharray[number - 1];
};

export default GetMonthName;