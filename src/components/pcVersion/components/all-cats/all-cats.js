import React from 'react';
import './all-cats.scss';
import cat1 from '../../../../img/pc/cat1.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export const AllCats = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    return (
        <div className="all-cats">
            <div className="header-row">
                <span className="cat-header">Категории</span>
            </div>
            <div className="cats-wrapper">

                <Slider {...settings}>

                    <div className="all-cats__single-cat">
                        <div className="inner-wrapper">
                            {<img src={cat1} alt=""/>}
                            <div className="cat-name">
                                <span>Актеры</span>
                            </div>
                        </div>
                    </div>

                    <div className="all-cats__single-cat">
                        <div className="inner-wrapper">
                            {<img src={cat1} alt=""/>}
                            <div className="cat-name">
                                <span>Актеры</span>
                            </div>
                        </div>
                    </div>

                    <div className="all-cats__single-cat">
                        <div className="inner-wrapper">
                            {<img src={cat1} alt=""/>}
                            <div className="cat-name">
                                <span>Актеры</span>
                            </div>
                        </div>
                    </div>

                    <div className="all-cats__single-cat">
                        <div className="inner-wrapper">
                            {<img src={cat1} alt=""/>}
                            <div className="cat-name">
                                <span>Актеры</span>
                            </div>
                        </div>
                    </div>

                    <div className="all-cats__single-cat">
                        <div className="inner-wrapper">
                            {<img src={cat1} alt=""/>}
                            <div className="cat-name">
                                <span>Актеры</span>
                            </div>
                        </div>
                    </div>

                    <div className="all-cats__single-cat">
                        <div className="inner-wrapper">
                            {<img src={cat1} alt=""/>}
                            <div className="cat-name">
                                <span>Актеры</span>
                            </div>
                        </div>
                    </div>

                </Slider>

            </div>


        </div>
    )
}