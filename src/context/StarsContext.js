import React, {createContext, useState} from 'react';

export const StarsContext = createContext();

export const StarsProvider = ({children}) => {

    const [array, setArray] = useState([]);
    const [starId, setStarId] = useState(null);
    const [starName, setStarName] = useState(null);
    const [starPrice, setStarPrice] = useState(null);
    const [starDays, setStarDays] = useState(null);
    const [starRating, setStarRating] = useState(null);
    const [starAvatar, setAvatar] = useState(null);


    return (
        <StarsContext.Provider
            value={{array, setArray, starId, setStarId, starName, setStarName, starPrice, setStarPrice, starDays, setStarDays, starRating, setStarRating, starAvatar, setAvatar}}
        >
            {children}
        </StarsContext.Provider>
    )
}
