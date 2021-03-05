import { useState, createContext, useContext, useEffect, ReactNode } from 'react';

const dateformat = require('dateformat');

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

export interface ErrorResponse {
  code: number;
  msg: string;
  service_version: string;
};

const useSearch = (initial: PictureOfTheDay[]) => {
  const now = new Date();
  const range = {
    start: dateformat(now, 'isoDate'),
    end: dateformat(now, 'isoDate'),
  };

  const [pictures, setPictures] = useState<PictureOfTheDay[]>(initial);
  const [daterange, setDateRange] = useState(range);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&start_date=${daterange.start}&end_date=${daterange.end}`)
      .then((resp) => resp.json())
      .then((data) => {
        setPictures(data.filter((d:PictureOfTheDay) => d.media_type === 'image'));
      })
      .catch((err) => setError(err));
  }, [daterange]);

  return {
    pictures,
    setPictures,
    startDate: daterange.start,
    endDate: daterange.end,
    setDateRange,
    error,
  }
};
type SearchType = ReturnType<typeof useSearch>;

const SearchContext = createContext<SearchType | null>(null);

export const useSearchContext = () => useContext(SearchContext)!;

export const SearchProvider = ({ children }: { children: ReactNode }) => (
  <SearchContext.Provider value={useSearch([])}>
    {children}
  </SearchContext.Provider>
)