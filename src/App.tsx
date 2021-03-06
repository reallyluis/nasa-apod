import Modal from './components/Modal';
import Header from './components/Header';
import Search from './components/Search';
import Results from './components/Results';
import { SearchProvider } from "./hooks/useSearch";

import './App.css';

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <Modal />
        <Header />
        <Search />
        <Results />
      </SearchProvider>
    </div>
  );
}

export default App;
