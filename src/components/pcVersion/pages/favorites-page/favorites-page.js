import React, {useState} from 'react';
import '../category-page/category.scss';
import {SingleCat} from "../../components/cat-row/cat-row";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Breadcrumbs} from "../../components/breadcrumbs/breadcrumbs";

export const FavCategory = ({name, chooseStar, stars1, topStars1, favData1}) => {

    // const [local, setLocal] = useState(id)

    const catStars = (JSON.parse(window.localStorage.getItem('favCat'))).stars;
    const currentCat = (JSON.parse(window.localStorage.getItem('catName'))).name;

    // if (name) {
    if (currentCat) {
        return (
            <>
                <Breadcrumbs secondItem={currentCat} setLocal={'Избранное'}/>

                <Container style={{paddingBottom: '110px'}}>
                    <Row>
                        <Col>
                            <SingleCat
                                catName={currentCat}
                                id={'Избранное'}
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
                <Breadcrumbs secondItem={currentCat} setLocal={'Избранное'}/>

                <Container style={{paddingBottom: '125px'}}>
                    <Row>
                        <Col>
                            <SingleCat
                                catName={currentCat}
                                id={'Избранное'}
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