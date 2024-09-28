import * as React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Container from './components/Container/Container';


const App: React.FunctionComponent = () => {
  return (
    <>
      <Header />
      <Container/>
      <Footer />
    </>
  );
};

export default App;
