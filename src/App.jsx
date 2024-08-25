import React from 'react';
import Weather from './Weather';
// import CitySearch from "./Search";

function App() {
  return (
    <div className="App grid grid-cols-12">
      {/* <CitySearch /> */}
      <div className='col-span-12 sm:col-start-3 sm:col-span-8
                                  md:col-start-4 md:col-span-6
                                  lg:col-start-5 lg:col-span-4'>
        <Weather />
      </div>
    </div>
  );
}

export default App;
