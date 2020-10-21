import './filter.scss';
import React from "react";
import find from '../../img/find.svg';

export const Filter = ({getQuery}) => {
    // const [query, setQuery] = useState('');

    const updateQuery = (query) => {
        // setQuery(query);
        getQuery(query);
    }

    return (
        <div className="filter">
            <div className="filter__wrapper">
                <input
                    type="text"
                    // name={'for_whom'}
                    // value={form.for_whom}
                    onChange={(event) => updateQuery(event.target.value)}
                    placeholder={'Поиск'}
                />
                <img id='input_img' src={find} alt=""/>
            </div>
        </div>
    )
}