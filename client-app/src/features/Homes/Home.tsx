import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";

export default function Home() {
    return (
        <>
            <h1> home page</h1>
            <Button as={NavLink} to='/activities' content='Actvities' color="blue" />

        </>
    )
}