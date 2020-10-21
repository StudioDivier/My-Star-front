import {useState, useCallback, useEffect} from 'react';
// import {useHistory} from 'react-router-dom';

const storageName = 'userData';

export const useAuth = () => {
    // const history = useHistory();
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [star, setStar] = useState(null);
    const [id, setId] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [email, setEmail] = useState(null);

    const login = useCallback((jwtToken, username, star, id, email, avatar) => {
        setToken(jwtToken);
        setUserName(username);
        setStar(star);
        setId(id);
        setEmail(email)
        setAvatar(avatar);

        localStorage.setItem(storageName, JSON.stringify({
            username: username, is_star: star, token: jwtToken, userId: id, email: email, avatar: avatar
        }))

        // let _username = JSON.parse(localStorage.getItem(storageName)).username;
        // let _is_star = JSON.parse(localStorage.getItem(storageName)).is_star;
        // let _token = JSON.parse(localStorage.getItem(storageName)).token;

        // history.push('/categories');
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
            login(data.token, data.username, data.is_star, data.userId, data.email, data.avatar)
        }
    }, [login])

    return {login, logout, token, userName, star, id, email, avatar}
}