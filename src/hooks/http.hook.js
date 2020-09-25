import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [error, setError] = useState(null);
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-type'] = 'application/json';
            }

            url = 'http://192.168.1.131:8080' + url
            const response = await fetch(url, {method, body, headers});
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