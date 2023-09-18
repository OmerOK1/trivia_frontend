import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Button from "@mui/material/Button";
import { Margin } from "@mui/icons-material";

interface CustomLinkProps {
    to: string;
    children: any;
}

function CustomLink(props: CustomLinkProps): JSX.Element {
    let resolved = useResolvedPath(props.to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (

        <Link className={match ? "CustomLink active" : "CustomLink"} to={props.to}>
            <Button variant="contained" size="large">{props.children}</Button>
        </Link>
    );
}

export default CustomLink;
