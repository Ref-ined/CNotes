import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cnfpassword: "" });
    let navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("Account Created Successfully", "success")



        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }


    return (
        <div className='container mt-2'>
            <h2>Create an Account to use CNotes</h2>

            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cnfpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cnfpassword" name="cnfpassword" minLength={5} required onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup