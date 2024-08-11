// import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { Home, Public } from './pages/public';

const App = () => {
  return (
    <>
      <div className="h-screen w-screen">
        <Public />
      </div>
    </>
  );
};

export default App;
