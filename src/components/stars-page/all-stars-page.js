import React, {useState, useEffect} from 'react';
import './stars-page.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useHttp} from "../../hooks/http.hook";
import {Star} from './components/star';

export const AllStars = () => {
    const {loading, request, error, clearError} = useHttp()
    const [stars, setStars] = useState([]);

    // const getCats = async () => {
    //     try {
    //         const cats = await request('/api/categories/', 'GET')
    //         setData({...cats})
    //
    //     } catch (e) {
    //     }
    // }

    // ALL STARS LIST

    useEffect(() => {
        async function fetchData() {
            const starsList = await request('/api/star/getlist/', 'GET', {Authorization: `Bearer ${authToken.token}`})
            setStars([...starsList])
        }

        fetchData();
    }, [])

    // console.log(stars)

    return (
        <>
            <div className="stars">
                <div className="gradient">
                    <h3>Артисты</h3>
                </div>
                <div className="stars__container">
                    <Container>
                        <Row>
                            {stars.array.map((key, value) => {
                                // console.log(key, value)
                                return (
                                    <div className="single-star" key={value}>
                                        <Col lg>
                                                    <Star name={key.username} rating={key.rating} price={key.price} id={key.cat_name_id} />
                                        </Col>
                                    </div>
                                    )
                                })
                            }
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}