import { useSearchContext } from "../hooks/useSearch";
import './Search.css';

const dateformat = require('dateformat');

function Search() {
  const { startDate, endDate, setDateRange } = useSearchContext();
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
        </div>
      </fieldset>
    </section>
  );
}

export default Search;
