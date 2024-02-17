import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell'; import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import { Select, MenuItem } from "@mui/material";

const types = {
    money: 'money',
    date: 'date',
    text: 'text',
    language: 'language',
    number: 'number',
    notary: 'notary',
    status: 'status',
};

const notaries = [
    {id: 1, name: '1 nömrəli'},
]

const statuses = [
    {id: 1, name: 'Başlanmayib'},
    {id: 2, name: 'Hazirlanir'},
    {id: 3, name: 'Hazirdir'},
]


export default function Orders({orders}) {
    return (
        <React.Fragment>
            <Title>Recent Orders</Title>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Surname</TableCell>
                        <TableCell>Language from</TableCell>
                        <TableCell>Language to</TableCell>
                        <TableCell>Pages</TableCell>
                        <TableCell>Notary</TableCell>
                        <TableCell>Down Payment</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Total Payment</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <OrderRow key={order.order_id} row={order} />
                        ))) : (<></>)}
                </TableBody>
            </Table>
        </React.Fragment>);
}

function OrderRow ({row}) {
    const [order, setOrder] = React.useState(row);
    const dateOptions = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };

    function handleEdit(field, value, type) {
        switch (type) {
            case types.money:
                value = parseFloat(value.replace('$', ''));
                break;
            case types.date:
                value = new Date(value);
                break;
            case types.language:
                value = value.toUpperCase();
                break;
            case types.number:
                value = parseInt(value);
                break;
            default:
                break;
        }

        console.log(`field: ${field}, value: ${value}`)

        let updatedOrder = { ...order, [field]: value };
        setOrder({ ...order, [field]: value });
        updatedOrder['language_from'] = updatedOrder['language_from'].toUpperCase();
        updatedOrder['language_to'] = updatedOrder['language_to'].toUpperCase();
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
            <OrderColumn id={"name"}
                         value={order.name} 
                         func={handleEdit}
                         type={types.text} />
            <OrderColumn id={"surname"}
                         value={order.surname} 
                         func={handleEdit}
                         type={types.text} />
            <OrderColumn id={"language_from"}
                         value={order.language_from} 
                         func={handleEdit} 
                         type={types.language} />
            <OrderColumn id={"language_to"}
                         value={order.language_to} 
                         func={handleEdit} 
                         type={types.language} />
            <OrderColumn id={"number_of_pages"}
                         value={order.number_of_pages} 
                         func={handleEdit} 
                         type={types.number} />
            <OrderColumn id={"notary_id"}
                         value={order.notary_id} 
                         func={handleEdit} 
                         type={types.notary}
                         />
            <OrderColumn id={"down_payment"}
                         value={order.down_payment} 
                         func={handleEdit} 
                         type={types.money} />
            <OrderColumn id={"status"}
                value={order.status}
                func={handleEdit}
                type={types.status} />
            <TableCell align="right">{`$${order.total_payment}`}</TableCell>
        </TableRow>
    );
}


function OrderColumn({id, value, func, type}) {
    const [field, setField] = React.useState(value);
    const [disabled, setDisabled] = React.useState(true);

    function handleEdit() {
        func(id, field, type);
        setDisabled(true);
    }

    function handleEditIcon() {
        setDisabled(false);
    }

    function onChange(e) {
        switch (type) {
            case types.money:
                setField(e.target.value);
                break;
            case types.language:
                setField(e.target.value.toUpperCase());
                break;
            case types.number:
                // check for non-numeric characters
                if (e.target.value.match(/[^0-9]/g)) {
                    break;
                }
                setField(e.target.value);
                break;
            default:
                setField(e.target.value);
                break;
        }
    }

    return (
        <TableCell>
            {(type !== types.notary && type !== types.status) ? (
            <TextField 
                value={field}
                disabled={disabled}
                onChange={onChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleEdit();
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
                    position: 'relative',
                }}
                InputProps={{
                    endAdornment: <InputAdornment position='end'
                        size='small'
                    >
                        {(disabled) ? <EditIcon onClick={handleEditIcon}/> : <></>}
                    </InputAdornment>,
                }}
            />) : (type === types.notary) ?
                <Select value={field} onChange={onChange}
                        size='small'
                >
                    {notaries.map((notary) => (
                        <MenuItem key={notary.id} value={notary.id}>{notary.name}</MenuItem>
                    ))}
                </Select> : 
                    (type === types.status) ? 
                    <Select value={field} onChange={onChange}
                            size='small'
                    >
                        {statuses.map((status) => (
                            <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>
                        ))}
                    </Select> : <></>
                }
        </TableCell>
    );
}