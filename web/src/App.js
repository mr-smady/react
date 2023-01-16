import React, { createContext, useState } from 'react';
import './App.css';
import Content from './components/content';
import Nav from './components/nav';

export const PageContext = createContext()


function App() {

  const [page, setPage] = useState('home')

  return (
    <PageContext.Provider value={[page, setPage]}>
      <Nav />
      <div className='container'>
        <Content />
      </div>
    </PageContext.Provider>
  )
}

export default App;
