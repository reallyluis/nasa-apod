import { useSearchContext } from "../hooks/useSearch";
import './Results.css';

function Results() {
  const { pictures, error } = useSearchContext();

  return (
    <section className="result">
      {error && error.msg &&
        <div>{error.msg}</div>
      }
      {error === null && pictures.length === 0 &&
        <ul>
          <li>Update search dates to get results.</li>
        </ul>
      }
      {error === null && pictures.length > 0 &&
        <ul>
          {pictures.map(item => (
            <li key={item.date}>
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
      }
    </section>
  );
}

export default Results;
