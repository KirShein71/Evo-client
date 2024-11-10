import React from 'react';
import CardBag from '../../AccessoriesList/Bag/CardBag';
import { getAllBag } from '../../../http/bagApi';
import './style.scss';

function BottomSale() {
  const [bags, setBags] = React.useState([]);

  //   const [bagId, setBagId] = React.useState(null);
  //   const [fetching, setFetching] = React.useState(true);
  //   const [openModalConstructor, setOpenModalConstructor] = React.useState(false);
  //   const [bagmaterials, setBagmaterials] = React.useState([]);
  //   const [selectedBagmaterial, setSelectedBagmaterial] = React.useState('blacksota');
  //   const [selectedBagmaterialId, setSelectedBagmaterialId] = React.useState(1);
  //   const [selectedBagmaterialName, setSelectedBagmaterialName] = React.useState('Черный');
  //   const [bagsizes, setBagsizes] = React.useState([]);
  //   const [bagSizeChecked, setBagSizeChecked] = React.useState(false);
  //   const [selectedBagSize, setSelectedBagSize] = React.useState(1);

  React.useEffect(() => {
    const fetchData = async () => {
      const bagData = await getAllBag();
      setBags(bagData);
    };

    fetchData();
  }, []);

  //   const handleOpenModalConstructor = (id) => {
  //     setBagId(id);
  //     setOpenModalConstructor(true);
  //   };

  //   const closedModalConstructor = () => {
  //     setOpenModalConstructor(false);
  //   };

  return (
    <div className="bottomsale">
      <h3 className="bottomsale__title">С этим товаром покупают</h3>
      <div className="bottomsale__content">
        {bags.map((bag) => (
          <CardBag key={bag.id} {...bag} />
        ))}
      </div>
      {/* {openModalConstructor && (
        <ConstructorModal
          id={bagId}
          closed={closedModalConstructor}
          bags={bags}
          bagmaterials={bagmaterials}
          selectedBagmaterialName={selectedBagmaterialName}
          setSelectedBagmaterial={setSelectedBagmaterial}
          selectedBagmaterial={selectedBagmaterial}
          setSelectedBagmaterialName={setSelectedBagmaterialName}
          setSelectedBagmaterialId={setSelectedBagmaterialId}
        />
      )} */}
    </div>
  );
}

export default BottomSale;
