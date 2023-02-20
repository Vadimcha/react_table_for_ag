import {Route, Routes, BrowserRouter  } from 'react-router-dom'

import { RegistrationPage } from './pages/registration_page'; 
import { MainPage } from './pages/main_page';
import { useStudents } from './hooks/students';

function App() {
  const {students, error, loading} = useStudents()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <MainPage /> }/>
        <Route path="/registration" element={ <RegistrationPage /> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
