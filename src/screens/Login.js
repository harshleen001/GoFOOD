import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({ email: credentials.email, password: credentials.password }));
        
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                email: credentials.email,
                password: credentials.password

            })

        });

        const json = await response.json();
        console.log(json);
        if (!json.success) {


            alert("Invalid Credentials")
        }
        if (json.success) {
            localStorage.setItem('authToken', json.authtoken); // save the auth token in local storage
            localStorage.setItem('userEmail', credentials.email); // save the user email in local storage
            console.log(localStorage.getItem('authToken'));
             navigate("/");
        }


    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit} >

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
                    </div>


                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/createuser" className="m-3 btn btn-danger">Doesn't have an account?SignUp</Link>
                </form>
            </div>

        </>
    )
}
