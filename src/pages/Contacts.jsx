import React from 'react';
import ContactList from '../components/ContactList/ContactList';
import { Helmet } from 'react-helmet';

function Contacts() {
  return (
    <>
      <Helmet>
        <title>Контакты</title>
        <meta
          name="description"
          content="Свяжитесь с нами! Мы всегда рады помочь вам. На этой странице вы найдете все необходимые контактные данные нашей компании, включая телефон, электронную почту и адрес офиса. Если у вас есть вопросы, предложения или вам нужна поддержка, не стесняйтесь обращаться к нам. Мы ценим ваше мнение и готовы ответить на все ваши запросы!"
        />
        <meta name="keywords" content="контакты, телефон, email, адрес, связь" />
        <meta property="og:title" content="Контакты" />
        <meta
          property="og:description"
          content="Свяжитесь с нами! Мы всегда рады помочь вам. На этой странице вы найдете все необходимые контактные данные нашей компании, включая телефон, электронную почту и адрес офиса. Если у вас есть вопросы, предложения или вам нужна поддержка, не стесняйтесь обращаться к нам. Мы ценим ваше мнение и готовы ответить на все ваши запросы! "
        />
        <meta property="og:url" content="https://www.savaks.ru/contacts" />
        <meta
          property="og:image"
          content="https://www.savaks.ru/img/savaks%20(1)%20(1).png?v=1723972401637"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <ContactList />
    </>
  );
}

export default Contacts;
