import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [star, setStar] = useState(null);
    const [id, setId] = useState(null);

    const login = useCallback((jwtToken, username, star, id) => {
        setToken(jwtToken);
        setUserName(username);
        setStar(star);
        setId(id);

        localStorage.setItem(storageName, JSON.stringify({
            username: username, is_star: star, token: jwtToken, userId: id
        }))

        // let _username = JSON.parse(localStorage.getItem(storageName)).username;
        // let _is_star = JSON.parse(localStorage.getItem(storageName)).is_star;
        // let _token = JSON.parse(localStorage.getItem(storageName)).token;


    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserName(null);
        setStar(null);
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.username, data.is_star, data.userId)
        }
    }, [login])

    return {login, logout, token, userName, star, id}
}