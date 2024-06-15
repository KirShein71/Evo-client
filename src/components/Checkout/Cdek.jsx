import React from 'react';

function Cdek() {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.cdek.ru/widget/widjet.js';
    script.id = 'ISDEKscript';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const widjet = new window.ISDEKWidjet({
        defaultCity: 'Санкт-Петербург',
        link: 'forpvz',
        path: 'https://widget.cdek.ru/widget/scripts/',
        servicepath: 'https://widget.cdek.ru/widget/scripts/service.php',
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <React.Fragment>
      <p>Пример минимальной установки виджета</p>
      <div id="forpvz" style={{ height: '600px' }}></div>
    </React.Fragment>
  );
}

export default Cdek;
