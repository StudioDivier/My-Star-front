import {useContext, useEffect} from 'react';
import {useHttp} from "../../../../hooks/http.hook";
// import {useMessage} from "../../../../hooks/message.hook";
import {AuthContext} from "../../../../context/AuthContext";
import {useHistory} from 'react-router-dom';

export const VkRedirect = ({phone}) => {
    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    const auth = useContext(AuthContext);
    console.log(phone)

    // const message = useMessage();
    const history = useHistory();
    const {request} = useHttp();

    const storageName = 'tempUserData';
    // const tempUserData = JSON.parse(window.localStorage.getItem('tempUserData'));

    useEffect(() => {
        // try {
        async function fetchData() {
            const dataAuth = await request(`/api/mid-vk/?code=${code}`, 'GET')
            console.log(dataAuth)

            // localStorage.setItem(storageName, JSON.stringify({
            //     access_token: dataAuth.access_token,
            //     expires_in: dataAuth.expires_in,
            //     user_id: dataAuth.user_id,
            //     email: dataAuth.email
            // }))

            console.log(phone)

            const dataSend = await request(`/api/vk-oauth/`, 'POST', {
                access_token: dataAuth.access_token,
                phone: phone,
                email: dataAuth.email
            })
            console.log(dataSend)

            localStorage.removeItem(storageName)

            // const dataLog = await request('/api/login/', 'POST', {
            //     id: dataSend.id,
            //     username: dataSend.username,
            //     is_star: dataSend.is_star,
            //     email: dataSend.email,
            //     avatar: dataSend.avatar,
            //     token: dataSend.token
            // })

            auth.login(dataSend.token, dataSend.username, dataSend.is_star, dataSend.id);
            // history.push('/')
        }
        // async function fetchData1() {
        // }

        fetchData();
        // fetchData1();
    }, [auth, code, history, phone, request])
    return []

}