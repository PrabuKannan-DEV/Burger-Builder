import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Layout>
       {/* <BurgerBuilder/>
       <Checkout/> */}
       
       <Routes>
         <Route path={'/'} element={<BurgerBuilder/>}/>
         <Route path={'checkout/*'} element={<Checkout/>}/>
         <Route path={'orders/*'} element={<Orders/>}/>
       </Routes>
     </Layout>
    </div>
    </BrowserRouter>
  );
}

export default App;
