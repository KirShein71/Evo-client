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



class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Ошибка поймана в ErrorBoundary: ", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Что-то пошло не так.</h1>;
        }

        return this.props.children; 
    }
}

const App = observer(() => {
    const { user, basketProduct, favoriteProduct } = React.useContext(AppContext);
    const [loading, setLoading] = React.useState(true);
    const [showHeader, setShowHeader] = React.useState(true);

    React.useEffect(() => {
        const isTelegramBrowser = /WebView/i.test(navigator.userAgent);
        const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

        if (isTelegramBrowser && isMobileDevice) {
            setShowHeader(false);
        }

        setLoading(true);
        Promise.all([checkAuth(), fetchBasket()])
            .then(
                axios.spread((userData, basketData) => {
                    if (userData) {
                        user.login(userData);
                    }
                    const basketId = basketData.id;

                    getAllBasketProduct(basketId)
                        .then((item) => {
                            basketProduct.products = item;
                        })
                        .catch((error) => {
                            console.error("Ошибка при получении продуктов корзины:", error);
                        });

                    getAllFavoriteProduct(basketId)
                        .then((item) => {
                            favoriteProduct.item = item;
                        })
                        .catch((error) => {
                            console.error("Ошибка при получении избранных продуктов:", error);
                        });
                })
            )
            .catch((error) => {
                console.error("Ошибка при проверке авторизации или получении корзины:", error);
            })
            .finally(() => setLoading(false));
    }, [user, basketProduct, favoriteProduct]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="wrapper">
            <BrowserRouter>
                <ErrorBoundary>
                    {showHeader && <Header />}
                    <div className="content">
                        <AppRouter />
                    </div>
                    <Footer />
                </ErrorBoundary>
            </BrowserRouter>
        </div>
    );
});

export default App;