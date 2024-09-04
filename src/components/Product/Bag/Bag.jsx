import React from 'react';
import './style.scss';
import BagMaterial from './BagMaterials/BagMaterial';
import BagSizes from './BagSize/BagSizes';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Bag({
  bags,
  setSelectedBagId,
  bagmaterials,
  selectedBagmaterial,
  setSelectedBagmaterial,
  selectedBagmaterialId,
  setSelectedBagmaterialId,
  selectedBagmaterialName,
  setSelectedBagmaterialName,
  handleBagFourtyChange,
  bagFourtyChecked,
  bagFourtyQuantity,
  setBagFourtyQuantity,
  bagFourty,
  isCountBagFourtyDisabled,
  handleBagFiftyChange,
  bagFiftyChecked,
  bagFiftyQuantity,
  bagFifty,
  isCountBagFiftyDisabled,
  setBagFiftyQuantity,
}) {
  const [sliderRef, setSliderRef] = React.useState(null);

  const settings = {
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    afterChange: (currentSlide) => {
      setSelectedBagId(bags[currentSlide].id);
    },
  };

  return (
    <div className="bag">
      <div className="bag__content">
        <div className="bag__card">
          <div className="bag__card-content">
            <div style={{ display: 'flex', marginRight: '45px' }}>
              <div className="bag__card-arrow" onClick={() => sliderRef?.slickPrev()}>
                <img src="../img/left.png" alt="arrow_left" />
              </div>
              <div className="bag__card-product">
                <Slider ref={setSliderRef} {...settings}>
                  {bags.map((bag) => (
                    <div key={bag.id}>
                      <div className="bag__card-product__image">
                        {bag.bag_images.map((bagImage) => (
                          <div
                            key={bagImage.id}
                            style={{
                              display:
                                bagImage.bagmaterialId === selectedBagmaterialId ? 'block' : 'none',
                            }}>
                            <img
                              src={process.env.REACT_APP_IMG_URL + bagImage.image}
                              alt="image bag"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="bag__card-product__title">{bag.name}</div>
                    </div>
                  ))}
                </Slider>
              </div>
              <div>
                <div className="bag__card-arrow" onClick={() => sliderRef?.slickNext()}>
                  <img src="../img/right.png" alt="arrow_right" />
                </div>
              </div>
            </div>
            <div className="bag__card-construtor">
              <BagMaterial
                bagmaterials={bagmaterials}
                selectedBagmaterialName={selectedBagmaterialName}
                setSelectedBagmaterialName={setSelectedBagmaterialName}
                selectedBagmaterial={selectedBagmaterial}
                setSelectedBagmaterial={setSelectedBagmaterial}
                setSelectedBagmaterialId={setSelectedBagmaterialId}
              />
              <BagSizes
                handleBagFourtyChange={handleBagFourtyChange}
                bagFourtyChecked={bagFourtyChecked}
                bagFourtyQuantity={bagFourtyQuantity}
                setBagFourtyQuantity={setBagFourtyQuantity}
                bagFourty={bagFourty}
                isCountBagFourtyDisabled={isCountBagFourtyDisabled}
                handleBagFiftyChange={handleBagFiftyChange}
                bagFiftyChecked={bagFiftyChecked}
                bagFiftyQuantity={bagFiftyQuantity}
                bagFifty={bagFifty}
                isCountBagFiftyDisabled={isCountBagFiftyDisabled}
                setBagFiftyQuantity={setBagFiftyQuantity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bag;
