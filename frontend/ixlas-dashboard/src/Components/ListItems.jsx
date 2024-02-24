import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MuiButton from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styled from '@mui/system/styled';


const Button = styled(MuiButton, { shouldForwardProp: (prop) => prop !== 'open' })(() => ({
    width: '80%',
    borderRadius: 10,
    shadow: 3,
    "& .MuiListItemText-root": {
        textAlign: 'left',
    }
}));

export const mainListItems = (
    <React.Fragment>
        <Button
            component={Link}
            to="/"
        >
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </Button>
        <Button
            component={Link}
            to="/translators"
        >
            <ListItemIcon>
                <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Translators"/>
        </Button>
        <Button>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
        </Button>
        <Button>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </Button>
        <Button>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
        </Button>
    </React.Fragment>
);
