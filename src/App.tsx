import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import LoginForm from './LoginForm'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [movies, setMovies] = useState<[]>([]); //Lisää tila elokuville

  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    console.log('Toiminto (X, Y): (' + event.pageX + ',' + event.pageY + ')');
    setCount((count) => count + 1);
  }, [setCount]);

  useEffect (() => {
   var _mtm = window._mtm = window._mtm || [];
  _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
  const d=document, g=d.createElement('script'), s: HTMLScriptElement=d.getElementsByTagName('script')[0];
    g.async=true; g.src='https://pilvipalvelut-matomo.2.rahtiapp.fi/js/container_OMd7ObXL_dev_6b3069b5bc093519bcd7357d.js';
    if (s && s.parentNode) {
    s.parentNode.insertBefore(g,s);
  }
}, []);

  // DummyAPI:n tietojen haku

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://dummyapi.online/api/movies');
        if (response.status === 200) {
          setMovies(response.data); 
        }
      } catch (error) {
        console.error('Virhe elokuvien haussa:', error);
      }
    };

    fetchMovies();
}, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={(handleClick)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          <LoginForm />
        </p>
      </div>
      <h2>Elokuvat</h2>
      <ul>
        {movies.map((movie: any) => 
          <li key = {movie.id}>
            <h3>Nimi: {movie.movie}</h3>
            <p>Arvostelu: {movie.rating}</p>
          </li>)}
      </ul>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App;
