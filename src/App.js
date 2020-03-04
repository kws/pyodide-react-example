import React, { useEffect, useState } from 'react';
import './App.css';


window.registerPyodide = (pyodide) => {

}


function App() {
  const [pyodide, setPyodide] = useState();
  const [pyodideReady, setPyodideReady] = useState(false);

  const registerPyodide = (pyodide) => {
    console.log("Registering pyodide in React", Object.keys(pyodide));
    setPyodide(pyodide);

    // WARNING - THIS IS HORRIBLE HACK
    // would be nice for pyodide to provide proper callback for when ready
    const postRun = pyodide.postRun;
    pyodide.postRun = async function() {
      await postRun();
      setPyodideReady(true);
    }
  };

  useEffect(() => {
    window.registerPyodide = registerPyodide;
  });

  useEffect(() => {
    if (pyodideReady) {
      console.log("Running a bit of python");
      const result = pyodide.runPythonAsync("print('hello world from python')")
      console.log('PYTHON OUTPUT', result);
    }
  }, [pyodide, pyodideReady]);



  return (
    <div className="App">
      <header className="App-header">
        { pyodide && (
            <h1>PYODIDE AVAILABLE</h1>
        )}
        { pyodideReady && (
            <h2>PYODIDE Ready</h2>
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
