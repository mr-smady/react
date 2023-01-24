import { Link } from 'react-router-dom';
import { useBloc } from '../state.ts';
import UsersCubit from '../users_bloc/users_cubit.ts';
import LiLink from "./li_link";

export default function Nav() {

    const [users] = useBloc(UsersCubit);

    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to={'/'}>Web App</Link>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                        <LiLink to={'/'}>Home</LiLink>
                        <LiLink to={'/users'}>Users ({users.length})</LiLink>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <LiLink to={'/'}><i className="glyphicon glyphicon-user"></i> Sign Up</LiLink>
                        <LiLink to={'/'}><i className="glyphicon glyphicon-log-in"></i> Login</LiLink>
                    </ul>
                </div>
            </div>
        </nav>
    )
}