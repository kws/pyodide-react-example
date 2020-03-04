import React, { useEffect, useState } from 'react';
import './App.css';
import './Test';
import pyodideloader from "./pyodide";
import Test from "./Test";


function App() {
  const [pyodide, setPyodide] = useState();

  useEffect(() => {
    pyodideloader().then((p) => {
      setPyodide(p);
    }).catch((e) => {
      console.log("OH NO");
    });
  });

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
        <Test/>
        <Test/>
        <Test/>
      </header>
    </div>
  );
}

export default App;
