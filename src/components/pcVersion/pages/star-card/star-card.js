import React from "react";
import './star-card.scss'
import {Backbtn} from "../../components/back-btn/back-btn";

import step1 from '../../../../img/pc/step1.png';
import step2 from '../../../../img/pc/step2.png';
import step3 from '../../../../img/pc/step3.png';
import step4 from '../../../../img/pc/step4.png';

import excl from '../../../../img/pc/exclm-icon.png';

import avatar from '../../../../img/pc/avatar1.png';
import avatar1 from '../../../../img/pc/avatar.png';

export const StarCard = () => {

    return (
        <section className="star-card-pc">
            <div className="container">

                <Backbtn/>

                <div className="row mt-5">

                    <div className="col-lg-4">
                        <div className="star-avatar">
                            <img src={avatar} alt="avatar"/>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="pc-star-wrapper">
                            <div className="star-title">
                                <h3>Анна Семенович</h3>
                            </div>

                            <div className="star-cat-and-rating">
                                <p>Певцы</p>

                                <div className="form-group">
                                    <label htmlFor="rating1">
                                        <div className="circle-label-rating">
                                            <div className="star-label-rating"/>
                                        </div>
                                        <input type="radio" className="" id="rating1"/>
                                    </label>
                                </div>

                            </div>
                            <div className="star-bio">
                                <p>Певица, Ведущая и замечательная актриса Анна Семенович. Невероятная харизма и
                                    самодостаточность –
                                    это пожалуй самые главные отличительные черты Анны Семенович. А еще талант, причем
                                    настолько огромный,
                                    что она сумела добиться высоких результатов и в спорте и в творчестве. </p>
                            </div>
                            <div className="star-daysForOrder">
                                <span>Исполнение заказа через 0 дней</span>
                            </div>
                            <div className="order-btn">
                                <button>Заказать</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="how-it-works">
                            <p className={'section-header'}>Как это работает?</p>
                            <div className="row">
                                <div className="col-md-3 step-wrapper">
                                    <img src={step1} alt="Note"/>
                                    <span className="step">
                                        Шаг 1. Заполнение формы заказа
                                    </span>
                                    <span className="step-info">
                                        Расскажите подробности поздравления: кого вы хотите поздравить, по какому поводу и в каком формате.
                                    </span>
                                </div>
                                <div className="col-md-3 step-wrapper">
                                    <img src={step2} alt="Call us"/>
                                    <span className="step">
                                        Шаг 2. Звонок от менеджера
                                    </span>
                                    <span className="step-info">
Мы позвоним и согласуем
с вами детали, чтобы поздравление
стало запоминающимся.
Разговор займёт 5—7 минут.
                                    </span>
                                </div>
                                <div className="col-md-3 step-wrapper">
                                    <img src={step3} alt="Credit card"/>
                                    <span className="step">
                                        Шаг 3. Оплата поздравления
                                    </span>
                                    <span className="step-info">
                                    Расскажите подробности
поздравления: кого вы хотите
поздравить, по какому поводу
и в каком формате.
                                    </span>
                                </div>
                                <div className="col-md-3 step-wrapper">
                                    <img src={step4} alt="Gift"/>
                                    <span className="step">
                                        Шаг 4. Готовое поздравление
                                    </span>
                                    <span className="step-info">
                                        Через 5 дней мы отправим вам
ссылку на готовое поздравление!
Видео можно скачать себе в
течение 10 дней.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="safety-banner">
                            <img src={excl} alt="Exclamation mark"/>
                            <p>
                                Для вашего удобства и максимальной надёжности мы используем принцип <strong>«безопасная
                                сделка»</strong>.
                                После оформления заявки резервируем деньги на вашем
                                счету. Списание средств происходит только в момент получения видео. Если по любым
                                причинам заказ не был исполнен <strong>в течение 5 дней</strong>, деньги сразу же
                                возвращаются вам.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="about-star">
                            <p className="section-header">
                                О звезде
                            </p>
                            <p className="full-bio">
                                Анна Семенович сегодня сразу и певица, и актриса, и телеведущая. Обладательница пятого с
                                половиной размера груди является завсегдатаем светских тусовок, а ее
                                лицо и красивое тело часто украшают обложки глянцевых журналов. Мало кто знает, что за
                                востребованной артисткой прячется прошлое школьного аутсайдера и
                                ребенка без детства.
                                Певица продолжает заниматься сольной карьерой. В апреле 2019-го Анна Семенович выпустила
                                клип на песню «Хочешь», а в сентябре состоялся релиз композиции
                                «Сексибомбочка». Также артистка приняла участие в благотворительном концерте в
                                Государственном Кремлевском Дворце.
                                Кроме того, Семенович востребована в кинематографе. На 2020 год запланирован выход
                                фильма с Анной «Гардемарины IV». Ее коллегами по съемочной площадке стали
                                такие артисты как Дмитрий Харатьян, певица Кристина Орбакайте, а также Михаил Боярский и
                                многие другие звезды отечественного шоу-бизнеса.
                                Анна Семенович уже восемь лет ведет программу «Дембельский альбом» на «Русском радио».
                                Что касается личной жизни Семенович, то она по обыкновению скрыта от глаз посторонних.
                                Известно лишь, что у артистки есть возлюбленный. Со слов девушки, она
                                состоит в отношениях с мужчиной младше нее на семь лет. Семенович призналась, что только
                                сейчас всерьез задумалась завести детей.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="gift-samples">
                            <p className="section-header">
                                Примеры видеопоздравлений
                            </p>
                            <div className="vids-wrapper">
                                <iframe width="560" height="405" src="https://www.youtube.com/embed/ScMzIvxBSi4"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                                <iframe width="560" height="405" src="https://www.youtube.com/embed/ScMzIvxBSi4"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                                <iframe width="560" height="405" src="https://www.youtube.com/embed/ScMzIvxBSi4"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                                <iframe width="560" height="405" src="https://www.youtube.com/embed/ScMzIvxBSi4"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="you-may-consider">
                            <div className="header-row">
                                <span className="cat-header">Возможно вас заинтересуют</span>
                                <span className="browse">Смотреть все</span>
                            </div>
                            <div className="single-cat__stars">

                                <div className="single-cat__star">
                                    <img src={avatar1} alt=""/>
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
                                    <img src={avatar1} alt=""/>
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
                                    <img src={avatar1} alt=""/>
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
                                    <img src={avatar1} alt=""/>
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
                                    <img src={avatar1} alt=""/>
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
                    </div>
                </div>
            </div>
        </section>
    )
}