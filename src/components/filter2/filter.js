import './filter.scss';
import React, {useContext, useEffect, useState} from "react";
import find from '../../img/find.svg';
import {useHistory} from 'react-router-dom';
import {StarsContext} from "../../context/StarsContext";
import {useHttp} from "../../hooks/http.hook";

export const Filter2 = ({getQuery}) => {
    // const [query, setQuery] = useState('');

    // const updateQuery = (query) => {
    //     // setQuery(query);
    //     getQuery(query);
    // }

    const history = useHistory();
    const {request} = useHttp();

    const list = useContext(StarsContext)

    const [stars, setStars] = useState([])

    const [form1, setForm1] = useState({search: ''})

    const changeHandler1 = event => {
        setForm1(({...form1, [event.target.name]: event.target.value}))
    }

    useEffect(() => {
        async function fetchData() {
            const starsFetch = await request(`/api/star/getlist/`, 'GET'); //'cors' , //, null, {Authorization: `Bearer ${userData.token}`}
            if (!!starsFetch.length) {
                setStars([...starsFetch])
            }
            // console.log(starsFetch)
        }

        fetchData();
    }, [request])

    const searchHandler = (e) => {
        e.preventDefault();
        // setSearch(form1.search);
        if (form1.search) {
            list.setArray([...stars.filter(value => value.username.toLowerCase() === form1.search.toLowerCase() || value.username.toLowerCase().includes(form1.search.toLowerCase()) || value.first_name.toLowerCase() === form1.search.toLowerCase() || value.first_name.toLowerCase().includes(form1.search.toLowerCase()) || value.last_name.toLowerCase() === form1.search.toLowerCase() || value.last_name.toLowerCase().includes(form1.search.toLowerCase()))])
            history.push(`/search`)
        }
    }

    return (
        <div className="filter">
            <div className="filter__wrapper">
                <form onSubmit={(e) => searchHandler(e)}>
                    <input
                        type="text"
                        placeholder={'Поиск звезд'}
                        name={'search'}
                        onChange={changeHandler1}
                        value={form1.search}
                    />
                    <img id='input_img' src={find} alt="Лупа"/>
                </form>
                {/*<input*/}
                {/*    type="text"*/}
                {/*    // name={'for_whom'}*/}
                {/*    // value={form.for_whom}*/}
                {/*    onChange={(event) => updateQuery(event.target.value)}*/}
                {/*    placeholder={'Поиск'}*/}
                {/*/>*/}
                {/*<img id='input_img' src={find} alt=""/>*/}
            </div>
        </div>
    )
}