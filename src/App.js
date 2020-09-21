import React from 'react';
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from "./context/AuthContext";
import {useRoutes} from "./routes";

function App() {
    const {login, logout, token, userId, star} = useAuth();

    const isAuthenticated = !!token;
    let isStar = !!star;

    const routes = useRoutes(isAuthenticated, isStar)

    return (
    <AuthContext.Provider value={{token, userId, login, logout, isStar}}>
      <BrowserRouter>
        <div className="App">
          {routes}
        </div>
      </BrowserRouter>
     </AuthContext.Provider>
    );
}

export default App;
