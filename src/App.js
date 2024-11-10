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
    const { user, basketProduct, favoriteProduct } = React.useContext(AppContext);
    const [loading, setLoading] = React.useState(true);
    const [showModal, setShowModal] = React.useState(false); // Состояние для управления отображением модала

    // Проверяем userAgent на наличие Telegram и мобильных устройств
    const isTelegramBrowser = /Telegram/.test(navigator.userAgent);
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

    // Если это Telegram или мобильное устройство, показываем модал и не выполняем другие запросы
    React.useEffect(() => {
        if (isTelegramBrowser && isMobileDevice) {
            setShowModal(true);
        } else {
            setLoading(true);
            Promise.all([checkAuth(), fetchBasket()])
                .then(
                    axios.spread((userData, basketData) => {
                        if (userData) {
                            user.login(userData);
                        }
                        const basketId = basketData.id;

                        // Обработка ошибок для получения продуктов корзины
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
        }
    }, [user, basketProduct, favoriteProduct]);

    // Если пользователь в Telegram, возвращаем только модал
    if (showModal) {
        return (
            <div className="modal-overlay">
                <div className="modal-telegram">
                    <h2 style={{ color: '#ffffff' }}>Внимание!</h2>
                    <p>Пожалуйста, откройте сайт через другой браузер для лучшего опыта.</p>
                    <button onClick={() => setShowModal(false)}>Закрыть</button>
                </div>
            </div>
        );
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="wrapper">
            <BrowserRouter>
                <Header />
                <div className="content">
                    <AppRouter />
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
});

export default App;
