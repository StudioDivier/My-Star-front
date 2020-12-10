import React, {useState} from 'react';
import './category.scss';
import {SingleCat} from "../../components/cat-row/cat-row";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Breadcrumbs} from "../../components/breadcrumbs/breadcrumbs";

export const Category = ({id, name, chooseStar, stars1, topStars1, favData1}) => {

    const [local, setLocal] = useState(id);

    const catStars = (JSON.parse(window.localStorage.getItem('catStars'))).stars;
    const currentCat = (JSON.parse(window.localStorage.getItem('catName'))).name;

    // if (name && id) {
    if (currentCat) {
        return (
            <>
                <Breadcrumbs secondItem={currentCat} setLocal={setLocal}/>

                <Container style={{paddingBottom: '125px'}}>
                    <Row>
                        <Col>
                            <SingleCat
                                catName={currentCat}
                                id={local}
                                chooseStar={chooseStar}
                                stars1={stars1}
                                topStars1={topStars1}
                                favData1={favData1}
                            />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
    if (currentCat && catStars) {
        return (
            <>
                <Breadcrumbs secondItem={currentCat} setLocal={setLocal}/>

                <Container style={{paddingBottom: '125px'}}>
                    <Row>
                        <Col>
                            <SingleCat
                                catName={currentCat}
                                id={local}
                                chooseStar={chooseStar}
                                stars1={catStars}
                                topStars1={topStars1}
                                favData1={favData1}
                            />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
    return []
}