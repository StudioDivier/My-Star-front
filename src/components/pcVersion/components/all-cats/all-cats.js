import React, {useEffect, useState} from 'react';
import './all-cats.scss';
import cat1 from '../../../../img/pc/cat1.png';
import cat2 from '../../../../img/pc/cat2.png';
import cat3 from '../../../../img/pc/cat3.png';
import cat4 from '../../../../img/pc/cat4.png';
import cat5 from '../../../../img/pc/cat5.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {useHttp} from "../../../../hooks/http.hook";
// import {AuthContext} from "../../../../context/AuthContext";
import {useHistory} from 'react-router-dom';
import {useMessage} from "../../../../hooks/message.hook";


export const AllCats = ({chooseCat, nameCat}) => {

    // const userData = JSON.parse(window.localStorage.getItem('userData'));
    //
    // // const authToken = useContext(AuthContext)
    // const {request} = useHttp()
    // const history = useHistory();
    // const message = useMessage();
    // const [data, setData] = useState([]);
    // const [favData, setFavData] = useState([]);
    //
    const backgrounds = [
        cat1, cat1, cat2, cat3, cat4, cat5
    ]
    //
    // useEffect(() => {
    //     async function fetchData() {
    //         const cats = await request('/api/categories/', 'GET') //, null, {Authorization: `Bearer ${userData.token}`}
    //         if (!!cats.length) {
    //             setData([...cats])
    //         }
    //         // console.log('hello1')
    //
    //     }
    //
    //     // console.log('hello2')
    //     fetchData();
    // }, [request]) // needed?

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    // const clickHandler = (id, name) => {
    //     chooseCat(id)
    //     nameCat(name)
    //     localStorage.setItem('catName', JSON.stringify({name: name}))
    //     history.push('/category')
    // }
    //
    // const clickHandler2 = (name) => {
    //     nameCat(name)
    //     history.push('/favorites')
    // }

    const userData = JSON.parse(window.localStorage.getItem('userData'));

    const {request} = useHttp()
    const [data, setData] = useState([]);
    const [stars, setStars] = useState([]);
    const message = useMessage();
    const history = useHistory();
    const [starsList, setStarsList] = useState();

    // Fetch cats and all stars

    useEffect(() => {
        async function fetchData() {
            const cats = await request('/api/categories/', 'GET') //'cors' ,
            if (!!cats.length) {
                setData([...cats])
            }
            const stars = await request('/api/star/getlist/', 'GET')
            if (!!stars.length) {
                setStars([...stars])
                localStorage.removeItem('allStars');
                localStorage.setItem('allStars', JSON.stringify({stars: stars}))
            }
        }

        fetchData();
    }, [request])

    // console.log(data)

    // Cat click handler

    const clickHandler = async (id, name) => {
        try {
            const starsFetch = await request(`/api/star/category/?id=${id}`, 'GET'); //'cors' ,
            setStarsList([...starsFetch])
            localStorage.removeItem('catStars');
            localStorage.setItem('catStars', JSON.stringify({stars: starsFetch}))
            history.push(`/category`)

        } catch (e) {
            message(['В данной категории нет звезд']);
        }
    }

    function multipleHandler(id, name) {
        chooseCat(id)
        nameCat(name)
        localStorage.setItem('catName', JSON.stringify({name: name}))
        clickHandler(id, name)
    }

    // let randomNum = Math.floor(Math.random() * 6);
    // let bgColor = backgrounds[randomNum];

    let i = 1;
    return (
        <div className="all-cats">
            <div className="header-row">
                <span className="cat-header">Категории</span>
            </div>
            <div className="cats-wrapper">

                <Slider {...settings}>

                    {/*<div className="all-cats__single-cat"*/}
                    {/*     onClick={() => clickHandler2('Избранное')}>*/}
                    {/*    <div className="inner-wrapper">*/}
                    {/*        {<img src={bgColor} alt=""/>}*/}
                    {/*        <div className="cat-name">*/}
                    {/*            <span>Избранное</span>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {data.map((value, key) => {
                        //let randomNum = Math.floor(Math.random() * 6);
                        let bgColor = backgrounds[i];
                        i++;
                        if (i === 6) {
                            i = 0
                        }

                        return (
                            <div className="all-cats__single-cat" key={key}
                                // onClick={() => clickHandler(value.id, value.cat_name)}>
                                 onClick={() => multipleHandler(value.id, value.cat_name)}>
                                <div className="inner-wrapper">
                                    {<img src={bgColor} alt=""/>}
                                    <div className="cat-name">
                                        <span>{value.cat_name}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}


                </Slider>

            </div>


        </div>
    )
}