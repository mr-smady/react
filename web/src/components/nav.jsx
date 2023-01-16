import { useContext } from "react";
import { PageContext } from "../App";

export default function Nav() {
    const hrefHash = '#'

    const [page, setPage] = useContext(PageContext)



    function active(activePage) {
        return page === activePage ? 'active' : '';
    }

    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href={hrefHash}>WebSiteName</a>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                        <li className={active('home')}><a href={hrefHash} onClick={() => setPage('home')}>Home</a></li>
                        <li className={active('users')}><a href={hrefHash} onClick={() => setPage('users')}>Users</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href={hrefHash}><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                        <li><a href={hrefHash}><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}