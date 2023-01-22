import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function Users() {

    const [users, setUsers] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)


    useEffect(() => {
        loadUsers()
    }, [])

    function loadUsers() {
        fetch('http://localhost:8080/users')
            .then(res => res.json())
            .then(jsonUsers => {
                setUsers(jsonUsers)
            });
    }

    function deleteUser(id) {
        fetch(`http://localhost:8080/users/${id}`, {
            method: 'DELETE',
        }).then(res => {
            if (res.status === 204) {
                loadUsers()
                return {}
            }
            return res.json()
        }).then(json => { setErrorMessage(json.message) })
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
            <h3>Users</h3>
            <RenderError />
            <Link to={'/edit-create-user'} className="btn btn-primary pull-right">
                <i className="glyphicon glyphicon-plus"></i> Create</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 && users.map((user) => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><Link to={`/edit-create-user/${user.id}`}><i className="glyphicon glyphicon-edit"></i></Link></td>
                            <td><Link to={''} onClick={() => { deleteUser(user.id) }}><i className="glyphicon glyphicon-trash"></i></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    )
}