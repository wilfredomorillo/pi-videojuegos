import './App.css';
import Home from './componest/home/home'
import React from 'react';
import Create from './componest/create/create';
import {Route, Routes} from 'react-router-dom'

import Landingpage from './componest/landinpage/landingpage';
function App() {
  return (
    <div className='App'>
      <Routes>

      <Route exact path={'/'} element= {<Landingpage/>}/>
      <Route exact path={'/home'}element={<Home/>}/>
      <Route exact path={'/create'}element={<Create/>}/>

    </Routes>
    
    </div>
  );
}

export default App;
