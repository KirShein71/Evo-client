import React from "react";
import AppRouter from "./routes/AppRouter";
import Header from './components/Header/Header'
import Footer from './components/Footer/FooterList'
import { BrowserRouter } from "react-router-dom";
import { AppContext } from './context/AppContext';
import { check as checkAuth } from './http/adminApi';
import axios from 'axios';
import { observer } from 'mobx-react';
import { Spinner } from 'react-bootstrap';

import './app.scss'

const App = observer(() => {
    const { user } = React.useContext(AppContext)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        Promise.all([checkAuth()])
            .then(
                axios.spread((userData) => {
                    if (userData) {
                        user.login(userData)
                    }
                })
            )
            .finally(
                () => setLoading(false)
            )
    }, [user])


    if (loading) {
        return <Spinner />
    }
  return (
    <div className="wrapper">
            <BrowserRouter> 
                <Header/>
                <AppRouter/>
                <Footer/>
            </BrowserRouter>
    </div>
  );
})

export default App;
