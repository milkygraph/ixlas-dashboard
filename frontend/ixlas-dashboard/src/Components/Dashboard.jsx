import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Earnings from './Earnings';
import Orders from './Orders';
import Copyright from './Copyright';

export default function Dashboard() {
   return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />
            <Container maxWidth="90%" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3} >
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                                borderRadius: '10px'
                            }}
                        >
                            <Chart />
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                                borderRadius: '10px'
                            }}>
                            <Earnings />
                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper elevation={3} 
                            sx={{ 
                                p: 2, 
                                display: 'flex', 
                                flexDirection: 'column' ,
                                borderRadius: '10px' 
                            }}>
                            <Orders />
                        </Paper>
                    </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Box>
    );
}
