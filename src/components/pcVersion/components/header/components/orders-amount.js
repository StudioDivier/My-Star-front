import {React, useEffect, useState} from 'react';
import {useHttp} from '../../../../../hooks/http.hook';
import {useMessage} from '../../../../../hooks/message.hook';

export const OrdersAmount = () => {
    const userData = JSON.parse(window.localStorage.getItem('userData'));
    const {request} = useHttp();
    const [count, setCount] = useState('');

    useEffect(() => {
        async function fetchOrders() {
            const orders = await request(`/api/order/list/?is_star=${userData.is_star}&user_id=${userData.userId}`, 'GET', null, {Authorization: `Bearer ${userData.token}`})
            // setCount(orders.length)
            setCount((orders.filter(el => el.status_order === 0)).length)
            console.log(orders)
        }

        fetchOrders();
    }, [request, userData.is_star, userData.userId, userData.token])
    // console.log(count)
    // return count;
    return count;
}