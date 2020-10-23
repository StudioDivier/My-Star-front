import React from "react";
import './breadcrumbs.scss'

export const Breadcrumbs = ({secondItem, thirdItem}) => {
    if (secondItem) {
        return (
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Главная</a></li>
                        <li className="breadcrumb-item active">{secondItem}</li>
                    </ol>
                </nav>
            </div>
        )
    }
    if (thirdItem) {
        return (
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Главная</a></li>
                        <li className="breadcrumb-item">{secondItem}</li>
                        <li className="breadcrumb-item active" aria-current="page">{thirdItem}</li>
                    </ol>
                </nav>
            </div>
        )
    }
}