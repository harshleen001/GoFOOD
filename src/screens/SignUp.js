import React,{useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'

export default function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" , geolocation:""})
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({ name:credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }));
        const response = await fetch('http://localhost:5000/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email  : credentials.email,
                password: credentials.password,
                location: credentials.geolocation
            })

        });

        const json = await response.json();
        console.log(json);
        if (!json.success) {
            
         
            alert("Invalid Credentials")
        }
        else {
            // On success, redirect to the login page
            alert("Signup successful! Please login.");
            navigate('/login');  // Redirects to /login
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
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange} />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a User? Login</Link>
                </form>
            </div>

        </>
    )
}
