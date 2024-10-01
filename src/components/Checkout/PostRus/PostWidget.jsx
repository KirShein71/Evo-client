import React from 'react';

const PostWidget = () => {
  const callbackPostRus = (data) => {
    const paramsContainer = document.querySelector('.map__params');
    if (!paramsContainer) return;

    // Очистка предыдущих данных
    paramsContainer.innerHTML = '';

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
  React.useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://widget.pochta.ru/map/widget/widget.js';
      script.async = true;
      script.onload = () => {
        // Проверяем наличие функции
        if (window.ecomStartWidget) {
          window.ecomStartWidget({
            id: 51711,
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

  return <div id="ecom-widget" style={{ height: '500px' }}></div>;
};

export default PostWidget;
