
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditOrCreateUser() {


    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8080/users/${id}`)
            .then(resp => resp.json())
            .then(jsonUsers => {
                setUser(jsonUsers);
            });
    }, [id])

    function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage(null)
        const method = id ? 'PUT' : 'POST'
        console.log(method);
        fetch('http://localhost:8080/users', {
            method: method,
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            const state = id ? 200 : 201
            if (res.status === state) { 
                navigate(-1)
            }
            return res.json()
        }).then(json => { setErrorMessage(json.message) })
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser({ ...user, [name]: value })
    }

    function RenderError() {
        if (errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Error!</strong> {errorMessage}.
                </div>
            )
        }
        return (<></>)
    }

    return (
        <React.Fragment>
            <h3>Create User</h3>
            <hr />
            <RenderError />
            <dir className="row">
                <dir className="col-md-4"></dir>
                <dir className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" className="form-control"
                                name='username' value={user.username || ''}
                                onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" className="form-control"
                                name='name' value={user.name || ''}
                                onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" className="form-control"
                                name='email' value={user.email || ''}
                                onChange={handleChange} required />
                        </div>
                        <button type="submit" className={`btn btn-${id ? 'success' : 'primary'}`}>{id ? 'Edit' : 'Create'}</button>
                        &nbsp;<button onClick={(event) => {
                            event.preventDefault(); navigate(-1)
                        }} className="btn btn-default">Cancel</button>
                    </form>

                </dir>
            </dir>

        </React.Fragment>
    )
}