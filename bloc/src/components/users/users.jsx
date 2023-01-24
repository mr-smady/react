import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useBloc } from '../../state.ts';
import UsersCubit from '../../users_bloc/users_cubit.ts';

export default function Users() {

    const [users, { deleteUser }] = useBloc(UsersCubit);

    const [message, setMessage] = useState(null);

    function RenderErrorMessage() {
        return message ? (
            <div className="alert alert-danger">
                <strong>Error!</strong> {message}.
            </div>
        ) : (<></>)
    }

    return (
        <React.Fragment>
            <h3>Users</h3>
            <RenderErrorMessage />
            <Link to={'/edit-create-user'} className="btn btn-primary pull-right">
                <i className="glyphicon glyphicon-plus"></i> Create
            </Link>
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
                    {users && users.length > 0 && users.map(u => (
                        <tr key={u.id}>
                            <td>{u.username}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>
                                <Link to={`/edit-create-user/${u.id}`}><i className="glyphicon glyphicon-edit"></i></Link>
                                &nbsp;
                                <Link to={`/user-delete/${u.id}`} onClick={(e) => {
                                    e.preventDefault()
                                    deleteUser(u.id,
                                        () => { },
                                        (error) => {
                                            setMessage(error)
                                        })
                                }}><i className="glyphicon glyphicon-trash"></i></Link>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment >
    )
}