import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pyodide, setPyodide] = useState();

  const registerPyodide = async pyodide => {
    console.log("Registering pyodide in React", Object.keys(pyodide));
    setPyodide(pyodide);
  };

  useEffect(() => {
    window.registerPyodide = registerPyodide;
    if (window.pyodide) {
      setPyodide(pyodide);
    }
  }, [pyodide]);


  return (
    <div className="App">
      <header className="App-header">
        { pyodide && (
            <>
            <h1>PYODIDE AVAILABLE</h1>
            <p>{pyodide.runPython("'Hello World from PYTHON'")}.</p>
            </>
        )}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
