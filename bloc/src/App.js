import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Layout from './components/layout';
import EditOrCreateUser from './components/users/edit_create_user';
import Users from './components/users/users';
function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='users' element={<Users />}></Route>
          <Route path='edit-create-user' element={<EditOrCreateUser />}></Route>
          <Route path='edit-create-user/:id' element={<EditOrCreateUser />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
