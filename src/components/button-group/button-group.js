import './button-group.scss';
import React from "react";

export const Filter = () => {
    return (
        <div className="button-group">
            <div className="btn-group__wrapper">
                <button type="button" className="filter-button active">Популярные</button>
                <button type="button" className="filter-button">Новые</button>
                <button type="button" className="filter-button">Добавленные</button>
            </div>
        </div>
    )
}