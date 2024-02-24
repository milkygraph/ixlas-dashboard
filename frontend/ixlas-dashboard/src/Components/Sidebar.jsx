import './Sidebar.css';
import React from 'react';
import { Typography, Toolbar, Divider, List } from '@mui/material';
import Drawer from './Drawer';
import { mainListItems } from './ListItems';


export default function Sidebar() {
    return (
        <Drawer variant="permanent" open='true'
            sx={{
                width: '240px'
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
            <Typography 
                    component="h1" 
                    variant="h5" 
                    color="inherit" 
                    noWrap 
                    sx={{ 
                        flexGrow: 1,
                        textAlign: 'center'
                    }}>
                Ixlas
            </Typography>
            </Toolbar>
            <Divider />
            <List component="nav" className="Sidebar"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                {mainListItems}
            </List>
        </Drawer>
    );
}
