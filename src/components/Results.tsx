import { useSearchContext } from "../hooks/useSearch";
import { Loading, ErrorMessage } from "../helpers";
import './Results.css';

function Results() {
  const { isLoading, pictures, errorMsg, setShowMore } = useSearchContext();

  if (isLoading || errorMsg) {
    return (
      <section className="result">
        {isLoading && <Loading />}
        {errorMsg && <ErrorMessage errorMsg={errorMsg} />}
      </section>
    );
  }

  return (
    <section className="result">
      <ul>
        {pictures.length === 0 &&
          <li tabIndex={1}>Update search dates to get results.</li>
        }
        {pictures.map((item, i) => (
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
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Results;
