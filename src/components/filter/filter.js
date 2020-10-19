import './filter.scss';
import React from "react";

export const Filter = () => {
    return (
        <div className="filter">
            <div className="filter__wrapper">
                <input
                    type="text"
                    // name={'for_whom'}
                    // value={form.for_whom}
                    // onChange={changeHandler}
                    placeholder={'Поиск'}
                />
            </div>
        </div>
    )
}