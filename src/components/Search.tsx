import { useSearchContext } from "../hooks/useSearch";
import './Search.css';

const dateformat = require('dateformat');

function Search() {
  const { startDate, endDate, setDateRange, delay, setDelay } = useSearchContext();
  const max = dateformat(new Date(), 'isoDate');

  return (
    <section className="search">
      <form id="search-form"></form>
      <fieldset>
        <legend>Search</legend>
        <div className="search-fields">
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={startDate}
            onChange={(e) => setDateRange({start: e.target.value, end: endDate})}
            max={max}
          />
          <span>to</span>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={endDate}
            onChange={(e) => setDateRange({start: startDate, end: e.target.value})}
            max={max}
          />
          <div>
            <label htmlFor="delay" className="delay-label" title="Delay in seconds 0-100.">Delay: </label>
            <input
              type="number"
              name="delay"
              id="delay"
              value={delay}
              min="0"
              max="100"
              onChange={(e) => setDelay(parseInt(e.target.value || '0', 10))}
            />
          </div>
        </div>
      </fieldset>
    </section>
  );
}

export default Search;
