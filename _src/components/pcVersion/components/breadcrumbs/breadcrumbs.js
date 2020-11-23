import React, {useEffect, useState} from "react";
import './breadcrumbs.scss'
import {useHttp} from "../../../../hooks/http.hook";
import {useHistory} from 'react-router-dom';

export const Breadcrumbs = ({secondItem, thirdItem, setLocal}) => {

    const [data, setData] = useState('')
    const [stars, setStars] = useState([]);
    const history = useHistory();

    const {request} = useHttp()

    useEffect(() => {
        async function fetchData() {
            const cats = await request('/api/categories/', 'GET') //, null, {Authorization: `Bearer ${userData.token}`}
            // console.log(cats)
            if (!!cats.length) {
                setData(cats.filter(value => value.id === secondItem)[0])
            }

            // console.log('hello1')

        }

        // console.log('hello2')
        fetchData();
    }, [request])

    const clickHandler = (value) => {
        setLocal(value)
        history.push('/category')
    }

if (window.location.pathname === '/star-card') {

    // console.log(data.id)
    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Главная</a></li>
                    {/*<li className="breadcrumb-item" style={{cursor: 'pointer'}} onClick={() => clickHandler(data.id)}>{data.cat_name || data.cat_name_id}</li>*/}
                    <li className="breadcrumb-item active" aria-current="page">{thirdItem}</li>
                </ol>
            </nav>
        </div>
    )
}

return (
    <div className="container">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Главная</a></li>
                <li className="breadcrumb-item active">{secondItem}</li>
            </ol>
        </nav>
    </div>
)


}