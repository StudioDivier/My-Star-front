import React from 'react';
import './banner.scss';
import banner from '../../../../img/pc/background_banner.png';

export const Banner = () => {
    return (
        <div className="banner" style={{backgroundImage: 'url(' + banner + ')'}}>
            <div className="overlay">
                <p>Видеопоздравление,
                    Личное общение
                    и Выступления звёзд
                </p>
                <p>Выбирайте любой формат
                    общения со Звездой!</p>
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