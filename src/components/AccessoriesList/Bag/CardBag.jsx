import React from 'react';
import { Link } from 'react-router-dom';

function CardBag({ name, new_price, bag_images }) {
  const [originalName] = React.useState(name);
  const formattedName = originalName.replace(/-+/g, '--').replace(/\s+/g, '-');
  return (
    <div className="cardbag">
      <Link to={`/organizer/${formattedName}`}>
        <div className="cardbag__content">
          <div className="cardbag__image">
            {bag_images
              .filter((img) => img.bagmaterialId === 1)
              .map((img) => (
                <img key={img.id} src={process.env.REACT_APP_IMG_URL + img.image} alt="image bag" />
              ))}
          </div>
          <div class="cardbag__bottom">
            <h4 class="cardbag__title">{name}</h4>
            <div class="cardbag__price"> от {new_price} Р</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardBag;
