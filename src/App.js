import { FixedNavbar } from './components/FixedNavbar';
import { ForumsList } from './components/ForumsList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { RegistrationForm } from './components/RegistrationForm';

function App() {
  
  return (
    <Router>
      <FixedNavbar />
      <div className='mt-5'>
        <Routes>
          <Route exact path='/' element={< ForumsList />}></Route>
          <Route exact path='/login' element={< LoginForm />}></Route>
          <Route exact path='/register' element={< RegistrationForm />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
