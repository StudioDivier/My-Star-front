import React, {useContext} from 'react';
import './category.scss';
// import icon from '../../../img/icon1.svg';
import {useHistory} from 'react-router-dom';
import {useHttp} from "../../../hooks/http.hook";
import {StarsContext} from "../../../context/StarsContext";
import {AuthContext} from "../../../context/AuthContext";
import {useMessage} from "../../../hooks/message.hook";


export const FavCategory = ({name, bgColor, catPhoto}) => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL2;
    const history = useHistory();
    const {request} = useHttp();
    // const [starsList, setStarsList] = useState();
    const list = useContext(StarsContext)
    const authToken = useContext(AuthContext);
    const message = useMessage();

    const clickHandler = async () => {
        try {
            // console.log('here0')
            const favCat = await request(`/api/star/favorite/?cust_id=${authToken.id}`, 'GET', {Authorization: `Bearer ${authToken.token}`}); //'cors' ,
            // console.log('here1')
            // setStarsList([...starsFetch])
            // console.log('here2')
            console.log(favCat)
            list.setArray([...favCat])
            // console.log('here3')
            history.push(`/categories/stars`)

        } catch (e) {
            message(['В данной категории нет звезд']);
        }
    }

    const catPic = `${SERVER_URL}/media/${catPhoto}`;
    // const catPic = 'http://127.0.0.1:8080/' + catPhoto;

    // console.log(starsList)

    return (
        <>
            <div onClick={clickHandler} className={'category-card'}>
                <div style={{backgroundImage: bgColor}}>
                    <div className="category-card__description">
                        <span>Популярные</span>
                        <div className="img-card">
                            <img src={catPic} alt="icon"/>
                        </div>
                    </div>
                    <div className="category-card__info">
                            <h5>{name}</h5>
                            <span>Песня в подарок</span>
                    </div>
                </div>
            </div>
        </>
    )
}