import React from 'react';
import {  BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './View/Home'
import CameraApp from './View/CameraApp';
import PDFView from './View/PdfView';


function App() {
  return(
    <div className='App'>
      <h1>My POC Apps</h1>
      <div>
        <Router>
          <Routes>
            <Route path="/" Component={HomePage}></Route>
            <Route path="/CanvasPOC" Component={HomePage}></Route>
            <Route path="/Camera" Component={CameraApp}></Route>
            <Route path="/pdfview" Component={PDFView}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App;