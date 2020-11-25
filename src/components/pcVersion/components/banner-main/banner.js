import React from 'react';
import './banner.scss';
import banner from '../../../../img/pc/_background_banner1.png';

export const Banner = () => {
    return (
        <div className="banner" style={{backgroundImage: 'linear-gradient(rgba(174, 143, 22, 0.87),rgba(174, 143, 22, 0.87)), url(' + banner + ')'}}>
            <div className="overlay">
                <div className="top-titles">
                    <h2>Видео поздравления</h2>
                    <h2>Live стрим со звездой</h2>
                    <h2>Проведение мероприятий</h2>
                </div>
                <div className="bottom-text">
                    <p>Выбирайте любой формат общения со Звездой!</p>
                </div>
            </div>
            {/*<img src={banner} alt=""/>*/}
            {/*<div className="wrapper"*/}
            {/*     style={{backgroundImage: 'linear-gradient(rgba(174, 143, 22, 0.87),rgba(174, 143, 22, 0.87)), url(' + banner + ')'}}>*/}
            {/*    <div className="overlay-text">*/}
            {/*        <div>*/}
            {/*            <p>Видеопоздравление,*/}
            {/*                Личное общение*/}
            {/*                и Выступления звёзд*/}
            {/*            </p>*/}
            {/*            <p>Выбирайте любой формат*/}
            {/*                общения со Звездой!</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

//