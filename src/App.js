import React from 'react';
import { ProductProvider } from './Context';
import Home from './Home';

function App() {
  console.log("App Component Loaded");

  return (
    <ProductProvider>
      <div className="App">
        <Home />

      </div>
    </ProductProvider>
  );
}

export default App;
