import React from 'react';
import './cat-row.scss';
import avatar from '../../../../img/pc/avatar.png';


export const SingleCat = () => {
    return (
        <div className="single-cat">
            <div className="header-row">
                <span className="cat-header">Популярные</span>
                <span className="browse">Смотреть все</span>
            </div>
            <div className="single-cat__stars">

                <div className="single-cat__star">
                    <img src={avatar} alt=""/>
                    <div className="star-description">
                        <span className="star-name">
                            Анна Семенович
                        </span>
                        <span className="star-style">
                            Певец
                        </span>
                    </div>
                </div>

                <div className="single-cat__star">
                    <img src={avatar} alt=""/>
                    <div className="star-description">
                        <span className="star-name">
                            Анна Семенович
                        </span>
                        <span className="star-style">
                            Певец
                        </span>
                    </div>
                </div>

                <div className="single-cat__star">
                    <img src={avatar} alt=""/>
                    <div className="star-description">
                        <span className="star-name">
                            Анна Семенович
                        </span>
                        <span className="star-style">
                            Певец
                        </span>
                    </div>
                </div>

                <div className="single-cat__star">
                    <img src={avatar} alt=""/>
                    <div className="star-description">
                        <span className="star-name">
                            Анна Семенович
                        </span>
                        <span className="star-style">
                            Певец
                        </span>
                    </div>
                </div>

                <div className="single-cat__star">
                    <img src={avatar} alt=""/>
                    <div className="star-description">
                        <span className="star-name">
                            Анна Семенович
                        </span>
                        <span className="star-style">
                            Певец
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}