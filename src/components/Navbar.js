import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart';
import Modal from '../Modal';
import { useCart } from './ContextReducer';
export default function Navbar() {
    const [cartView,setCartView] = useState(false);
    let data = useCart();
    const navigate=useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate("/login"); // remove the auth token from local storage
       
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFOOD</Link>
                    <ul className="navbar-nav d-flex flex-row">
                        <li className="nav-item px-2">
                            <Link className="nav-link active  fs-5 " aria-current="page" to="/">Home</Link>
                        </li>
                        {(localStorage.getItem("authToken")) ?
                            <ul className="navbar-nav d-flex flex-row">
                                <li className="nav-item px-2">
                                    <Link className="nav-link" aria-current="page" to="/myOrder">My Orders</Link>
                                </li>
                            </ul>
                            : ""}

                           {(!localStorage.getItem("authToken")) ?
                            
                        <div className="d-flex">
                           
                                <Link className="nav-link mx-1" to="/login">Login</Link>
                                <Link className="nav-link mx-1" to="/createuser">SignUp</Link>
                            
                        </div>
                           : 
                           <div className="d-flex">

                            <div className="nav-link mx-1" onClick={() =>{ setCartView(true)}}>
                                My Cart{" "}
                                <Badge pill bg="danger"> {data.length} </Badge>
 
                                </div>
                                {cartView? <Modal onClose={()=> setCartView(false)} ><Cart/></Modal>: null}
  
                          
                           <div className="nav-link mx-1" onClick={handleLogout}>  
                               {" "}Logout
                            </div>
                            </div>
                           }


                    </ul>
                </div>

            </nav>



        </div>
    )
}
