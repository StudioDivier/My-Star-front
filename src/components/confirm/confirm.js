import React, {useContext, useState} from 'react';
import {StarsContext} from "../../context/StarsContext";
import './confirm.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useHttp} from "../../hooks/http.hook";
import {useHistory} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";

export const Confirm = () => {
    const {request} = useHttp();
    const auth = useContext(AuthContext);
    const history = useHistory();
    const starInfo = useContext(StarsContext);
    const [form, setForm] = useState({
        status_order: '0', for_whom: '', by_date: '', comment: '', order_price: starInfo.starPrice, star_id: starInfo.starId, customer_id: auth.id
    })

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value}))
    }

    const submitHandler = async () => {
        try {
            const dataLog = await request('/api/order/', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`})
            console.log(dataLog)
            // message(dataReg.message)

            history.push('/categories');
        } catch (e) {
        }
    }

    const url = 'http://192.168.1.131:8080/';

    return (
        <>
            <div className="confirm">
                <div className="chosen-star">
                    <div className="chosen-star__info">
                        <h3>{starInfo.starName}</h3>
                        <img src={url + starInfo.starAvatar} alt={'star'}/>
                    </div>
                    <Container>
                        <div className="order__details">
                            <Row>
                                <Col lg>
                                    <div className="price">
                                        <p>Стоимость сейчас:</p>
                                        <p>
                                            <strong>
                                                {starInfo.starPrice}
                                                &nbsp;&#8381;
                                            </strong>
                                        </p>
                                    </div>
                                </Col>
                                <Col lg>
                                    <div className="confirm__inputs">
                                        <input
                                            type="text"
                                            name={'for_whom'}
                                            value={form.for_whom}
                                            onChange={changeHandler}
                                            placeholder={'Кого поздравить'}
                                        />
                                        <input
                                            type="text"
                                            name={'by_date'}
                                            value={form.by_date}
                                            onChange={changeHandler}
                                            placeholder={'Дата'}
                                        />
                                        <textarea
                                            name={'comment'}
                                            value={form.comment}
                                            onChange={changeHandler}
                                            placeholder={'Комментарии'}
                                        />
                                    </div>
                                </Col>
                                <Col lg>
                                    <div className="place-order">
                                        <button onClick={submitHandler}>
                                            Заказать
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    )
}