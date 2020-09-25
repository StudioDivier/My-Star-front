import React, {useState, useEffect, useContext} from 'react';
import './categories.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Category} from './components/category';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";

export const Categories = () => {
    const authToken = useContext(AuthContext)
    const {request} = useHttp()
    const [data, setData] = useState([]);

    // const getCats = async () => {
    //     try {
    //         const cats = await request('/api/categories/', 'GET', null, {Authorization: `Bearer ${authToken.token}`})
    //         setData([...cats])
    //
    //     } catch (e) {
    //     }
    // }
    // useEffect((data) => {
    //     getCats()
    // }, [])


    useEffect(() => {
        async function fetchData() {
            const cats = await request('/api/categories/', 'GET', null, {Authorization: `Bearer ${authToken.token}`})
            if (!!cats.length) {
                setData([...cats])
            }
            // console.log('hello1')

        }

        // console.log('hello2')
        fetchData();
    }, [])

        // console.log(data)
    // useEffect(() => {
    //     axios.get('http://192.168.1.131:8080/api/categories/')
    //         .then(res => {
    //             // setData([...res.data])
    //         })
    // })

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
                                {data.map((key, value) => {
                                    // console.log(key, value)
                                    return (
                                        <Col lg key={value}>
                                            <Category id={value + 1} name={key.cat_name}/>
                                        </Col>
                                    )
                                })
                                }
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}