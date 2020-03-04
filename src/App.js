import React, { useEffect, useState } from 'react';
import './App.css';
import './MyDropzone';
import pyodideloader from "./pyodide";
import MyDropzone from "./MyDropzone";


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
              <MyDropzone pyodide={pyodide}/>
            </>
        )}
        { !pyodide && (
            <div>Loading Python...</div>
        )}
      </header>
    </div>
  );
}

export default App;
