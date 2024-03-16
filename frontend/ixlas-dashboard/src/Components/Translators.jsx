import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Title from './Title';
import {Context} from './Context';
import { TableHead, TableBody, Button, TextField, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Modal } from '@mui/base';
import AuthService from '../Services/AuthService';

export default function Translators() {
    const context = React.useContext(Context);
    const translators  = context.translators
    const setTranslators = context.setTranslators;
    const [open, setOpen] = React.useState(false);

    function handleModal() {
        setOpen(!open);
    }

    function onSubmit(e) {
        e.preventDefault();

        const name = e.target.name.value;
        const surname = e.target.surname.value;
        const email = e.target.email.value;
        const phone_number = e.target.phone.value;

        fetch('http://localhost:8080/translator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthService.getAcessToken(),
            },
            body: JSON.stringify({name, surname, email, phone_number}),
        })
            .then((res) => res.json())
            .then((json) => {
                setTranslators([...translators, json]);
                setOpen(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function onChange(id, field, value) {
        let translator = translators.find((translator) => translator.translator_id === id);
        console.log(translator)
        translator[field] = value;
        console.log(translator)

        fetch(`http://localhost:8080/translator/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthService.getAcessToken(),
            },
            body: JSON.stringify(translator),   
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                translators[translators.findIndex((translator) => translator.translator_id === id)] = json;
                setTranslators([...translators]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const modalStyle = {  
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
    };

    return (
        <React.Fragment>
            <Modal open={open} onClose={handleModal} sx={modalStyle}>
                <Box sx={modalStyle}>
                    <Title>New Translator</Title>
                    <form onSubmit={onSubmit}>
                        <TextField
                            id="name"
                            label="Name"
                            sx={{ width: '100%', mb: 2 }}
                        />
                        <TextField
                            id="surname"
                            label="Surname"
                            sx={{ width: '100%', mb: 2 }}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            sx={{ width: '100%', mb: 2 }}
                        />
                        <TextField
                            id="phone"
                            label="Phone"
                            sx={{ width: '100%', mb: 2 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ width: '100%', mb: 2 }}
                        >
                            Add
                        </Button>
                    </form>
                </Box>
            </Modal>
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
                }}>
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper elevation={3} 
                            sx={{ 
                                p: 2, 
                            }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Title>Translators</Title>
                                <Button color="primary" onClick={handleModal}>
                                    Add Translator
                                </Button>
                            </Box>
                            <TableHead>
                                <TableRow
                                    sx={{
                                        "& .MuiTableCell-root": {
                                            fontWeight: "bold",
                                        },
                                    }}>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Surname</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {translators.map((translator) => {
                                    return (
                                        <TableRow key={translator.translator_id}>
                                            <TableCell>{translator.translator_id}</TableCell>
                                            <TranslatorCell 
                                                id={'name'}
                                                value={translator.name} 
                                                onChange={(e) => {
                                                    onChange(translator.translator_id, 'name', e.target.value)
                                                }}/>
                                            <TranslatorCell 
                                                id={'surname'}
                                                value={translator.surname} 
                                                onChange={(e) => {
                                                    onChange(translator.translator_id, 'surname', e.target.value)
                                                }}/>
                                            <TranslatorCell
                                                id={'email'}
                                                value={translator.email} 
                                                onChange={(e) => {
                                                    onChange(translator.translator_id, 'email', e.target.value)
                                                }}/>
                                            <TranslatorCell
                                                id={'phone_number'}
                                                value={translator.phone_number} 
                                                onChange={(e) => {
                                                    onChange(translator.translator_id, 'phone', e.target.value)
                                                }}/>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Paper>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
}

function TranslatorCell({id, value, onChange}) {
    const [disabled, setDisabled] = React.useState(true);
    const [hovering, setHovering] = React.useState(false);
    const [field, setField] = React.useState(value);

    function handleEditIcon() {
        setDisabled(false);
    }

    return (
        <TableCell
            key={id}
            id={id}
            sx = {{
                minWidth: '10%',
            }}>
            <TextField  
                value={field}
                disabled={disabled}
                focused={!disabled}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onChange={(e) => setField(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onChange(e)
                        setDisabled(true);
                    }
                }}
                size='small'
                type='text'
                sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                    },
                    minWidth: '200px',
                }}
                InputProps={{
                    endAdornment: <InputAdornment position='end'
                        size='small'
                        sx = {{
                            "& .MuiSvgIcon-root": {
                                color: 'black', },
                            position: 'absolute',
                            right: '10px',
                        }}
                    >
                        {(disabled && hovering) ? <EditIcon onClick={handleEditIcon}/> : <></>}
                    </InputAdornment>,
                }}
            />
        </TableCell>
    );
}
