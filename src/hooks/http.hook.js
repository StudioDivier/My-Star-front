import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = useCallback(async (url, method = 'GET', headers = {}, body = null) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-type'] = 'application/json';
            }

            url = 'http://192.168.1.131:8080' + url
            const response = await fetch(url, {method, headers, body});
            const data = await response.json()

            // for (let key in data) {
            //     console.log("Ключ: " + key + " значение: " + data[key])
            // }

            if (!response.ok) {
                throw new Error(`Ошибка: ${data.message}` || `Ошибка: неизвестно`)
            }

            setLoading(false);

            return data;

        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => {
        setError(null)
    }, [])


    return {loading, request, error, clearError}
}