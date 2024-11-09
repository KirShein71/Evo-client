import React from "react";
import AppRouter from "./routes/AppRouter";
import Header from './components/Header/Header'
import Footer from './components/Footer/FooterList'
import { BrowserRouter } from "react-router-dom";
import { AppContext } from './context/AppContext';
import { check as checkAuth } from './http/userApi';
import { getAllBasketProduct, fetchBasket } from './http/basketApi'
import { getAllFavoriteProduct } from "./http/favoriteApi";
import axios from 'axios';
import { observer } from 'mobx-react';
import Loader from "./components/Loader/Loader";

import './app.scss'



const App = observer(() => {
    const { user, basketProduct, favoriteProduct } = React.useContext(AppContext)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const handleError = (message, source, lineno, colno, error) => {
            console.clear(); // Очистка консоли
            if (navigator.userAgent.includes('Telegram')) {
                return true; // Прекратить вывод ошибки в Telegram Web View
            }
            console.error("Error occurred: ", message, " at ", source, ":", lineno, ":", colno);
            // Отправка данных об ошибке на сервер
            fetch('/error-reporting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message, source, lineno, colno, error })
            });
            return true;
        };

        window.onerror = handleError;

        return () => {
            window.onerror = null;
        };
    }, []);
    
    React.useEffect(() => {
        Promise.all([checkAuth(), fetchBasket()])
            .then(
                axios.spread((userData, basketData) => {
                    if (userData) {
                        user.login(userData)
                    }
                    const basketId = basketData.id
                    getAllBasketProduct(basketId)
                    .then((item) => basketProduct.products = item);

                    getAllFavoriteProduct(basketId)
                    .then((item) => favoriteProduct.item = item)
                })
            )
            .finally(
                () => setLoading(false)
            )
    }, [user, basketProduct, favoriteProduct])


    if (loading) {
        return <Loader />
    }
  return (
    <div className="wrapper">
            <BrowserRouter> 
            <Header/>
            <div className="content">
                <AppRouter/>
            </div>
                <Footer/>
            </BrowserRouter>
    </div>
  );
})

export default App;
