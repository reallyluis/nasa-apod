import { useState, createContext, useContext, useEffect, ReactNode } from 'react';
import { dateformat, PictureOfTheDay } from '../helpers';

let delayTimeOut: ReturnType<typeof setTimeout>;

const useSearch = (initial: PictureOfTheDay[]) => {
  const now = new Date();
  const range = {
    start: dateformat(now, 'isoDate'),
    end: dateformat(now, 'isoDate'),
  };

  const [isLoading, setIsLoading] = useState(true);
  const [pictures, setPictures] = useState<PictureOfTheDay[]>(initial);
  const [daterange, setDateRange] = useState(range);
  const [delay, setDelay] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [showMore, setShowMore] = useState('');
  const [favsOnly, setFavsOnly] = useState(false);

  const fetchData = ({start, end}: {start:string, end:string}) => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&start_date=${start}&end_date=${end}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong.  Please try another date range.');
        }
      })
      .then((data) => {
        const processedData = Array.isArray(data)
          ? data.filter((d:PictureOfTheDay) => d.media_type === 'image')
          : [];

        setPictures(processedData);
        if (processedData.length === 0) {
          setErrorMsg('No data found.  Please try another date range.');
        } else {
          setErrorMsg('');
        }

        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    if (delayTimeOut) {
      clearTimeout(delayTimeOut);
    }

    delayTimeOut = setTimeout(() => {
      fetchData(daterange);
    }, delay*1000);

  }, [daterange, delay]);

  useEffect(() => {
    const body = document.querySelector('body');

    if (showMore === '') {
      body?.classList.remove('no-scroll');
    } else {
      body?.classList.add('no-scroll');
    }
  }, [showMore]);

  return {
    isLoading,
    pictures,
    setPictures,
    startDate: daterange.start,
    endDate: daterange.end,
    setDateRange,
    delay,
    setDelay,
    errorMsg,
    showMore,
    setShowMore,
    favsOnly,
    toggleFavsOnly: () => setFavsOnly(favsOnly => !favsOnly),
  };
};

const SearchContext = createContext<ReturnType<typeof useSearch> | null>(null);

export const useSearchContext = () => useContext(SearchContext)!;

export const SearchProvider = ({ children }: { children: ReactNode }) => (
  <SearchContext.Provider value={useSearch([])}>
    {children}
  </SearchContext.Provider>
);
