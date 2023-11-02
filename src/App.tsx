import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.scss';

import HomePage from './pages/HomePage';
import ShipsListPage from './pages/ShipsListPage';
import StageOuter from './components/StageOuter/StageOuter';
import Header from './components/Header';
import NotFound from './pages/NotFound';



function App() {
  return (<>
    <StageOuter />

    <Router>
      <Header />
      <Routes>

        {/* <ErrorBoundary> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shipslist" element={<ShipsListPage />} />
        <Route path="*" element={<NotFound />} />
        {/* </ErrorBoundary> */}

      </Routes>
    </Router>

  </>


  );
}

export default App;
