import React, {useContext} from 'react';
import './stars-page.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import {useHttp} from "../../hooks/http.hook";
import {Star} from './components/star';
import {StarsContext} from "../../context/StarsContext";

export const Stars = () => {
    // const {loading, request, error, clearError} = useHttp()
    // const [stars, setStars] = useState([]);
    const fetchedList = useContext(StarsContext);

    // const getCats = async () => {
    //     try {
    //         const cats = await request('/api/categories/', 'GET')
    //         setData({...cats})
    //
    //     } catch (e) {
    //     }
    // }

    // ALL STARS LIST

    // useEffect(() => {
    //     async function fetchData() {
    //         const starsList = await request('/api/star/getlist/', 'GET')
    //         setStars([...starsList])
    //     }
    //
    //     fetchData();
    // }, [])

    // console.log(stars)
    // console.log(fetchedList.array)

    return (
        <>
            <div className="stars">
                <div className="gradient">
                    <h3>Артисты</h3>
                </div>
                <div className="stars__container">
                    <Container>
                        <Row>
                            {fetchedList.array.map((key, value) => {
                                console.log(key, value)
                                return (
                                    <div className="single-star" key={value}>
                                        <Col lg>
                                            <Star id={key.id} name={key.username} rating={key.rating} price={key.price} days={key.days} avatar={key.avatar} />
                                        </Col>
                                    </div>
                                    )
                                })
                            }
                            {/*<div className="single-star">*/}
                            {/*    <Col lg>*/}
                            {/*        <Star/>*/}
                            {/*    </Col>*/}
                            {/*</div>*/}
                            {/*<div className="single-star">*/}
                            {/*    <Col lg>*/}
                            {/*        <Star/>*/}
                            {/*    </Col>*/}
                            {/*</div>*/}
                            {/*<div className="single-star">*/}
                            {/*    <Col lg>*/}
                            {/*        <Star/>*/}
                            {/*    </Col>*/}
                            {/*</div>*/}
                            {/*<div className="single-star">*/}
                            {/*    <Col lg>*/}
                            {/*        <Star/>*/}
                            {/*    </Col>*/}
                            {/*</div>*/}
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}