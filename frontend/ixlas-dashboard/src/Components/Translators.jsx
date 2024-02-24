import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Title from './Title';


export default function Translators() {
    const [translators, setTranslators] = React.useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/translator')
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                setTranslators(json)
            });
    }, []);

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
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4}}>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper 
                            elevation={3}
                            sx={{ 
                                p: 2, 
                                display: 'flex', 
                                flexDirection: 'column' ,
                                borderRadius: '10px' 
                            }}>
                            <Title>Translators</Title>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Surname</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                            </TableRow>
                            {translators.map((translator) => {
                                return (
                                    <TableRow key={translator.translator_id}>
                                        <TableCell>{translator.translator_id}</TableCell>
                                        <TableCell>{translator.name}</TableCell>
                                        <TableCell>{translator.surname}</TableCell>
                                        <TableCell>{translator.email}</TableCell>
                                        <TableCell>{translator.phone_number}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </Paper>
                    </Grid>
            </Container>
        </Box>
    );
}
