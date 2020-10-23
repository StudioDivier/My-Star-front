import {useState, useCallback} from 'react';

export const useHttp = () => {
    // let boundary1 = String(Math.random()).slice(2);
    const [error, setError] = useState(null);
    const request = useCallback(async (url, method = 'GET', mode='no-cors', body = null, headers = {}, redirect = 'manual') => {
        try {
            if (body) {
                body = JSON.stringify(body);
                // if (!(headers['Content-Type'] = 'multipart/form-data')) {
                // }
                headers['Content-type'] = 'application/json';
                // headers['Content-Type'] = 'multipart/form-data';
                // headers['boundary'] = boundary1;
                // headers['Access-Control-Allow-Headers'] = `*`;

            }

            url = 'http://192.168.1.131:8080' + url
            const response = await fetch(url, { method, mode, body, headers, redirect});
            const data = await response.json()

            // for (let key in data) {
            //     console.log("Ключ: " + key + " значение: " + data[key])
            // }

            // if (url == 'http://192.168.1.131:8080/api/login/') {
            //
            // }

            // if (!response.ok) {
            //     console.log("Некорректные данные при регистрации")
            //     data.error = "Некорректные данные при регистрации"
            //     throw new Error(`Ошибка: ${data.message}` || `Ошибка: неизвестно`)
            // }
            return data;

        } catch (e) {
            // console.log(e.message)
            // setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => {
        setError(null)
    }, [])


    return {request, error, clearError}
}