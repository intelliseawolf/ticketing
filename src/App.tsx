import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PublicRoutes from './routes/publicRoutes';
import Layout from './layout/main/Layout';
import './App.css';
import { AppContextProvider } from './contexts/AppContext';

const App = () => {
  return (

    <Router>
      <AppContextProvider>
        <Layout>
          <PublicRoutes />
        </Layout>
      </AppContextProvider>
    </Router>
  );
};

export default App;
