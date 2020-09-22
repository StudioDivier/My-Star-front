import React, {useState, useEffect} from 'react';
import './categories.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Category} from './components/category';
import {useHttp} from "../../hooks/http.hook";
import icon1 from '../../img/icon1.png';
import icon2 from '../../img/icon2.png';
import icon3 from '../../img/icon3.png';
import icon4 from '../../img/icon4.png';

export const Categories = () => {
    const {loading, request, error, clearError} = useHttp()
    const [data, setData] = useState([]);


    // const getCats = async () => {
    //     try {
    //         const cats = await request('/api/categories/', 'GET')
    //         setData({...cats})
    //
    //     } catch (e) {
    //     }
    // }

    useEffect(() => {
        async function fetchData() {
            const cats = await request('/api/categories/', 'GET')
            setData({...cats})
        }
        fetchData()
    }, [])

    console.log(data);

    return (
        <>
            <div className="categories">
                <div className="gradient">
                    <h3>Категории</h3>
                </div>
                <div className="categories__container">
                    <Container>
                        <Row>
                            <div className="single-category">
                                <Col lg>
                                    <Category/>
                                </Col>
                                <Col lg>
                                    <Category/>
                                </Col>
                                <Col lg>
                                    <Category/>
                                </Col>
                                <Col lg>
                                    <Category/>
                                </Col>

                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}