import {useContext, useEffect} from 'react';
import {useHttp} from "../../../../hooks/http.hook";
// import {useMessage} from "../../../../hooks/message.hook";
import {AuthContext} from "../../../../context/AuthContext";
import {useHistory} from 'react-router-dom';

export const YaRedirect = ({phone}) => {
    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    const auth = useContext(AuthContext);

    // const message = useMessage();
    const history = useHistory();
    const {request} = useHttp();

    const storageName = 'tempUserData';
    const tempUserData = JSON.parse(window.localStorage.getItem('tempUserData'));

    useEffect(() => {
        // try {
        async function fetchData() {
            const dataAuth = await request(`/api/mid-yandex/?code=${code}`, 'GET')
            console.log(dataAuth)

            localStorage.setItem(storageName, JSON.stringify({
                access_token: dataAuth.access_token,
                expires_in: dataAuth.expires_in,
                refresh_token: dataAuth.refresh_token
            }))

        }
        console.log(phone)
        console.log(tempUserData.access_token)
        async function fetchData1() {
            const dataSend = await request(`/api/yandex-oauth/`, 'POST', {
                access_token: tempUserData.access_token,
                expires_in: tempUserData.expires_in,
                refresh_token: tempUserData.refresh_token,
                phone: phone
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
            history.push('/')
        }

        fetchData();
        fetchData1();
    }, [auth, code, history, phone, request])
    return []

}