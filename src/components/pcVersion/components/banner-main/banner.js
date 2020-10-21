import React from 'react';
import './banner.scss';
import banner from '../../../../img/pc/background_banner.png';

export const Banner = () => {
    return (
        <div className="banner">
            <div className="wrapper" style={{backgroundImage: 'url(' + banner + ')'}}>
                {/*<img src={banner} alt=""/>*/}
                <div className="overlay-text">
                    <h2>Видеопоздравление,
                        Личное общение
                        и Выступления звёзд
                    </h2>
                    <p>Выбирайте любой формат
                        общения со Звездой!</p>
                </div>
            </div>
        </div>
    )
}