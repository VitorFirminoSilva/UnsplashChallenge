import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes';


const App : React.FC = () =>  {
  return (
    <BrowserRouter basename='/unsplash'>
      <RoutesApp />
    </BrowserRouter>
  );
}

export default App;
