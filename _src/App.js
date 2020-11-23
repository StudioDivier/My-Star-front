import React from 'react';
import './App.scss';
import 'materialize-css/dist/css/materialize.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from "./context/AuthContext";
import {useRoutes} from "./routes";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons';

library.add(fab, faStar, faStarEmpty, faArrowLeft)

function App() {
    const {login, logout, token, userId, star, id, email, avatar, userName} = useAuth();

    const isAuthenticated = !!token;
    let isStar = !!star;

    const routes = useRoutes(isAuthenticated, isStar)

    return (
    <AuthContext.Provider value={{token, userId, login, logout, isStar, id, email, avatar, userName}}>
      <BrowserRouter>
        <div className="App">
          {routes}
        </div>
      </BrowserRouter>
     </AuthContext.Provider>
    );
}

export default App;
