import './App.css';
import Navbar from './components/Navbar'
import Weather from './components/Weather'

function App() {
  return (
    <div className="App">
        <Navbar />
        <div className="page-content">
           <Weather />
        </div>
    </div>
  );
}

export default App;
