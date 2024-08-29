import React from 'react';
import { getAllAnimal } from '../../http/animalApi';
import { getAllMaterialForAnimal } from '../../http/materailRugApi';
import CardAnimal from '../CardAnimal/CardAnimal';
import './style.scss';
import LoaderAnimal from '../LoaderAnimal/LoaderAnimal';
import { Link } from 'react-router-dom';

function AnimalsList() {
  const [animals, setAnimals] = React.useState([]);
  const [materials, setMaterials] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);

  React.useEffect(() => {
    let animalProductLoaded = false;
    let materialLoaded = false;

    const fetchData = async () => {
      const animalProductData = await getAllAnimal();
      setAnimals(animalProductData);
      animalProductLoaded = true;

      const MaterialData = await getAllMaterialForAnimal();
      setMaterials(MaterialData);
      materialLoaded = true;

      if (animalProductLoaded && materialLoaded) {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (fetching) {
    return <LoaderAnimal />;
  }

  return (
    <div className="animalslist">
      <div className="animalslist__crumbs">
        <div className="container">
          <div className="animalslist__crumbs-content">
            <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to="/">
              <div className="animalslist__crumbs-item">Главная</div>
            </Link>
            <div className="animalslist__crumbs-item__active">EVA коврики для животных</div>
          </div>
        </div>
      </div>
      <div className="container">
        {animals.length === 0 ? (
          <div className="animalslist__text">
            Приносим извинения, что карточки товаров пока не добавлены. Однако, мы всегда готовы
            помочь вам с выбором! Просто позвоните нам, и наши опытные менеджеры с удовольствием
            окажут вам помощь в подборе и консультации по нашему ассортименту
          </div>
        ) : (
          <>
            <div className="animalslist__title">Коврики для животных</div>
            <div className="animalslist__content">
              {animals.map((animal) => (
                <CardAnimal key={animal.id} {...animal} materials={materials} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AnimalsList;
