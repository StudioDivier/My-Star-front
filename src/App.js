import React, {useState} from 'react';
import './app.scss';
import {Router} from "./router";
import {BrowserRouter} from "react-router-dom";

function App() {
    const [isAuth, setIsAuth] = useState(false)
    return (
        <div className="App">
            <BrowserRouter>
                <Router isAuth={isAuth}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
