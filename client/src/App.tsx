import { useGetTodosQuery } from './features/api/apiSlice';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';

import './App.css';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

function App() {
  const { data: todos, isLoading, isError } = useGetTodosQuery();
  const sortOption = useSelector(
    (state: RootState) => state.sort.option
  )

  const [ showCats, setShowCats ] = useState(false);

  // TODO: Add loading and Error components
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error connecting to server. Check port 8080.</div>

  const todoList = todos ?? [];

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
        <TodoList />
      </div>
    </main>
  )
}

export default App
