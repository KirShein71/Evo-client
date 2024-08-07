import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Home from '../pages/Home';
import Admin from '../pages/Admin/Admin';
import AdminBrand from '../pages/Admin/AdminBrand/AdminBrand';
import AllBrands from '../pages/AllBrands';
import OneBrand from '../pages/OneBrand';
import AdminProduct from '../pages/Admin/AdminProduct/AdminProduct';
import AdminCarModel from '../pages/Admin/AdminCarModel/AdminCardModel';
import AdminOrder from '../pages/Admin/AdminOrder/AdminOrder';
import ProductProperty from '../pages/ProductProperty';
import AdminMaterialRug from '../pages/Admin/AdminMaterialRug/AdminMaterialRug';
import AdminEdging from '../pages/Admin/AdminEdging/AdminEdging';
import Basket from '../pages/Basket';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Animals from '../pages/Animals';
import AnimalsProperty from '../pages/AnimalsProperty';
import AdminAnimal from '../pages/Admin/AdminAnimal/AdminAnimal';
import HomeProduct from '../pages/HomeProduct';
import AdminHome from '../pages/Admin/AdminHome/AdminHome';
import AdminOrganizer from '../pages/Admin/AdminOrganizer/AdminOrganizer';
import Result from '../pages/Result';
import Guarantees from '../pages/Guarantees';
import Confidentiality from '../pages/Confidentiality';
import Contacts from '../pages/Contacts';
import About from '../pages/About';
import NotFounds from '../pages/NotFounds';
import Favorites from '../pages/Favorites';

import { observer } from 'mobx-react';

const routes = [
  { path: '/', Component: Home },
  { path: '/allbrands', Component: AllBrands },
  { path: '/onebrand/:name', Component: OneBrand },
  { path: '/productproperty/:name', Component: ProductProperty },
  { path: '/basket', Component: Basket },
  { path: '/checkout', Component: Checkout },
  { path: '/login', Component: Login },
  { path: '/animals', Component: Animals },
  { path: '/animalsproperty/:id', Component: AnimalsProperty },
  { path: '/homeproduct', Component: HomeProduct },
  { path: '/result', Component: Result },
  { path: '/guarantees', Component: Guarantees },
  { path: '/confidentiality', Component: Confidentiality },
  { path: '/contacts', Component: Contacts },
  { path: '/about', Component: About },
  { path: '*', Component: NotFounds },
  { path: '/favorites', Component: Favorites },
];

const adminRoutes = [
  { path: '/admin', Component: Admin },
  { path: '/adminbrand', Component: AdminBrand },
  { path: '/adminproduct', Component: AdminProduct },
  { path: '/admincarmodel', Component: AdminCarModel },
  { path: '/adminmaterialrug', Component: AdminMaterialRug },
  { path: '/adminedging', Component: AdminEdging },
  { path: '/adminorder', Component: AdminOrder },
  { path: '/adminanimal', Component: AdminAnimal },
  { path: '/adminhome', Component: AdminHome },
  { path: '/adminorganizer', Component: AdminOrganizer },
];

const AppRouter = observer(() => {
  const { user } = React.useContext(AppContext);
  return (
    <Routes>
      {user.isAdmin &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
});

export default AppRouter;
