import React, {createContext, useState} from 'react';

export const StarsContext = createContext();

export const StarsProvider = ({children}) => {

    const [array, setArray] = useState([]);
    const [starId, setStarId] = useState(null);


    return (
        <StarsContext.Provider
            value={{array, setArray, starId, setStarId}}
        >
            {children}
        </StarsContext.Provider>
    )
}
