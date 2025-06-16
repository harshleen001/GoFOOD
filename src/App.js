import './App.css';
import SignUp from './screens/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './screens/Home';
import Login from './screens/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { CardProvider } from './components/ContextReducer.js';
import MyOrder from './screens/MyOrder.js';
 // ✅ Import this

function App() {
  //const [cartView, setCartView] = useState(false); // ✅ define cart view state here

  return (
    <CardProvider>
      <Router>
       
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<SignUp />} />
            <Route exact path="/myOrder" element= {<MyOrder/>} />
          </Routes>
        </div>
      </Router>
    </CardProvider>
  );
}

export default App;
