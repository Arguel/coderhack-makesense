import { BrowserRouter,Switch,Route,} from "react-router-dom";

import './App.css';
import Header from './component/header/header'
import Main from './component/main/main'
import Footer from './component/footer/footer'
import Error404 from "./component/error404/error404";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>

        <Switch>

          <Route exact path='/make_sense'> 
            <Main/> 
          </Route> 
          
          <Error404/>         

        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
