import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [star, setStar] = useState(null);

    const login = useCallback((jwtToken, id, star) => {
        setToken(jwtToken);
        setUserId(id);
        setStar(star);

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, star: star
        }))
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setStar(null);
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userId, data.star)
        }
    }, [login])

    return {login, logout, token, userId, star}
}