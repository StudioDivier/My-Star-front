import React from 'react';
import './ads-row.scss';
import ad1 from '../../../../img/pc/ad1.png';
import ad2 from '../../../../img/pc/ad2.png';
import ad3 from '../../../../img/pc/ad3.png';

export const AdsRow = () => {
    return (
        <div className="ads-row">

            <div className="single-ad">
                <img src={ad1} alt="Ad representation"/>
                <div className="ad-info">
                    <span className="ad-name">
                        Уникальней, чем смартфон
                    </span>
                    <span className="ad-description">
                        Это оригинальный и необычный подарок для тех, кто
                        ценит эмоции и уже устал от привычных презентов
                    </span>
                    <div className="see-more">
                        <span className="more-link">
                            Подробнее >
                        </span>
                    </div>
                </div>
            </div>

            <div className="single-ad">
                <img src={ad2} alt="Ad representation"/>
                <div className="ad-info">
                    <span className="ad-name">
                        Уникальней, чем смартфон
                    </span>
                    <span className="ad-description">
                        Это оригинальный и необычный подарок для тех, кто
                        ценит эмоции и уже устал от привычных презентов
                    </span>
                    <div className="see-more">
                        <span className="more-link">
                            Подробнее >
                        </span>
                    </div>
                </div>
            </div>

            <div className="single-ad">
                <img src={ad3} alt="Ad representation"/>
                <div className="ad-info">
                    <span className="ad-name">
                        Уникальней, чем смартфон
                    </span>
                    <span className="ad-description">
                        Это оригинальный и необычный подарок для тех, кто
                        ценит эмоции и уже устал от привычных презентов
                    </span>
                    <div className="see-more">
                        <span className="more-link">
                            Подробнее >
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}