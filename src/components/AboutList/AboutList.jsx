import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function AboutList() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="aboutlist">
      <div className="aboutlist__crumbs">
        <div className="container">
          <div className="aboutlist__crumbs-content">
            <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to="/">
              <div className="aboutlist__crumbs-item">Главная</div>
            </Link>
            <img className="aboutlist__crumbs-icon" src="../img/arrow.png" alt="arrow" />
            <div className="aboutlist__crumbs-item__active">О компании</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="aboutlist__content">
          <div className="aboutlist__title">
            Почему стоит выбрать аксессуары для авто и дома от нашей компании
          </div>
          <p className="abloutlist__text">
            Если вы ищете стильные и качественные аксессуары для автомобиля и дома, то обязательно
            обратите внимание на нашу компанию. Мы - молодая, но стремительно развивающаяся
            компания, основанная в 2020 году опытными специалистами, имеющими богатый опыт работы в
            сфере розничной торговли. Мы знаем, как важно создать продукцию, которая удовлетворит
            потребности самых взыскательных клиентов.
          </p>
          <div className="aboutlist__title">Наша продукция и сервис</div>
          <p className="abloutlist__text">
            Мы начинали с работы на маркетплейсах, но сейчас гордо открываем свою собственную
            розничную сеть с возможностью доставки по всей России и СНГ. В нашем ассортименте более
            3000 проверенных шаблонов (лекал) на автомобили, что позволяет нам предложить широкий
            выбор аксессуаров для вашего транспортного средства.
          </p>
          <div className="aboutlist__title">Качество и производство</div>
          <p className="abloutlist__text">
            Вся наша продукция изготавливается на специализированном оборудовании, что гарантирует
            высокое качество и долгий срок службы. Коврики, чехлы и другие аксессуары для
            автомобилей проходят строгий контроль качества, чтобы вы могли быть уверены в их
            надежности и безопасности.
          </p>
          <div className="aboutlist__title">Индивидуальный подход к каждому клиенту</div>
          <p className="abloutlist__text">
            Мы ценим каждого клиента и гарантируем индивидуальный подход. Наш опыт и знания
            позволяют нам находить решения даже для самых нестандартных запросов. Мы готовы
            предложить вам не просто товар, а полноценное решение для вашего автомобиля и дома. Если
            вы хотите приобрести качественные аксессуары, которые подчеркнут ваш стиль и подарят
            комфорт, обращайтесь к нам. Мы гарантируем высокое качество продукции, индивидуальный
            подход и отличный сервис. Покупая у нас, вы делаете выбор в пользу надежности и
            удовлетворения вашего вкуса.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutList;
