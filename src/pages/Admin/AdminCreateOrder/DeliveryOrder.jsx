import React from 'react';
import Cdek from '../../../components/Cdek/Cdek';
import { Row, Col, Form } from 'react-bootstrap';
import PostWidget from '../../../components/Checkout/PostRus/PostWidget';

function DeliveryOrder({
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
  selectedCodePVZ,
  setSelectedCodePVZ,
  selectedCityCode,
  setSelectedCityCode,
  setTariffCode,
  setSelectedLocation,
  setDeliverySum,
  value,
  valid,
  handleChange,
  setSelectedRegion,
  setSelectedIndex,
}) {
  const delivery = [
    {
      id: 2,
      title: 'СДЭК',
    },
    {
      id: 3,
      title: 'Почта России',
    },
  ];

  const handleDeliveryChange = (event) => {
    const selectedDeliveryId = event.target.value;
    setSelectedDeliveryMethod(selectedDeliveryId);
  };

  return (
    <div className="delivery-order">
      <Row className="mb-3 mt-3">
        <Col>
          <Form.Select name="delivery" onChange={(e) => handleDeliveryChange(e)}>
            <option>Способ доставки</option>
            {delivery &&
              delivery.map((delivery) => (
                <option key={delivery.id} value={delivery.id}>
                  {delivery.title}
                </option>
              ))}
          </Form.Select>
        </Col>
      </Row>
      {selectedDeliveryMethod === '2' ? (
        <Cdek
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
        />
      ) : null}

      {selectedDeliveryMethod === '3' ? (
        <PostWidget setSelectedRegion={setSelectedRegion} setSelectedIndex={setSelectedIndex} />
      ) : null}
    </div>
  );
}

export default DeliveryOrder;
