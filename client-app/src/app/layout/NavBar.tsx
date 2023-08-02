import React, { useEffect, useState } from 'react';
import { Button, Container, Image, Menu } from 'semantic-ui-react';
import activityStore from '../stores/activityStore';
import { store, useStore } from '../stores/store';
import { NavLink } from 'react-router-dom';

// interface Props {
//     FormOpen: (id?: string) => void;
// }

export default function NavBar() {

    const { activityStore } = useStore();
    return (
        <>
            <Menu inverted fixed='top' >
                <Container>
                    <Menu.Item as={NavLink} to="/" header>
                        <img src='assets/logo.png' alt='error' style={{ marginRight: 10, marginTop: 10 }} />
                        Reactivities
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/activities">
                        Actitivities
                    </Menu.Item>
                    <Menu.Item>
                        <Button as={NavLink} to="/createActivity" positive>Create Activity</Button>
                    </Menu.Item>
                </Container>


            </Menu>
        </>
    );
}