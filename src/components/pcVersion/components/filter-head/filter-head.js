import React, {useEffect, useState} from 'react';
import './filter-head.scss';
import {useHttp} from "../../../../hooks/http.hook";
import {useMessage} from "../../../../hooks/message.hook";
import {useHistory} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';

export const FilterHead = ({chooseCat, nameCat}) => {

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
            history.push(`/category`)

        } catch (e) {
            message(['В данной категории нет звезд']);
        }
    }

    function multipleHandler(id, name) {
        chooseCat(id)
        nameCat(name)
        clickHandler(id, name)
    }

    // console.log(starsList)

    return (
        <div className="filter-head">
            <div className="cats">
                <a href={'/'}>
                    <div className="cat">Главная</div>
                </a>
                <Dropdown>
                    <Dropdown.Toggle id={'dropdown-basic'} className="cat"
                                     style={{textTransform: 'initial', lineHeight: '1', border: '0', boxSizing: 'content-box', padding: '2.7px 17.5px', display: 'flex', alignItems: 'center'}}>
                        Все категории ({data.length})
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {data.map((value, key) => {
                            return (
                                <Dropdown.Item className={'cat'}
                                               key={key}
                                               onClick={() => multipleHandler(value.id, value.cat_name)}>{value.cat_name}</Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                <a href={"/video-examples"}>
                    <div className="cat">Примеры поздравлений</div>
                </a>
                {/*{data.map((value, key) => {*/}
                {/*    return (*/}
                {/*        <div className="cat" key={key} onClick={() => multipleHandler(value.id, value.cat_name)}>{value.cat_name}</div>*/}
                {/*    )*/}
                {/*})}*/}
            </div>
        </div>
    )
}