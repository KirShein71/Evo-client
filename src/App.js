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

    window.onerror = function(message, source, lineno, colno, error) {
        console.error("Error caught: ", message, " at ", source, ":", lineno, ":", colno);
        // Возвращаем true, чтобы предотвратить дальнейшую обработку ошибки
        return true;
    };
    
    
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
