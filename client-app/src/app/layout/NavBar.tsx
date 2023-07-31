import React, { useEffect, useState } from 'react';
import { Button, Container, Image, Menu } from 'semantic-ui-react';
import activityStore from '../stores/activityStore';
import { store, useStore } from '../stores/store';

// interface Props {
//     FormOpen: (id?: string) => void;
// }

export default function NavBar() {

    const { activityStore } = useStore();
    return (
        <>
            <Menu inverted fixed='top' >
                <Container>
                    <Menu.Item header>
                        <img src='assets/logo.png' alt='error' style={{ marginRight: 10, marginTop: 10 }} />
                        Reactivities
                    </Menu.Item>
                    <Menu.Item>
                        Actitivities
                    </Menu.Item>
                    <Menu.Item>
                        <Button onClick={() => activityStore.openForm()} positive>Create Activity</Button>
                    </Menu.Item>
                </Container>


            </Menu>
        </>
    );
}