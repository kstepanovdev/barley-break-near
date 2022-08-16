import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <button onClick={() => {  }}>Start a new game</button> */}
        <Game />
      </header>
    </div>
  );
}

export default App;
