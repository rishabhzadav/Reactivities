import React, { useEffect, useState } from 'react';
import { Button, Container, Image, Menu } from 'semantic-ui-react';

interface Props {
    FormOpen: (id?: string) => void;
}

export default function NavBar({ FormOpen }: Props) {
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
                        <Button onClick={() => { FormOpen() }} positive>Create Activity</Button>
                    </Menu.Item>
                </Container>


            </Menu>
        </>
    );
}