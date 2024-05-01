import React from 'react';
import Product from '../components/Product/Product';
import Product595 from '../components/Product/Product595';

function ProductProperty() {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return <>{windowWidth < 600 ? <Product595 /> : <Product />}</>;
}

export default ProductProperty;
