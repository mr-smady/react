import { Link } from "react-router-dom"
import NavLiLink from "./nav_li_link";

export default function Nav() {

    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to={'/'}>WebSiteName</Link>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                        <NavLiLink to={'/'}>Home</NavLiLink>
                        <NavLiLink to={'/users'}>Users</NavLiLink>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <NavLiLink to={'#'}><i className="glyphicon glyphicon-user"></i> Sign Up</NavLiLink>
                        <NavLiLink to={'#'}><i className="glyphicon glyphicon-log-in"></i> Login</NavLiLink>
                    </ul>
                </div>
            </div>
        </nav>
    )
}