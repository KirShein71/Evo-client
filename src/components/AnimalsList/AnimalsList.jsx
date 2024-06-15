import React from 'react';
import { getAllAnimal } from '../../http/animalApi';
import CardAnimal from '../CardAnimal/CardAnimal';
import './style.scss';
import LoaderAnimal from '../LoaderAnimal/LoaderAnimal';

function AnimalsList() {
  const [animals, setAnimals] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    getAllAnimal()
      .then((data) => {
        setAnimals(data);
        setFetching(false);
      })
      .catch((error) => {
        console.error('Произошла ошибка при загрузке данных:', error);
        setFetching(false);
      });
  }, []);

  if (fetching) {
    return <LoaderAnimal />;
  }

  return (
    <div className="animalslist">
      <div className="container">
        <div className="animalslist__title">Коврики для животных</div>
        <div className="animalslist__content">
          {animals.map((animal) => (
            <CardAnimal key={animal.id} {...animal} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnimalsList;
