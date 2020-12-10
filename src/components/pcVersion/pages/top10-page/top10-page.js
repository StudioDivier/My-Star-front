import React, {useState} from 'react';
import '../category-page/category.scss';
import {SingleCat} from "../../components/cat-row/cat-row";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Breadcrumbs} from "../../components/breadcrumbs/breadcrumbs";

export const TopCategory = ({name, chooseStar}) => {

    // const [local, setLocal] = useState(id)

    if (name) {
        return (
            <>
                <Breadcrumbs secondItem={name} setLocal={'Топ-10'}/>

                <Container style={{paddingBottom: '110px'}}>
                    <Row>
                        <Col>
                            <SingleCat
                                catName={name}
                                id={'Топ-10'}
                                chooseStar={chooseStar}
                            />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
    return []
}