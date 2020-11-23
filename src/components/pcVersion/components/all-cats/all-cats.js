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


export const AllCats = ({chooseCat, nameCat}) => {

    const userData = JSON.parse(window.localStorage.getItem('userData'));

    // const authToken = useContext(AuthContext)
    const {request} = useHttp()
    const history = useHistory();
    const [data, setData] = useState([]);
    const [favData, setFavData] = useState([]);

    const backgrounds = [
        cat1, cat1, cat2, cat3, cat4, cat5
    ]


    useEffect(() => {
        async function fetchData() {
            const cats = await request('/api/categories/', 'GET') //, null, {Authorization: `Bearer ${userData.token}`}
            if (!!cats.length) {
                setData([...cats])
            }
            // console.log('hello1')

        }

        // console.log('hello2')
        fetchData();
    }, [request]) // needed?

    console.log(favData)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    const clickHandler = (id, name) => {
        chooseCat(id)
        nameCat(name)
        history.push('/category')
    }

    const clickHandler2 = (name) => {
        nameCat(name)
        history.push('/favorites')
    }

    let randomNum = Math.floor(Math.random() * 6);
    let bgColor = backgrounds[randomNum];

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

                        let randomNum = Math.floor(Math.random() * 6);
                        let bgColor = backgrounds[randomNum];

                        return (
                            <div className="all-cats__single-cat" key={key}
                                 onClick={() => clickHandler(value.id, value.cat_name)}>
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