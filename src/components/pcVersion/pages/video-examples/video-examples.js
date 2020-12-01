import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import {useHttp} from "../../../../hooks/http.hook";

export const Examples = () => {

    const SERVER_URL = process.env.REACT_APP_SERVER_URL2;
    const userData = JSON.parse(window.localStorage.getItem('userData'));

    const [data, setData] = useState([])
    const {request} = useHttp();

    useEffect(() => {
        async function fetchData() {
            const videos = await request(`/api/example/`, 'GET')
            console.log(videos)
            setData(videos.videos)
        }

        // console.log('hello2')
        fetchData();
    }, [request])

    // console.log(data)

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div className="policy-wrapper">
                            <h1>Примеры поздравлений</h1>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container style={{paddingBottom: "150px"}}>
                <Row>
                    {data.map(value => {
                        console.log(value)
                        return (
                            <Col md={3} lg={4}>
                                <video
                                    width="100%"
                                    controls
                                    height="270"
                                    title={"Video Hi"}
                                    style={{marginBottom: '30px'}}
                                >
                                    <source src={`${SERVER_URL}/media/${value}`} type={"video/mp4"}/>
                                </video>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </>
    )
}