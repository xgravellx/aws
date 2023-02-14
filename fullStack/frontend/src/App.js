import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Cube from './components/Cube';
import React from 'react';
import Cube2 from './components/Cube2';
import Cube3 from './components/Cube3';
import Cube4 from './components/Cube4';


function App() {

  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Cube4 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
