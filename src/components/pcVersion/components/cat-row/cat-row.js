import React, {useEffect, useState} from 'react';
import './cat-row.scss';
import avatar from '../../../../img/pc/avatar.png';

export const SingleCat = ({list, catName}) => {

    // const [newList, setNewList] = useState(list);
    // const [data, setData] = useState([]);
console.log(list)
    if (list) {
        // let newList = [...list];
        // console.log(newList)
        return (
            <div className="single-cat">
                <div className="header-row">
                    <span className="cat-header">{catName}</span>
                    <span className="browse">Смотреть все</span>
                </div>
                <div className="single-cat__stars">
                    {list.filter(value => value.tags[0].name === catName).map((value, key) => {
                        return (
                            <div className="single-cat__star" key={key}>
                                <img src={avatar} alt=""/>
                                <div className="star-description">
                                    <span className="star-name">
                                        {value.first_name}&nbsp;{value.last_name}
                                    </span>
                                    <span className="star-style">
                                        {value.profession}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
    return []


}