import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import Compare from './containers/Compare';
import Layout from './layout';

const Home = lazy(() => import('./containers/Home'));

const App = () => (
  <Suspense fallback={<Loader />}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="compare" element={<Compare />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Suspense>
);

export default App;
