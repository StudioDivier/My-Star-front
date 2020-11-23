import React, {useState} from 'react';
import '../category-page/category.scss';
import {SingleCat} from "../../components/cat-row/cat-row";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Breadcrumbs} from "../../components/breadcrumbs/breadcrumbs";

export const FavCategory = ({name, chooseStar}) => {

    // const [local, setLocal] = useState(id)

    if (name) {
        return (
            <>
                <Breadcrumbs secondItem={name} setLocal={'Избранное'}/>

                <Container style={{paddingBottom: '100px'}}>
                    <Row>
                        <Col>
                            <SingleCat
                                catName={name}
                                id={'Избранное'}
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