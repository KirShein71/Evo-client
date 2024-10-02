import React from 'react';
import './style.scss';

const PostWidget = () => {
  const [adress, setAdress] = React.useState(''); // Создаем состояние для адреса

  React.useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://widget.pochta.ru/map/widget/widget.js';
      script.async = true;
      script.onload = () => {
        if (window.ecomStartWidget) {
          window.ecomStartWidget({
            id: 51711,
            weight: '2000',
            sumoc: '3000',
            dimensions: [{ length: 75, width: 40, height: 5 }],
            callbackFunction: callbackPostRus,
            containerId: 'ecom-widget',
          });
        } else {
          console.error('ecomStartWidget is not defined');
        }
      };
      document.body.appendChild(script);
    };

    loadScript();

    return () => {
      const widgetContainer = document.getElementById('ecom-widget');
      if (widgetContainer) {
        widgetContainer.innerHTML = ''; // Очистка содержимого контейнера
      }
    };
  }, []);

  const callbackPostRus = (data) => {
    // Извлечение значений
    const addressInfo = `${data.addressTo}, ${data.cityTo}, ${data.regionTo}`; // Исправлено на шаблонные строки
    setAdress(addressInfo); // Обновляем состояние adress
    console.log('Address Info:', addressInfo);
  };

  const resetPvz = () => {
    resetSelectedPlacemarkInEcomWidget();
    setAdress('');
  };

  return (
    <div>
      <div id="ecom-widget" className="post__widget"></div>
      <div className="post__widget-text">Вы выбрали пункт выдачи:</div>
      <div style={{ display: 'flex' }}>
        <div className="post__widget-adress">{adress} </div>
        {adress !== '' ? (
          <p className="post-widget__reset" onClick={resetPvz}>
            (Изменить)
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default PostWidget;
