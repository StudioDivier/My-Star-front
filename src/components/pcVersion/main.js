import React from 'react';
import './main.scss';
import {Container, Row, Col} from 'react-bootstrap';
import {Header} from "./components/header/header";
import {FilterHead} from "./components/filter-head/filter-head";
import {Banner} from "./components/banner-main/banner";
import {Footer} from "./components/footer/footer";


export const DesktopMain = () => {
    return (
        <div className="main">
            <Header />
            <Container>
                <Row>
                    <FilterHead />
                </Row>
                <Row>
                    <Banner />
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}