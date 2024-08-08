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
      </Helmet>
      <ContactList />
    </>
  );
}

export default Contacts;
