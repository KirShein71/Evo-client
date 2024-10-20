import React from 'react';
import Goods from './Goods/Goods';
import { adminCreate } from '../../../http/orderApi';

import './style.scss';
import { Button, Col, Form, Container } from 'react-bootstrap';
import DeliveryOrder from './DeliveryOrder';
import UserData from './Goods/UserData';

function CreateOrder() {
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [selectedMaterial, setSelectedMaterial] = React.useState(null);
  const [selectedEdging, setSelectedEdging] = React.useState(null);
  const [selectedSteel, setSelectedSteel] = React.useState(0);
  const [selectedSaddle, setSelectedSaddle] = React.useState(0);
  const [selectedTrunk, setSelectedTrunk] = React.useState(null);
  const [selectedThirdrow, setSelectedThirdrow] = React.useState(null);
  const [quantity, setQuantity] = React.useState(0);
  const [quantityTrunk, setQuantityTrunk] = React.useState(0);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = React.useState(null);
  const [value, setValue] = React.useState({ name: '', surname: '', phone: '' });
  const [valid, setValid] = React.useState({ name: null, surname: null, phone: null });
  const [selectedCodePVZ, setSelectedCodePVZ] = React.useState(null);
  const [selectedCityCode, setSelectedCityCode] = React.useState(null);
  const [tariffCode, setTariffCode] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [deliverySum, setDeliverySum] = React.useState(null);
  const [selectedRegion, setSelectedRegion] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [phone, setPhone] = React.useState('');
  const [clicked, setClicked] = React.useState(false);
  const [order, setOrder] = React.useState(false);

  const isValid = (input) => {
    let pattern;
    switch (input.name) {
      case 'name':
        pattern = /^[а-яА-Яa-zA-Z\s]+$/;
        return pattern.test(input.value.trim());
      case 'surname':
        pattern = /^[а-яА-Яa-zA-Z\s]+$/;
        return pattern.test(input.value.trim());
      case 'phone':
        pattern = /^[8]{1}[0-9]{3}[0-9]{3}[0-9]{4}$/i;
        return pattern.test(input.value.trim());

      default:
        return false;
    }
  };

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
    setValid({ ...valid, [event.target.name]: isValid(event.target) });
  };

  const handleInputClick = () => {
    if (!clicked) {
      setClicked(true);
      setPhone('8');
    } else {
      setPhone('8');
    }
  };

  const handleInputPhone = (event) => {
    const regex = /^[0-9]*$/;
    if (event.target.value.length <= 11 && regex.test(event.target.value)) {
      setPhone(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('productId', selectedProduct);
    data.append('materialId', selectedMaterial);
    data.append('cellshapeId', 2);
    data.append('edgingId', selectedEdging);
    data.append('saddleId', selectedSaddle);
    data.append('steelId', selectedSteel);
    data.append('trunkId', selectedTrunk ? selectedTrunk : 0);
    data.append('thirdrowId', selectedThirdrow ? selectedThirdrow : 0);
    data.append('quantity', quantity);
    data.append('quantity_trunk', quantityTrunk);
    data.append('delivery', selectedDeliveryMethod);
    data.append('region', selectedRegion);
    data.append('city', selectedIndex);
    data.append('citycode', selectedCityCode);
    data.append('codepvz', selectedCodePVZ);
    data.append('tariffcode', tariffCode);
    data.append('deliverysum', deliverySum);
    data.append('location', selectedLocation);
    data.append('name', value.name);
    data.append('surname', value.surname);
    data.append('phone', phone);
    data.append('street', value.street ? value.street : '');
    data.append('home', value.home ? value.home : '');
    data.append('flat', value.flat ? value.flat : '');

    adminCreate(data)
      .then((data) => {
        setOrder(true);
      })
      .catch((error) => alert(error.response.data.message));
  };

  if (order) {
    // заказ был успешно оформлен
    return (
      <Container>
        <h1 className="processed__title">Заказ оформлен</h1>
      </Container>
    );
  }

  return (
    <div className="create-order">
      <div className="container">
        <div className="create-order__content">
          <Form noValidate onSubmit={handleSubmit}>
            <div className="create-order__title">Создание заказа</div>
            <div className="create-order__steps">
              <div className="create-order__step">
                <div className="create-order__steps-title">Выбор товара</div>
                <Goods
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                  setSelectedMaterial={setSelectedMaterial}
                  setSelectedEdging={setSelectedEdging}
                  setSelectedSteel={setSelectedSteel}
                  setSelectedSaddle={setSelectedSaddle}
                  setSelectedTrunk={setSelectedTrunk}
                  setSelectedThirdrow={setSelectedThirdrow}
                  setQuantity={setQuantity}
                  setQuantityTrunk={setQuantityTrunk}
                />
              </div>
              <div className="create-order__step">
                <div className="create-order__steps-title">Данные клиента</div>
                <UserData
                  phone={phone}
                  clicked={clicked}
                  value={value}
                  valid={valid}
                  handleChange={handleChange}
                  handleInputClick={handleInputClick}
                  handleInputPhone={handleInputPhone}
                />
              </div>
              <div className="create-order__step">
                <div className="create-order__steps-title">Способ доставки</div>
                <DeliveryOrder
                  selectedDeliveryMethod={selectedDeliveryMethod}
                  setSelectedDeliveryMethod={setSelectedDeliveryMethod}
                  selectedCodePVZ={selectedCodePVZ}
                  setSelectedCodePVZ={setSelectedCodePVZ}
                  selectedCityCode={selectedCityCode}
                  setSelectedCityCode={setSelectedCityCode}
                  setTariffCode={setTariffCode}
                  setSelectedLocation={setSelectedLocation}
                  setDeliverySum={setDeliverySum}
                  value={value}
                  valid={valid}
                  handleChange={handleChange}
                  setSelectedRegion={setSelectedRegion}
                  setSelectedIndex={setSelectedIndex}
                />
              </div>
            </div>
            <Col className="mb-3 mt-3">
              <Button type="submit">Сохранить</Button>
            </Col>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;
