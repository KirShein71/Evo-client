import React from 'react';
import ModalBasket from './modal/ModalBasket';
import './style.scss';

function BasketCard({
  product,
  animal,
  home,
  material,
  cellshape,
  edging,
  body,
  trunk,
  thirdrow,
  saddle,
  steel,
  organizer,
  organizerfifty,
  remove,
  id,
  quantity,
  quantity_trunk,
  quantity_organizer,
  quantity_organizerfifty,
}) {
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const hadleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  return (
    <div className="basketcard">
      {product === null && animal === null && trunk != null && (
        <>
          <div className="basketcard__content">
            {openDeleteModal && (
              <ModalBasket
                remove={remove}
                id={id}
                handleCloseDeleteModal={handleCloseDeleteModal}
              />
            )}
            <div className="basketcard__delete">
              <img src="./img/delete.png" alt="delete" onClick={hadleOpenDeleteModal} />
            </div>
            <div className="basketcard__content-left">
              <div className="basketcard__content-left__image">
                <img
                  className="edging__image"
                  src={process.env.REACT_APP_IMG_URL + edging.image}
                  alt="edging__image"
                />
                <img
                  className="material__image"
                  src={process.env.REACT_APP_IMG_URL + material.image}
                  alt="material__image"
                />
              </div>
            </div>
            <div className="basketcard__content-right">
              <div className="basketcard__content-right__information">
                <div className="basketcard__content-right__name">
                  {trunk.product?.name}(Коврик в багажник)
                </div>
                <div className="basketcard__content-right__body">Тип кузова: {body.name}</div>
                <div className="basketcard__content-right__cellshape">
                  Форма ячейки: {cellshape?.name === 'sota' ? 'Сота' : 'Ромб'}
                </div>
                <div className="basketcard__content-right__material">
                  Цвет материала: {material.name}
                </div>
                <div className="basketcard__content-right__edging">Цвет канта: {edging.name}</div>
              </div>
              <div className="basketcard__content-right__numbers">
                <div className="basketcard__content-right__quantity">
                  Количество: {quantity_trunk} шт
                </div>
                <div className="basketcard__content-right__price">
                  Цена: {trunk?.new_price * quantity_trunk} Р{' '}
                  <span>(цена за 1шт: {trunk.new_price} Р)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="basketcard__bottom">
            <div className="basketcard__total">{trunk?.new_price * quantity_trunk} Р</div>
          </div>
        </>
      )}
      {product != null && animal === null && (
        <>
          <div className="basketcard__content">
            {openDeleteModal && (
              <ModalBasket
                remove={remove}
                id={id}
                handleCloseDeleteModal={handleCloseDeleteModal}
              />
            )}
            <div className="basketcard__delete">
              <img src="./img/delete.png" alt="delete" onClick={hadleOpenDeleteModal} />
            </div>
            <div className="basketcard__content-left">
              <div className="basketcard__content-left__image">
                <img
                  className="edging__image"
                  src={process.env.REACT_APP_IMG_URL + edging.image}
                  alt="edging__image"
                />
                <img
                  className="material__image"
                  src={process.env.REACT_APP_IMG_URL + material.image}
                  alt="material__image"
                />
              </div>
            </div>
            <div className="basketcard__content-right">
              <div className="basketcard__content-right__information">
                <div className="basketcard__content-right__name">
                  {product === null ? trunk.product.name : product.name}
                </div>
                <div className="basketcard__content-right__body">Тип кузова: {body.name}</div>
                <div className="basketcard__content-right__cellshape">
                  Форма ячейки: {cellshape?.name === 'sota' ? 'Сота' : 'Ромб'}
                </div>
                <div className="basketcard__content-right__material">
                  Цвет материала: {material.name}
                </div>
                <div className="basketcard__content-right__edging">Цвет канта: {edging.name}</div>
              </div>
              <div className="basketcard__content-right__numbers">
                <div className="basketcard__content-right__quantity">Количество: {quantity} шт</div>
                <div className="basketcard__content-right__price">
                  Цена:{' '}
                  {thirdrow === null
                    ? product.new_price * quantity
                    : thirdrow?.new_price * quantity}{' '}
                  Р
                  <span>
                    (цена за 1шт:{' '}
                    {thirdrow === null
                      ? product.new_price * quantity
                      : thirdrow?.new_price * quantity}{' '}
                    Р)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="basketcard__bottom">
            {trunk === null ? (
              ''
            ) : (
              <div className="basketcard__bottom-content">
                <div className="basketcard__bottom-content__title">
                  + Коврик в багажник: {quantity_trunk} шт
                </div>
                <div className="basketcard__bottom-content__price">
                  Цена: {trunk.new_price * quantity_trunk} Р{' '}
                  <span>(цена за 1шт: {trunk.new_price} Р)</span>{' '}
                </div>
              </div>
            )}
            {saddle === null ? (
              ''
            ) : (
              <div className="basketcard__bottom-content">
                <div className="basketcard__bottom-content__title">
                  + Подпятник алюминевый: 1 шт
                </div>
                <div className="basketcard__bottom-content__price">Цена: {saddle.new_price} Р</div>
              </div>
            )}
            {steel === null ? (
              ''
            ) : (
              <div className="basketcard__bottom-content">
                <div className="basketcard__bottom-content__title">
                  + Подпятник стальной "Z": 1 шт
                </div>
                <div className="basketcard__bottom-content__price">Цена: {steel.new_price} Р</div>
              </div>
            )}
            {organizer === null ? (
              ''
            ) : (
              <div className="basketcard__bottom-content">
                <div className="basketcard__bottom-content__title">
                  + Органайзер {organizer.size} см :
                </div>
                <div className="basketcard__bottom-content__price">
                  Цена: {organizer.new_price} Р ({quantity_organizer} шт)
                </div>
              </div>
            )}
            {organizerfifty === null ? (
              ''
            ) : (
              <div className="basketcard__bottom-content">
                <div className="basketcard__bottom-content__title">
                  + Органайзер {organizer.size} см :
                </div>
                <div className="basketcard__bottom-content__price">
                  Цена: {organizerfifty.new_price} Р ({quantity_organizerfifty} шт)
                </div>
              </div>
            )}
            <div className="basketcard__total">
              {(thirdrow && thirdrow.new_price ? thirdrow.new_price : product.new_price) *
                quantity +
                (trunk && trunk.new_price ? trunk.new_price : 0) * quantity_trunk +
                (steel && steel.new_price ? steel.new_price : 0) +
                (saddle && saddle.new_price ? saddle.new_price : 0) +
                (organizer && organizer.new_price ? organizer.new_price : 0) * quantity_organizer +
                (organizerfifty && organizerfifty.new_price ? organizerfifty.new_price : 0) *
                  quantity_organizerfifty}
              Р
            </div>
          </div>
        </>
      )}
      {animal != null && product === null && trunk === null && (
        <div className="basketcard__animal">
          {openDeleteModal && (
            <ModalBasket remove={remove} id={id} handleCloseDeleteModal={handleCloseDeleteModal} />
          )}
          <div className="basketcard__delete">
            <img src="./img/delete.png" alt="delete" onClick={hadleOpenDeleteModal} />
          </div>
          <div className="basketcard__animal-left">
            <div className="basketcard__animal-left__image">
              <img
                className="edging__image"
                src={process.env.REACT_APP_IMG_URL + animal.image}
                alt="edging__image"
              />
            </div>
          </div>
          <div className="basketcard__animal-right">
            <div className="basketcard__animal-right__information">
              <div className="basketcard__animal-right__name">{animal.name}</div>
            </div>
            <div className="basketcard__content-right__material">
              Цвет материала: {material.name}
            </div>
            <div className="basketcard__content-right__edging">Цвет канта: {edging.name}</div>
            <div className="basketcard__animal-right__numbers">
              <div className="basketcard__animal-right__quantity">Количество: {quantity} шт</div>
              <div className="basketcard__animal-right__price">
                Цена: {animal.new_price * quantity} Р{' '}
                <span>(цена за 1шт: {animal.new_price} Р)</span>
              </div>
            </div>
            <div className="basketcard__total">{animal.new_price * quantity} Р</div>
          </div>
        </div>
      )}
      {home != null && product === null && trunk === null && (
        <div className="basketcard__animal">
          {openDeleteModal && (
            <ModalBasket remove={remove} id={id} handleCloseDeleteModal={handleCloseDeleteModal} />
          )}
          <div className="basketcard__delete">
            <img src="./img/delete.png" alt="delete" onClick={hadleOpenDeleteModal} />
          </div>
          <div className="basketcard__animal-left">
            <div className="basketcard__animal-left__image">
              <img
                className="edging__image"
                src={process.env.REACT_APP_IMG_URL + home.image}
                alt="edging__image"
              />
            </div>
          </div>
          <div className="basketcard__animal-right">
            <div className="basketcard__animal-right__information">
              <div className="basketcard__animal-right__name">{home.name}</div>
            </div>
            <div className="basketcard__content-right__material">
              Цвет материала: {material.name}
            </div>
            <div className="basketcard__content-right__edging">Цвет канта: {edging.name}</div>
            <div className="basketcard__animal-right__numbers">
              <div className="basketcard__animal-right__quantity">Количество: {quantity} шт</div>
              <div className="basketcard__animal-right__price">
                Цена: {home.new_price * quantity} Р <span>(цена за 1шт: {home.new_price} Р)</span>
              </div>
            </div>
            <div className="basketcard__total">{home.new_price * quantity} Р</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BasketCard;
