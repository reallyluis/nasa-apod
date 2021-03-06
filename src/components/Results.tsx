import { MouseEvent, useState, useEffect } from 'react';
import { useSearchContext } from "../hooks/useSearch";
import { PictureOfTheDay, Loading, ErrorMessage, getFavorites, setFavorites, isFavorite } from "../helpers";
import './Results.css';

function Results() {
  const { isLoading, pictures, errorMsg, setShowMore, favsOnly } = useSearchContext();
  const [favorites, favoritesSet] = useState(getFavorites());

  useEffect(() => {
    setFavorites(favorites);
  }, [favorites]);

  if (isLoading || errorMsg) {
    return (
      <section className="result">
        {isLoading && <Loading />}
        {errorMsg && <ErrorMessage errorMsg={errorMsg} />}
      </section>
    );
  }

  const handleFavorite = (e: MouseEvent, item: PictureOfTheDay) => {
    e.stopPropagation();

    if (!isFavorite(favorites, item)) {
      favoritesSet([
        ...favorites,
        item,
      ]);
    } else {
      favoritesSet([
        ...favorites.filter((fav: PictureOfTheDay) => fav.date !== item.date),
      ]);
    }
  };

  const data: PictureOfTheDay[] = favsOnly ? [...favorites] : [...pictures];
  return (
    <section className="result">
      <ul>
        {data.length === 0 && !favsOnly &&
          <li tabIndex={1}>Update search dates to get results.</li>
        }
        {data.length === 0 && favsOnly &&
          <li tabIndex={1}>You currently do not have any favorites.</li>
        }
        {data.map((item, i) => (
          <li key={item.date} tabIndex={i+1} onClick={() => setShowMore(item.date)}>
            <img alt={item.title} src={item.url} width="100" />
            <dl>
              <dt>Date:</dt>
              <dd>{item.date}</dd>
              <dt>Title:</dt>
              <dd>{item.title}</dd>
              <dt>Copyright:</dt>
              <dd>{item.copyright || 'N/A'}</dd>
            </dl>
            <svg
              className={`favorite${isFavorite(favorites, item) ? ' selected' : ''}`}
              viewBox="0 0 512 512"
              onClick={(e) => handleFavorite(e, item)}
            >
              <path d="M340.8,83C307,83,276,98.8,256,124.8c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6  L245.1,418l10.9,11l10.9-11l148.3-149.8c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"/>
            </svg>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Results;
