import React from 'react';

const PostWidget = ({ setSelectedAdress }) => {
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
    const paramsContainer = document.querySelector('.map__params');
    if (!paramsContainer) return;

    // Очистка предыдущих данных
    paramsContainer.innerHTML = '';

    // Извлечение значений
    const addressInfo = `${data.addressTo}, ${data.cityTo}, ${data.regionTo}`; // Используем шаблонные строки
    setSelectedAdress(addressInfo); // Обновляем состояние adress

    Object.keys(data).forEach((key) => {
      const item = document.createElement('div');
      item.className = 'map__params-item';
      item.textContent = `${key}: `;

      const valueSpan = document.createElement('span');
      valueSpan.textContent = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key];

      item.appendChild(valueSpan);
      paramsContainer.appendChild(item);
    });
  };

  return (
    <div>
      <div id="ecom-widget"></div>
      <div className="map__params"></div>
    </div>
  );
};

export default PostWidget;
