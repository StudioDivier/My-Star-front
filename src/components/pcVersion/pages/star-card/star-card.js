import React, {useState} from "react";
import './star-card.scss'
import {Backbtn} from "../../components/back-btn/back-btn";

import step1 from '../../../../img/pc/step1.png';
import step2 from '../../../../img/pc/step2.png';
import step3 from '../../../../img/pc/step3.png';
import step4 from '../../../../img/pc/step4.png';

import circle from '../../../../img/circle.png';

import excl from '../../../../img/pc/exclm-icon.png';

// import avatar1 from '../../../../img/pc/avatar.png';
import Ratings from "react-ratings-declarative";
import Modal from 'react-modal';
import MaskedInput from "react-text-mask/dist/reactTextMask";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import close from '../../../../img/close.png';
import {useHttp} from "../../../../hooks/http.hook";
import {useMessage} from "../../../../hooks/message.hook";
import {Breadcrumbs} from "../../components/breadcrumbs/breadcrumbs";
import {SingleCat} from "../../components/cat-row/cat-row";
import {useHistory} from 'react-router-dom';

export const StarCard = ({star, chooseCat, nameCat, chooseStar}) => {

    const SERVER_URL = process.env.REACT_APP_SERVER_URL2;

    // const url = 'http://exprome.ru:8080';

    window.scrollTo(0, 0);

    const userData = JSON.parse(window.localStorage.getItem('userData'));

    const [orderIsOpen, setOrderIsOpen] = useState(false);
    const [ratingIsOpen, setRatingIsOpen] = useState(false);
    const [finalStep, setFinalStep] = useState(false);
    const [order, setOrder] = useState('');
    const [newRating, setNewRating] = useState();
    const {request} = useHttp();
    const message = useMessage();
    const history = useHistory();

    // Record order data

    const [form, setForm] = useState({
        status_order: '0',
        for_whom: '',
        by_date: '',
        comment: '',
        order_price: star.price,
        star_id: star.id,
        customer_id: (userData ? userData.userId : '')
    })

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value}))
    }

    /*
     * For Modals
    */

    const showOrderModal = () => {
        setOrderIsOpen(true)
    }
    const showRatingModal = () => {
        setRatingIsOpen(true)
    }
    const showFinalModal = () => {
        setFinalStep(true)
    }
    const closeModal = () => {
        setOrderIsOpen(false)
        setRatingIsOpen(false)
        setFinalStep(false)
    }

    Modal.setAppElement(document.querySelector('.App'))

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: 'auto',
            width: '60%',
            borderRadius: '25px',
            padding: '50px 60px',
            backgroundColor: `white`,
        }
    };


    let catPic;

    console.log(star.avatar)
    if (star.avatar && star.avatar.includes('media')) {
        catPic = `${SERVER_URL}${star.avatar}`;
    } else {
        catPic = `${SERVER_URL}/media/${star.avatar}`
    }

    // Handle date

    function reverseDate(str) {
        return str.split('-').reverse().join('-')
    }

    // Send order

    // let orderId1;


    const submitHandler = async () => {
        if (form.comment.length > 0 && form.by_date.length && form.for_whom.length) {
            try {
                const dataLog = await request('/api/order/', 'POST', {
                    status_order: form.status_order,
                    for_whom: form.for_whom,
                    by_date: reverseDate(form.by_date),
                    comment: form.comment,
                    order_price: star.price,
                    star_id: star.id,
                    customer_id: (userData ? userData.userId : '')
                }, {Authorization: `Bearer ${userData.token}`})// 'cors',
                message(dataLog.message)
                // orderId1 = dataLog.order_id;
                setOrder(dataLog.order_id)
                // makeOrder();
                // history.push('/categories');
                // if (dataLog)
                showFinalModal()
            } catch (e) {
                message(e)
            }
        } else {
            message(['Заполните все необходимые поля!'])
        }
    }

    const redirectHandler = async () => {
        try {
            const makeOrder = await request(`/api/order/pay/?order_id=${order}`, 'GET', null, {Authorization: `Bearer ${userData.token}`})// 'no-cors', , 'follow'
            //makeOrder();
            console.log(makeOrder)
            // history.push(makeOrder.link)
            window.open(`${makeOrder.link}`, "_blank").focus();
        } catch (e) {
        }
    }

    // const customFunction = async () => {
    //     await submitHandler()
    //     redirectHandler()
    // }

    if (star.length === 0) {
        history.push('/')
    }

    // For rating

    const rateHandler = async () => {
        try {
            const dataLog = await request('/api/ratestar/', 'PUT', {
                "rating": `${newRating}`,
                "adresat": userData.userId,
                "adresant": star.id
            }, {Authorization: `Bearer ${userData.token}`})
            message(`${dataLog}`);
            closeModal()
            // console.log(dataLog)
        } catch (e) {
            message(e);
            // console.log(e);
        }
    }

    // console.log(star)

    function determineAuth() {
        if (userData && userData.token) {
            return (
                <div className="order-btn">
                    <button onClick={showOrderModal}>Заказать</button>
                </div>
            )
        } else {
            return (
                <div className="order-btn">
                    <button onClick={() => alert('Войдите или зарегистрируйтесь!')}>Заказать</button>
                </div>
            )
        }
    }

    return (
        <>
            <Breadcrumbs secondItem={star.cat_name_id || star.cat_name_id_id} thirdItem={star.username}/>

            <section className="star-card-pc">
                <div className="container">

                    <Backbtn/>

                    <div className="row mt-5">

                        <div className="col-lg-4">
                            <div className="star-avatar">
                                <div className="avatar-img"
                                     style={{backgroundImage: 'url(' + catPic + ')'}}
                                >
                                    &nbsp;
                                </div>
                                {/*<img src={catPic} alt="avatar"/>*/}
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="pc-star-wrapper">
                                <div className="star-title">
                                    <h3>{star.first_name}&nbsp;{star.last_name}</h3>
                                </div>

                                <div className="star-cat-and-rating">
                                    <span>{star.profession}</span>

                                    <div className="inner-wrapper" onClick={showRatingModal}
                                         style={{cursor: 'pointer'}}>
                                        <Ratings
                                            rating={star.rating}
                                            widgetRatedColors="orange"
                                            widgetDimensions="14px"
                                            widgetSpacings="3px"
                                        >
                                            <Ratings.Widget/>
                                            <Ratings.Widget/>
                                            <Ratings.Widget/>
                                            <Ratings.Widget/>
                                            <Ratings.Widget/>
                                        </Ratings>

                                        <span style={{
                                            cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}>({star.rating})</span>
                                    </div>

                                    {/*<div className="form-group">*/}
                                    {/*    <label htmlFor="rating1">*/}
                                    {/*        <div className="circle-label-rating">*/}
                                    {/*            <div className="star-label-rating"/>*/}
                                    {/*        </div>*/}
                                    {/*        <input type="radio" className="" id="rating1"/>*/}
                                    {/*    </label>*/}
                                    {/*</div>*/}

                                </div>
                                <div className="star-bio">
                                    <p>{star.description}</p>
                                </div>
                                <div className="star-pc-price">
                                    <div className="star-pc-price-wrapper">
                                        <label className="radio-container">
                                            {/*<img src={circle} alt="Pointer"/>*/}
                                            <input type="radio" name="order-type"/>
                                            <span class="checkmark"></span>
                                        </label>
                                        <div>
                                            <span>Поздравление</span>
                                            <span className={'star-pc-price__price'}>{star.price} &#8381;</span>
                                        </div>
                                    </div>
                                    <div className="star-pc-price-wrapper">
                                        <label className="radio-container">
                                            {/*<img src={circle} alt="Pointer"/>*/}
                                            <input type="radio" name="order-type"/>
                                            <span class="checkmark"></span>
                                        </label>
                                        <div>
                                            <span>Приглашение на праздник</span>
                                            <span className={'star-pc-price__price'}>{star.price_another} &#8381;</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="star-daysForOrder">
                                    <span>Исполнение заказа через {star.days} дней</span>
                                </div>
                                {determineAuth()}
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
                                    Анна Семенович сегодня сразу и певица, и актриса, и телеведущая. Обладательница
                                    пятого с
                                    половиной размера груди является завсегдатаем светских тусовок, а ее
                                    лицо и красивое тело часто украшают обложки глянцевых журналов. Мало кто знает, что
                                    за
                                    востребованной артисткой прячется прошлое школьного аутсайдера и
                                    ребенка без детства.
                                    Певица продолжает заниматься сольной карьерой. В апреле 2019-го Анна Семенович
                                    выпустила
                                    клип на песню «Хочешь», а в сентябре состоялся релиз композиции
                                    «Сексибомбочка». Также артистка приняла участие в благотворительном концерте в
                                    Государственном Кремлевском Дворце.
                                    Кроме того, Семенович востребована в кинематографе. На 2020 год запланирован выход
                                    фильма с Анной «Гардемарины IV». Ее коллегами по съемочной площадке стали
                                    такие артисты как Дмитрий Харатьян, певица Кристина Орбакайте, а также Михаил
                                    Боярский и
                                    многие другие звезды отечественного шоу-бизнеса.
                                    Анна Семенович уже восемь лет ведет программу «Дембельский альбом» на «Русском
                                    радио».
                                    Что касается личной жизни Семенович, то она по обыкновению скрыта от глаз
                                    посторонних.
                                    Известно лишь, что у артистки есть возлюбленный. Со слов девушки, она
                                    состоит в отношениях с мужчиной младше нее на семь лет. Семенович призналась, что
                                    только
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
                                    <video
                                        width="560"
                                        controls
                                        height="405"
                                        // frameBorder="0"
                                        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        // allowFullScreen
                                        title={"Video Hi"}
                                        // X-Frame-Options={'SAMEORIGIN'}
                                    >
                                        <source src={`${SERVER_URL}${star.video}`} type={"video/mp4"}/>
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <SingleCat
                                id={star.cat_name_id}
                                catName={'Возможно вас заинтересует'}
                                chooseCat={chooseCat}
                                nameCat={nameCat}
                                chooseStar={chooseStar}
                            />
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={orderIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}
                >
                    <div className="pc-modal-header">
                        <div className={'close-btn'} onClick={closeModal}>
                            <img src={close}
                                 alt="Close"
                            />
                        </div>
                        <div className="header-text">
                            <span>Ваше поздравление</span>
                            <p>Расскажите в свободной форме, что вы хотите услышать в поздравлении</p>
                            {/*<div className="mediaLogin-wrapper">*/}
                            {/*    <span>Через соцсети</span>*/}
                            {/*    <span><FontAwesomeIcon icon={['fab', 'vk']} size={'lg'}/></span>*/}
                            {/*    <span><FontAwesomeIcon icon={['fab', 'facebook-f']} size={'lg'}/></span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <div className="signInInputs spread">
                        <div className="single-input__wrapper">
                            <span>Кого поздравить</span>
                            <input
                                type="text"
                                name={'for_whom'}
                                value={form.for_whom}
                                onChange={changeHandler}
                                placeholder={'Кого поздравить'}
                            />
                        </div>
                        <div className="single-input__wrapper">
                            <span>Дата поздравления</span>
                            <MaskedInput
                                mask={[/[0-3]/, /[0-9]/, '-', /[0-1]/, /[0-9]/, '-', /\d/, /\d/, /\d/, /\d/]}
                                placeholder={'дд-мм-гггг'}
                                type="text"
                                name={'by_date'}
                                value={form.by_date}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="single-input__wrapper">
                            <span>Текст поздравления</span>
                            {/*<div style={{width: '70%'}}>*/}
                            <textarea
                                name={'comment'}
                                value={form.comment}
                                onChange={changeHandler}
                                placeholder={'Поздравление в свободной форме'}
                            />
                            {/*</div>*/}
                        </div>

                        <p>Нажимая на кнопку, я принимаю условия <a href="/#">пользовательского соглашения.</a></p>

                        <div className="login__btn-wrapper">
                            <div
                                className="pc-signInButton"
                                onClick={submitHandler}
                            >
                                Оставить заявку
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={ratingIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}
                >
                    <div className="pc-modal-header rating-header">
                        <div className={'close-btn'} onClick={closeModal}>
                            <img src={close}
                                 alt="Close"
                            />
                        </div>
                        <div className="header-text">
                            <span>Оцените звезду!</span>
                            <p>Нам очень важно узнать ваше мнение о звезде. <br/>
                                Поставьте оценку звезде и позвольте другим пользователям узнать <br/>
                                о них больше и сделать выбор.</p>
                        </div>
                    </div>
                    <div className="signInInputs spread">
                        <div className="rating-wrapper">
                            <span>Рейтинг</span>
                            <Ratings
                                rating={newRating}
                                widgetRatedColors="orange"
                                widgetDimensions="14px"
                                widgetSpacings="3px"
                                changeRating={setNewRating}
                            >
                                <Ratings.Widget/>
                                <Ratings.Widget/>
                                <Ratings.Widget/>
                                <Ratings.Widget/>
                                <Ratings.Widget/>
                            </Ratings>
                        </div>

                        <div className="login__btn-wrapper">
                            <div
                                className="pc-signInButton rateBtn"
                                onClick={rateHandler}
                            >
                                Оценить
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={finalStep}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}
                >
                    <div className="pc-modal-header rating-header">
                        <div className={'close-btn'} onClick={closeModal}>
                            <img src={close}
                                 alt="Close"
                            />
                        </div>
                        <div className="header-text">
                            <span>Завершите оплату</span>
                            <p>Вы сделали заказ поздравления от звезды<span></span> <span
                                style={{fontWeight: 700}}>"{star.first_name}&nbsp;{star.last_name}"</span> на
                                сумму <span
                                    style={{fontWeight: 800}}>{star.price} &#8381;</span>
                            </p>
                        </div>
                    </div>
                    <div className="signInInputs spread">

                        <div className="login__btn-wrapper">
                            <div
                                className="pc-signInButton rateBtn"
                                onClick={redirectHandler}
                            >
                                Оплатить
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    )
}