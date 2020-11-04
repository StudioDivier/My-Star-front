import React, {useContext, useState} from 'react';
import {useHttp} from "../../../../hooks/http.hook";
import {AuthContext} from "../../../../context/AuthContext";
import {useHistory} from 'react-router-dom';
import {useMessage} from "../../../../hooks/message.hook";

export const YaLogin = () => {

    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    const auth = useContext(AuthContext);
    const history = useHistory();
    const message = useMessage();
    const {request} = useHttp();

    const proceedAuth = async () => {
        try {
            const dataAuth = await request(`/api/mid-yandex/?code=${code}`, 'GET')

            const dataSend = await request(`/api/ya-login/`, 'POST', {
                access_token: dataAuth.access_token,
                expires_in: dataAuth.expires_in,
                refresh_token: dataAuth.refresh_token
            })

            auth.login(dataSend.token, dataSend.username, dataSend.is_star, dataSend.id);

            history.push('/')
            window.location.reload()
        } catch (e) {
            message(e);
        }

    }

    proceedAuth();

    return []


}