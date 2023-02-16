import { FixedNavbar } from './components/FixedNavbar';
import { ForumsList } from './components/ForumsList';

function App() {
  return (
    <>
      <FixedNavbar />
      <div className='mt-5'>
        <ForumsList />
      </div>
    </>
  );
}

export default App;
