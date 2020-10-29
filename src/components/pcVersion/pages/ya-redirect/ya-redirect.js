import React, {useEffect} from 'react';
import {useHttp} from "../../../../hooks/http.hook";
import {useMessage} from "../../../../hooks/message.hook";

export const YaRedirect = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    const message = useMessage();
    const {request} = useHttp();

    useEffect(async () => {
        try {
            const dataAuth = await request(`/api/mid-yandex/?code=${code}`, 'GET')
            console.log(dataAuth)
            // window.open(`${dataAuth.link}`, "_blank").focus();

            // if (Object.keys(dataAuth).length !== 1) {
            //     setTimeout(() => {
            //         for (let e in dataAuth) {
            //             message([e + ' : ' + dataAuth[e][0]]);
            //         }
            //     }, 555)
            //
            // }
            // const dataLog = await request('/api/login/', 'POST', {...form})
            // console.log(dataLog)
            //
            // auth.login(dataLog.token, dataLog.username, dataLog.is_star, dataLog.id);
            //
            // closeModal();

        } catch (e) {
            message(e);
        }

    })
    return []

}