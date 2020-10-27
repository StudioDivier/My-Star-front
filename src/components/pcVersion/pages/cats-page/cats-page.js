import React, {useEffect, useState} from 'react';
import './cats-page.scss';
import {useMessage} from "../../../../hooks/message.hook";
import {useHttp} from "../../../../hooks/http.hook";
import avatar from '../../../../img/pc/avatar.png';
import {Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {SingleCat} from "../../components/cat-row/cat-row";


export const Categories = ({chooseStar, chooseCat, nameCat}) => {

    const userData = JSON.parse(window.localStorage.getItem('userData'));

    const {request} = useHttp()
    const [data, setData] = useState([]);
    const [stars, setStars] = useState([]);
    const message = useMessage();
    const [starsList, setStarsList] = useState();

    useEffect(() => {
        async function fetchData() {
            const cats = await request('/api/categories/', 'GET') //'cors' ,
            if (!!cats.length) {
                setData([...cats])
            }
        }

        fetchData();
    }, [request])

    // console.log(data)

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        {
                            data.map((value, key) => {
                                return (
                                    <SingleCat
                                        key={key}
                                        catName={value.cat_name}
                                        id={value.id}
                                        chooseCat={chooseCat}
                                        nameCat={nameCat}
                                        chooseStar={chooseStar}
                                    />
                                )
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}