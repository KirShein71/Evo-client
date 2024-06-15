import React from 'react';
import ProductStore from '../store/productStore';
import BasketProductStore from '../store/basketProductStore';
import UserStore from '../store/userStote';

const AppContext = React.createContext();

// контекст, который будем передавать
const context = {
  product: new ProductStore(),
  basketProduct: new BasketProductStore(),
  user: new UserStore(),
};

const AppContextProvider = (props) => {
  return <AppContext.Provider value={context}>{props.children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
