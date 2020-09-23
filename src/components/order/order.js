import React, {useContext} from 'react';
import {StarsContext} from "../../context/StarsContext";

export const Order = () => {
    const starInfo = useContext(StarsContext);
    console.log(starInfo)
    return (
        <h3></h3>
    )
}