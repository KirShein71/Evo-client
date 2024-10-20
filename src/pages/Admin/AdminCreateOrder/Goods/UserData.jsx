import React from 'react';

function UserData({
  phone,
  clicked,
  valid,
  value,
  handleChange,
  handleInputClick,
  handleInputPhone,
}) {
  return (
    <div className="user-data">
      <div className="user-data__inputs">
        <input
          name="name"
          value={value.name}
          onChange={(e) => handleChange(e)}
          isValid={valid.name === true}
          isInvalid={valid.name === false}
          placeholder="Введите имя..."
        />
        <input
          name="surname"
          value={value.surname}
          onChange={(e) => handleChange(e)}
          isValid={valid.surname === true}
          isInvalid={valid.surname === false}
          placeholder="Введите фамилию..."
        />
        <input
          name="phone"
          value={clicked ? phone : ''}
          onChange={handleInputPhone}
          onClick={handleInputClick}
          isValid={valid.phone === true}
          isInvalid={valid.phone === false}
          placeholder="Введите номер телефона..."
        />
      </div>
    </div>
  );
}

export default UserData;
