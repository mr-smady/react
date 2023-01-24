import { Link, useLocation } from 'react-router-dom';

function LiLink(props) {

    const location = useLocation();
    const isActive = location.pathname === props.to;
    const className = isActive ? 'active' : '';

    return (
        <li className={className}>
            <Link  {...props}>{props.children}</Link>
        </li >
    );
}

export default LiLink;