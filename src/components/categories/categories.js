import React, {useState, useEffect, useContext} from 'react';
import './categories.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {BottomMenu} from '../bottom-menu/bottom-menu';
import {Category} from './components/category';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import backBlueArrow from '../../img/back-blue.svg';
import {Filter} from "../filter/filter";
import {useHistory} from 'react-router-dom';
import {FavCategory} from "./components/fav-category";
import {Filter2} from "../filter2/filter";
import icon from '../../img/cats/icon1.svg';
import icon2 from '../../img/cats/icon9.svg';

export const Categories = () => {
    const authToken = useContext(AuthContext)
    const {request} = useHttp()
    const history = useHistory();
    const [data, setData] = useState([]);

    const [search, setSearch] = useState([])

    const [query, setQuery] = useState('');

    const colors = [
        'linear-gradient(to top, #f76364 0%, #f76665 26%, #f76665 51%, #f76665 76%, #f56664 100%)',
        'linear-gradient(to top, #774ef7 0%, #7651f7 26%, #7651f7 51%, #7651f7 76%, #754ff6 100%)',
        'linear-gradient(to top, #f78c5c 0%, #f78b5e 26%, #f78b5e 51%, #f68b5f 76%, #f68a61 100%)',
        'linear-gradient(to top, #29bdf6 0%, #29bdf7 26%, #29bdf7 51%, #29bbf7 76%, #27bdf6 100%)',
        'linear-gradient(to top, #5960f8 0%, #5762f7 26%, #585df7 51%, #5661f7 76%, #5661f7 100%)',
        'linear-gradient(to top, #90d443 0%, #91d343 26%, #91d343 51%, #91d343 76%, #91d347 100%)'
    ]

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
            const cats = await request('/api/categories/', 'GET') //'cors' ,
            if (!!cats.length) {
                setData([...cats])
            }
            // console.log('hello1')
        }

        // console.log('hello2')
        fetchData();
    }, [authToken.token, request]) // needed?

    // console.log(data)

    const getQuery = (query) => {
        setQuery(query)
    }

    function logout() {
        authToken.logout()
        history.push('/')
    }

    let randomNum = Math.floor(Math.random() * 6);
    let bgColor = colors[randomNum];

    const areYouLogged = () => {
        if (authToken && authToken.token) {
            return (
                <Col xs={6}>
                    <FavCategory
                        // id={value.id}
                        name={'Избранное'}
                        catPhoto={icon2}
                        bgColor={bgColor}
                    />
                </Col>
            )
        } else {
            return []
        }
    }


    return (
        <>
            <div className="categories">
                <div className="header-block">
                    {/*<div className={'icon-container'}>*/}
                    {/*    <a href={'/'}>*/}
                    {/*        <img src={backBlueArrow} alt="Back button" onClick={logout}/>*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                    <div>
                        <h3>Категории</h3>
                    </div>
                </div>
                <div className="categories__container">
                    <Filter2
                        // getQuery={getQuery}
                        setSearch={setSearch}
                    />
                    <Container>
                        <Row>
                            <Col xs={6}>
                                <Category
                                    // id={value.id}
                                    name={'Топ-10'}
                                    catPhoto={icon}
                                    bgColor={bgColor}
                                />
                            </Col>
                            {areYouLogged()}
                            {data.map((value, key) => {
                                // console.log(value, key)
                                let randomNum = Math.floor(Math.random() * 6);
                                let bgColor = colors[randomNum];

                                if (value.cat_name.toLowerCase().includes(query.toLowerCase())) {
                                    return (
                                        <Col xs={6} key={key}>
                                            <Category
                                                id={value.id}
                                                name={value.cat_name}
                                                catPhoto={value.category_photo}
                                                bgColor={bgColor}
                                            />
                                        </Col>
                                    )
                                } else if (query === '') {
                                    return (
                                        <Col xs={6} key={key}>
                                            <Category
                                                id={value.id}
                                                name={value.cat_name}
                                                catPhoto={value.category_photo}
                                                bgColor={bgColor}
                                            />
                                        </Col>
                                    )
                                }
                            })}
                        </Row>
                    </Container>
                </div>
            </div>
            <BottomMenu/>
        </>
    )
}