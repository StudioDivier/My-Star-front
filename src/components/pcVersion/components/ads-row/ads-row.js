import React from 'react';
import './ads-row.scss';
import ad1 from '../../../../img/pc/ad1.png';
import ad2 from '../../../../img/pc/ad2.png';
import ad3 from '../../../../img/pc/ad3.png';

export const AdsRow = () => {
    return (
        <div className={'ads-row'}>
            <div className="row">
                <div className="col-lg-4">
                    <div className="single-ad">
                        <img src={ad1} alt="Ad representation"/>
                        <div className="ad-info">
                            <span className="ad-name">
                                Подари звезду!
                            </span>
                            <span className="ad-description">
                                <p>Поздравление от звезды – это оригинальный способ порадовать близкого. Ваш друг, девушка, парень, муж, жена, родственник или коллега будут приятно удивлены, услышав тёплые пожелания лично от известного актера, популярного музыкального исполнителя, телеведущего, спортсмена или блогера.</p>
                                <p>Такой сюрприз будет неожиданным и подарит всем массу позитивных эмоций на любой праздник: день рождения, юбилей, годовщина, корпоратив, Новый год и многое другое!Особенно актуально такое поздравление в нынешних условиях. Отмечать день рождения дома куда приятнее, если к Вам ненадолго «заглянет» кумир, не правда ли?</p>
                                <p>Теперь Вы знаете, как удивить подарком и виновника торжества и гостей!</p>
                            </span>
                            <div className="see-more">
                                {/*<a href="/#">*/}
                                {/*    <span className="more-link">*/}
                                {/*            Подробнее >*/}
                                {/*    </span>*/}
                                {/*</a>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="single-ad">
                        <img src={ad2} alt="Ad representation"/>
                        <div className="ad-info">
                            <span className="ad-name">
                                Видео поздравления с Новым 2021 годом.
                            </span>
                            <span className="ad-description">
                                <p>Новый год – это один из самых любимых и ярких праздников. В это время все мы ждем каких-то чудес, праздничного настроения, волшебства, исполнения заветных желаний и подарков от самых дорогих нам людей.</p>
                                <p>До Нового года осталось совсем немного времени, а идей для подарков нет? Закажите оригинальное поздравление для своих родных и близких. Подарите положительные эмоции и хорошее настроение, которые запомнятся надолго.</p>
                            </span>
                            <div className="see-more">
                                {/*<a href="/#">*/}
                                {/*    <span className="more-link">*/}
                                {/*            Подробнее >*/}
                                {/*    </span>*/}
                                {/*</a>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="single-ad">
                        <img src={ad3} alt="Ad representation"/>
                        <div className="ad-info">
                            <span className="ad-name">
                                Поздравление на расстоянии
                            </span>
                            <span className="ad-description">
                                <p>Хотите подарить оригинальный подарок другу на день рождения? </p>
                                <p>Поздравить папу, маму, сестру, брата с днём свадьбы, юбилеем, днём рождения?</p>
                                <p>Что подарить человеку, который находится в другом городе, или в другой стране?</p>
                                <p>Попробуй подарить эмоции, а точнее персональные видео поздравления от известных людей!</p>
                            </span>
                            <div className="see-more">
                                {/*<a href="/#">*/}
                                {/*    <span className="more-link">*/}
                                {/*            Подробнее >*/}
                                {/*    </span>*/}
                                {/*</a>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}