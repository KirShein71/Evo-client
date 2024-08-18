import React from 'react';
import Product from '../components/Product/Product';
import Product595 from '../components/Product/Product595';
import Product991 from '../components/Product/Product991';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

function ProductProperty() {
  const { originalName } = useParams();
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
  return (
    <>
      <Helmet>
        <title>{`Коврики EVA для ${originalName}`}</title>
        <meta
          name="description"
          content="На этой странице, Вы можете выбрать опции по автомобильному коврику. Такие цвет материала и канта, дополнительно приобрести органайзер и подпятник"
        />
        <meta
          name="keywords"
          content="автомобильные коврики, коврики для автомобилей, автомобильные коврики EVA"
        />
        <meta property="og:title" content={`Коврики EVA для ${originalName}`} />
        <meta
          property="og:description"
          content="На этой странице, Вы можете выбрать опции по автомобильному коврику. Такие цвет материала и канта, дополнительно приобрести органайзер и подпятник"
        />
        <meta property="og:url" content={`https://www.savaks.ru/productproperty/${originalName}`} />
        <meta
          property="og:image"
          content="https://www.savaks.ru/img/savaks%20(1)%20(1).png?v=1723972401637"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      {windowWidth < 600 ? <Product595 /> : windowWidth < 992 ? <Product991 /> : <Product />}
    </>
  );
}

export default ProductProperty;
