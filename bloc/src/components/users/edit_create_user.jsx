import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBloc } from '../../state.ts';
import UsersCubit from '../../users_bloc/users_cubit.ts';

export default function EditOrCreateUser() {

    const [users, { createUser, editUser }] = useBloc(UsersCubit);
    const navigate = useNavigate()
    const [message, setMessage] = useState(undefined)
    const [user, setUser] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const user = users.find(u => u.id === Number(id))
        if (user) {
            setUser(user)
        }
    }, [users, id])

    function RenderErrorMessage() {
        return message ? (
            <div className="alert alert-danger">
                <strong>Error!</strong> {message}.
            </div>
        ) : (<></>)
    }

    function handleChange(event) {
        setMessage(undefined)
        const name = event.target.name;
        const value = event.target.value;
        setUser({ ...user, [name]: value })
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (id) {
            editUser(user, () => {
                navigate(-1)
            }, (error) => {
                setMessage(error)
            })
        } else {
            createUser(user, () => {
                navigate(-1)
            }, (error) => {
                setMessage(error)
            })
        }
    }

    return (
        <React.Fragment>
            <h3>{id ? 'Edit' : 'Create'} User</h3>
            <hr />
            <RenderErrorMessage />
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input name='username' type="text" className="form-control"
                                onChange={handleChange}
                                value={user.username || ''} required />
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input name='name' type="text" className="form-control"
                                onChange={handleChange}
                                value={user.name || ''} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="email" className="form-control"
                                onChange={handleChange}
                                value={user.email || ''}
                            />
                        </div>
                        <button type="submit"
                            className={`btn btn-${id ? 'success' : 'primary'}`}>{id ? 'Edit' : 'Create'}</button>

                        &nbsp;&nbsp;&nbsp;
                        <button onClick={(event) => {
                            event.preventDefault();
                            navigate(-1)
                        }} className="btn btn-default">Cancel</button>
                    </form>
                </div>
            </div>


        </React.Fragment >
    )

}