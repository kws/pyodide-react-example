import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import { Parser } from 'html-to-react'

const htmlToReactParser = new Parser();

export default function MyDropzone({pyodide}) {
    const [readFile, setReadFile] = useState(undefined);
    const [table, setTable] = useState(undefined);

    useEffect(() => {
        pyodide.loadPackage(['pandas','xlrd']).then(() => {
            const pythonScript = `
import pandas as pd
import io

def read_file(file, buffer):
    data = io.BytesIO(buffer.tobytes())
    if "xls" in file.name:
        df = pd.read_excel(data)
    else: 
        df = pd.read_csv(data)
        
    return df.to_html()
        `;
            pyodide.runPython(pythonScript);
            const readFile = pyodide.pyimport('read_file');
            setReadFile({readFile});
        });
    }, [pyodide]);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            console.log(file);
            const reader = new FileReader();

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                // Do whatever you want with the file contents
                const buffer = reader.result;
                const htmlTable = readFile.readFile(file, buffer);
                const reactElement = htmlToReactParser.parse(htmlTable);
                setTable(reactElement);
            };
            reader.readAsArrayBuffer(file);
        })

    }, [readFile])
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
        <>
            {!readFile && (
                <div>Loading Pandas....</div>
            )}
            {readFile && (
            <div className="App-dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            )}
            { table && (table)}
        </>
    )
}