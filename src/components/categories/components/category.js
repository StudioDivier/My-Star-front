import React, {useContext, useState} from 'react';
import './category.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import icon from '../../../img/icon1.png';
import {useHistory} from 'react-router-dom';
import {useHttp} from "../../../hooks/http.hook";
import {StarsContext} from "../../../context/StarsContext";
import {AuthContext} from "../../../context/AuthContext";


export const Category = ({id, name}) => {
    const history = useHistory();
    const {request} = useHttp();
    const [starsList, setStarsList] = useState();
    const list = useContext(StarsContext)
    const authToken = useContext(AuthContext);

    const clickHandler = async () => {
        try {
            const starsFetch = await request(`/api/star/category/?id=${id}`, 'GET', null, {Authorization: `Bearer ${authToken.token}`});
            setStarsList([...starsFetch])
            list.setArray([...starsFetch])
            history.push(`/categories/stars`)
        } catch (e) {

        }
    }

    console.log(starsList)

    return (
        <div className={'category-card'}>
            <Container fluid>
                <Row>
                    <Col xs={4}>
                        <div className="card-logo">
                            <div className="logo-gradient">
                                <img src={icon} alt={'icon'} />
                            </div>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <div className="card-info">
                            <Row>
                                <Col lg>
                                    {name}
                                </Col>
                                <Col lg>
                                    <button onClick={clickHandler}>Заказать</button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}