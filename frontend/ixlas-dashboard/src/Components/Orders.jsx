import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell'; import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Title from './Title';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';
import {Context} from './Context';

const types = {
    money: 'money',
    date: 'date',
    text: 'text',
    language: 'language',
    number: 'number',
    notary: 'notary',
    status: 'status',
    translator: 'translator',
};

export default function Orders() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const context = React.useContext(Context);
    const notaries = context.notaries;
    const languages = context.languages;
    const translators = context.translators;
    const [orders, setOrders] = React.useState([]);
    const [numOrders, setNumOrders] = React.useState(0);

    React.useEffect(() => {
        fetch(`http://localhost:8080/orders/1`)
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            });

        fetch('http://localhost:8080/orders/count')
            .then((response) => response.json())
            .then((data) => {
                setNumOrders(Math.ceil(data / 10));
            });
    }, []);

    function handleModalToggle() {
        setModalOpen(!modalOpen);
    }

    function handleAddOrder(e) {
        e.preventDefault();
        console.log(e);

        const newOrder = {
            name: e.target.name.value,
            surname: e.target.surname.value,
            phone_number: e.target.phone.value,
            language_from: e.target.language_from.value,
            language_to: e.target.language_to.value,
            number_of_pages: parseInt(e.target.number_of_pages.value),
            notary_id: notaries.filter((notary) => 
                notary.notary_name === e.target.notary_id.value)[0].notary_id,
            translator_id: translators.filter((translator) =>
                `${translator.name} ${translator.surname}` === e.target.translator_id.value)[0].translator_id,
            status_id: 1,
            total_payment: e.target.total_payment.value,
            down_payment: e.target.down_payment.value,
            expenses: e.target.expenses.value,
            details: 'Details',
        }

        fetch('http://localhost:8080/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder)}).then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setOrders([data, ...orders]);
            }).catch((error) => {
                console.error('Error:', error);
            });

        handleModalToggle();
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
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Title>Recent Orders</Title>
                <Button onClick={handleModalToggle}>Add Order</Button>
            </Box>
            <Modal open={modalOpen} onClose={handleModalToggle} >
                <Box sx={modalStyle}>
                    <Title sx={{textAlign: 'center',}}>
                        New Order
                    </Title>
                    <form onSubmit={handleAddOrder}>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                            <TextField id="name" required label="Name" variant="outlined" fullWidth margin="normal" />
                            <TextField id="surname" required label="Surname" variant="outlined" fullWidth margin="normal" />
                            <TextField id="phone" required label="Phone" variant="outlined" fullWidth margin="normal" />
                        </Box>

                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px', width: '100%'}}>
                            <Autocomplete
                                required
                                sx = {{width: '100%'}}
                                options={languages}
                                id="language_from"
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} label="Language From" variant="outlined" fullWidth margin="normal" />}
                            />
                            <Autocomplete
                                required
                                sx = {{width: '100%'}}
                                options={languages}
                                id="language_to"
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} label="Language To" variant="outlined" fullWidth margin="normal" />}
                            />
                            <TextField sx={{width: '200px'}} required id="number_of_pages" label="Pages" variant="outlined" fullWidth margin="normal" type={"number"} />
                        </Box>

                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                            <TextField id="expenses" required label="Expenses" variant="outlined" fullWidth margin="normal" />
                            <TextField id="down_payment" required label="Down Payment" variant="outlined" fullWidth margin="normal" />
                            <TextField id="total_payment" required label="Total Payment" variant="outlined" fullWidth margin="normal" />
                        </Box>
                        <Autocomplete
                            required
                            options={translators}
                            id="translator_id"
                            getOptionLabel={(option) => option.name + ' ' + option.surname}
                            renderInput={(params) => <TextField {...params} label="Translator" variant="outlined" fullWidth margin="normal" />}
                        />
                        <Autocomplete
                            required
                            options={notaries}
                            id="notary_id"
                            getOptionLabel={(option) => option.notary_name}
                            renderInput={(params) => <TextField {...params} label="Notary" variant="outlined" fullWidth margin="normal" />}
                        />
                        <Button variant="contained" type='submit'>Add Order</Button>
                    </form>
                </Box>
            </Modal>
            {orders.length === 0 && (<Title>No orders found</Title>)}
            <Table
                sx = {{
                    backgroundColor: 'white',
                    "& .MuiTableCell-root": {
                        paddingLeft: '3px',
                        paddingRight: '3px',
                    },
                }}
            >
                <TableHead>
                    <TableRow
                        sx={{
                            "& .MuiTableCell-root": {
                                fontWeight: "bold",
                            },
                        }}
                    > <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Surname</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Language from</TableCell>
                        <TableCell>Language to</TableCell>
                        <TableCell>Pages</TableCell>
                        <TableCell>Translator</TableCell>
                        <TableCell>Notary</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Expenses</TableCell>
                        <TableCell>Down Payment</TableCell>
                        <TableCell>Total Payment</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <OrderRow key={order.order_id} row={order} />
                        ))) : (<></>)}
                </TableBody>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: '10px',
                }}>
                {Array.from({length: numOrders}, (_, i) => i + 1).map((num) => (
                    <Button key={num} onClick={() => {
                        fetch(`http://localhost:8080/orders/${num}`)
                            .then((response) => response.json())
                            .then((data) => {
                                setOrders(data);
                            });
                    }}>{num}</Button>
                ))}
                </Box>
            </Table>
        </React.Fragment>);
}

function OrderRow ({row}) {
    const [order, setOrder] = React.useState(row);
    const dateOptions = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };

    function handleEdit(field, value, type) {
        switch (type) {
            case types.date:
                value = new Date(value);
                break;
            case types.number:
                value = parseInt(value);
                break;
            default:
                break;
        }

        console.log(`field: ${field}, value: ${value}`)

        let updatedOrder = { ...order, [field]: value };

        // TODO: remove this line
        console.log(updatedOrder);

        setOrder({ ...order, [field]: value });
        fetch(`http://localhost:8080/order/${order.order_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedOrder),
        })
    }

    return (
        <TableRow key={order.order_id}>
            <TableCell>{new Date(order.issued_date).toLocaleDateString('us-US', dateOptions)}</TableCell>
            <OrderCell id={"name"}
                value={order.name} 
                func={handleEdit}
                type={types.text} 
            />
            <OrderCell id={"surname"}
                value={order.surname} 
                func={handleEdit}
                type={types.text} 
            />
            <OrderCell id={"phone_number"}
                value={order.phone_number} 
                func={handleEdit}
                type={types.text} 
            />
            <OrderCell id={"language_from"}
                value={order.language_from} 
                func={handleEdit} 
                type={types.language} 
            />
            <OrderCell id={"language_to"}
                value={order.language_to} 
                func={handleEdit} 
                type={types.language} 
            />
            <OrderCell id={"number_of_pages"}
                value={order.number_of_pages} 
                func={handleEdit} 
                type={types.number} 
            />
            <OrderCell id={"translator_id"}
                value={order.translator_id} 
                func={handleEdit} 
                type={types.translator}
            />
            <OrderCell id={"notary_id"}
                value={order.notary_id} 
                func={handleEdit} 
                type={types.notary}
            />
            <OrderCell id={"status_id"}
                value={order.status_id}
                func={handleEdit}
                type={types.status} 
            />
            <OrderCell id={"expenses"}
                value={`${order.expenses}`}
                func={handleEdit}
                type={types.money} 
            />
            <OrderCell id={"down_payment"}
                value={`${order.down_payment}`}
                func={handleEdit} 
                type={types.money} 
            />
            <OrderCell id={"total_payment"}
                value={`${order.total_payment}`}
                func={handleEdit}
                type={types.money}
            />
        </TableRow>
    );
}


function OrderCell({id, value, func, type}) {
    const [field, setField] = React.useState(value);
    const [disabled, setDisabled] = React.useState(true);
    const [hovering, setHovering] = React.useState(false);
    const context = React.useContext(Context);

    const arr = chooseArr();

    function chooseArr() {
        switch (type) {
            case types.money:
                return context.money;
            case types.language:
                return context.languages;
            case types.number:
                return context.number;
            case types.notary:
                return context.notaries;
            case types.status:
                return context.statuses;
            case types.translator:
                return context.translators;
            default:
                return [];
        }
    }

    // function handleEnter(e) {
    //     console.log(e);
    //     func(id, field, type);
    // }

    function handleEditIcon() {
        setDisabled(false);
    }

    function onChange(e, newValue) {
        switch (type) {
            case types.money:
                setField(newValue);
                break;
            case types.language:
                setField(newValue);
                break;
            case types.number:
                // check for non-numeric characters
                if (e.target.value.match(/[^0-9]/)) {
                    return;
                }
                setField(newValue);
                break;
            case types.notary:
                setField(newValue.id);
                newValue = newValue.id;
                break;
            case types.status:
                setField(newValue.status_id);
                newValue = newValue.status_id;
                break;
            case types.translator:
                setField(newValue.translator_id);
                newValue = newValue.translator_id;
                break;
            default:
                setField(newValue);
                break;
        }

        func(id, newValue, type)
    }

    return (
        <TableCell
            key={id}
            id={id}
            sx = {{
                minWidth: '10%',
            }}
        >
            {(type !== types.notary && type !== types.status && type !== types.language && type !== types.translator) ? (
                <TextField  
                    value={field}
                    disabled={disabled}
                    focused={!disabled}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    onChange={(e) => setField(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onChange(e, e.target.value);
                            setDisabled(true);
                        }
                    }}
                    size='small'
                    type={ type === types.money ? 'number' : 
                        type === types.number ? 'number' :
                            type === types.date ? 'datetime-local' :
                                'text'
                    }
                    sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                        },

                        minWidth: type === types.money ? '100px' : '0px',
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
                />) : (false) ? (<></>) : (type === types.translator) ?
                    <Autocomplete
                        options={arr}
                        onChange={onChange}
                        getOptionLabel={(option) => option.name + ' ' + option.surname}
                        id={id}
                        size='small'
                        disableClearable
                        disablePortal
                        value={arr.filter((option) => option.translator_id === field)[0] || {name: '', surname: ''}}
                        renderInput={(params) => <TextField {...params} label="" />}
                        filterOptions={(x) => x}
                    /> : (type === types.notary) ?
                        <Autocomplete
                            options={arr}
                            onChange={onChange}
                            getOptionLabel={(option) => option.notary_name}
                            id={id}
                            size='small'
                            disableClearable
                            disablePortal
                            value={arr.filter((option) => option.notary_id === field)[0] || {notary_name: ''}}
                            renderInput={(params) => <TextField {...params} label="" />}
                            filterOptions={(x) => x}
                        /> : (type === types.status) ? 
                            <Autocomplete
                                options={arr}
                                onChange={onChange}
                                getOptionLabel={(option) => option.status_name}
                                id={id}
                                size='small'
                                disableClearable
                                disablePortal
                                value = {arr.filter((option) => option.status_id === field)[0] || {status_name: ''}}
                                renderInput={(params) => <TextField {...params} label="" />}
                            /> : (type === types.language) ?
                                <Autocomplete
                                    options={arr}
                                    onChange={onChange}
                                    getOptionLabel={(option) => option}
                                    id={id}
                                    size='small'
                                    disableClearable
                                    disablePortal
                                    value={field}
                                    renderInput={(params) => <TextField {...params} label="" />}
                                /> : <></>
            }
        </TableCell>
    );
}
