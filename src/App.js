import { FixedNavbar } from './components/FixedNavbar';
import { ForumsList } from './components/ForumsList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { RegistrationForm } from './components/RegistrationForm';
import { AddForum } from './components/AddForum';
import { PostDetails } from './components/PostDetails';
import UserProfile from './components/profile/UserProfile';

function App() {
  return (
    <Router>
      <FixedNavbar />
      <div className='mt-5'>
        <Routes>
          <Route exact path='/' element={< ForumsList />}></Route>
          <Route exact path='/profile' element={< UserProfile />}></Route>
          <Route exact path='/login' element={< LoginForm />}></Route>
          <Route exact path='/register' element={< RegistrationForm />}></Route>
          <Route exact path='/add-forum' element={< AddForum />}></Route>
          <Route exact path='/forums/:postId' element={< PostDetails />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
