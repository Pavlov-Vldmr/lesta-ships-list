import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

import HomePage from './pages/HomePage';
import ShipsListPage from './pages/ShipsListPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* <ErrorBoundary> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shipslist" element={<ShipsListPage />} />
        {/* <Route path="contacts" element={<ContactsPage />} /> */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        {/* </ErrorBoundary> */}
      </Routes>
    </Router>

  );
}

export default App;
