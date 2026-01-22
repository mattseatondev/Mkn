import { useGetTodosQuery } from './features/api/apiSlice';

import './App.css';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

function App() {

  // Base Data pulled from initial fetch request in apiSlice
  const { isLoading, isError } = useGetTodosQuery();

  // State variable to toggle Categories Sidebar menu
  const [ showCats, setShowCats ] = useState(false);

  // Displayed if data is Loading or if an error occurs
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error connecting to server. Check port 8080.</div>

  return (
    <main className='app-main fc js ac'>
      {/* TODO: Add a header here */}
      <header>
        <Header toggleCats={() => setShowCats(!showCats)} />
      </header>
      <div className='app-content fr js ac'>
        {
          showCats && <Sidebar />
        }
        <TodoList showCats={showCats} />
      </div>
    </main>
  )
}

export default App
