import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRoute from './routes';

const App : React.FC = () =>  {
  return (
    <BrowserRouter basename='/unsplash'>
      <MyRoute />
    </BrowserRouter>
  );
}

export default App;
