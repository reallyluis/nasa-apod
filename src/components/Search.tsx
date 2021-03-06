import { useSearchContext } from "../hooks/useSearch";
import { dateformat } from '../helpers';
import './Search.css';

function Search() {
  const { startDate, endDate, setDateRange, delay, setDelay, favsOnly, toggleFavsOnly } = useSearchContext();
  const max = dateformat(new Date(), 'isoDate');

  return (
    <section className="search">
      <form id="search-form"></form>
      <fieldset>
        <legend>Search</legend>
        <div className="search-fields">
          <div className="search-fields-row">
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={startDate}
              onChange={(e) => setDateRange({start: e.target.value, end: endDate})}
              max={max}
              disabled={favsOnly}
            />
            <span>to</span>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={endDate}
              onChange={(e) => setDateRange({start: startDate, end: e.target.value})}
              max={max}
              disabled={favsOnly}
            />
          </div>
          <div className="search-fields-row">
            <label htmlFor="delay" className="delay-label" title="Delay in seconds 0-100.">Delay: </label>
            <input
              type="number"
              name="delay"
              id="delay"
              value={delay}
              min="0"
              max="100"
              onChange={(e) => setDelay(parseInt(e.target.value || '0', 10))}
              disabled={favsOnly}
            />
            <label htmlFor="favorites">Favorites Only:</label>
            <input
              type="checkbox"
              name="showFavorites"
              onChange={() => toggleFavsOnly()}
              checked={favsOnly}
            />
          </div>
        </div>
      </fieldset>
    </section>
  );
}

export default Search;
