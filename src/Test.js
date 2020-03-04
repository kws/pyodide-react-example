import React, {useEffect, useState} from 'react';
import "./pyodide";
import pyodideloader from "./pyodide";

function Test() {
    const [pyodide, setPyodide] = useState();

    useEffect(() => {
        pyodideloader().then((p) => {
            setPyodide(p);
        }).catch((e) => {
            console.log("TEST NO");
        });
    });

    return (
        <>
        <p>HELLO</p>
        { pyodide && (
         <p>{pyodide.runPython("'Hello World from PYTHON inside Test'")}.</p>
        )}
        </>
    )
}

export default Test;
