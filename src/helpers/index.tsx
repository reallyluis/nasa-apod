// Helper Methods
export const dateformat = require('dateformat');

export const getFavorites = () => JSON.parse(localStorage.getItem('favorites') || '[]');
export const setFavorites = (
  favorites: PictureOfTheDay[],
) => localStorage.setItem('favorites', JSON.stringify(favorites));
export const isFavorite = (
  favorites: PictureOfTheDay[],
  item: PictureOfTheDay
) => {
  for (let i=0; i<favorites.length; i++) {
    if (favorites[i].date === item.date) {
      return true;
    }
  }

  return false;
}

// Helper Types
export interface PictureOfTheDay {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

// Helper Components
export const Loading = () => (
  <div className="loading">
    <div className="spinner"></div>
  </div>
);

export const ErrorMessage = (
  {errorMsg}: {errorMsg: string}
) => (
  <div>{errorMsg}</div>
);
