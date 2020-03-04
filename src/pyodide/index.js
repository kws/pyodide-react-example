import { EventEmitter } from 'events';

const log = message => {
    if (console.log) {
        console.log(message);
    }
}

class PyodideLoader extends EventEmitter {
    constructor() {
       if (window.pyodide_loader) {
           throw Error("Can only have one Pyodide instance");
       }
       super();
       this.ready = false;
       window.pyodide_loader = this;
       log('Including pyodide script');
       const script = document.createElement('script');
       script.src = 'https://pyodide.cdn.iodide.io/pyodide.js';
       script.async = true;
       script.addEventListener('load', async () => {
           log("Pyodide loaded");
           await window.languagePluginLoader;
           log("Pyodide started");
           this.ready = true;
           this.emit('ready', window.pyodide);
       });
       script.addEventListener('error', e => {
           log("Pyodide failed to load", e);
           this.failed = e;
           this.emit('failed', e);
       });
       document.body.appendChild(script);
    }
}

const _pyodide = new PyodideLoader();

export default () => {
    return new Promise((resolve, reject) => {
        if (_pyodide.failed) {
            reject("Pyodide failed to load");
        }
        if (_pyodide.ready) {
            resolve(window.pyodide);
        } else {
            _pyodide.once('ready', () => {
                    resolve(window.pyodide);
            });
            _pyodide.once('failed', () => {
                reject("Pyodide failed to load");
            });
        }
    });
}






