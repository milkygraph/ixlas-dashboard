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

const notaries = [
    {id: 1, name: '1 nömrəli'},
]

const statuses = [
    {id: 1, name: 'Tərcüməyə verilir'},
    {id: 2, name: 'Hazırlanır'},
    {id: 3, name: 'Hazırdır'},
]


export default function Orders({orders}) {
    return (
        <React.Fragment>
            <Title>Recent Orders</Title>
            <Table
                sx = {{
                    backgroundColor: 'white',
                    "& .MuiTableCell-root": {
                        paddingLeft: '5px',
                        paddingRight: '5px',
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
                    >
                        <TableCell>Date</TableCell>
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
    const [languages, setLanguages] = React.useState([]);
    const [translators, setTranslators] = React.useState([]);

    React.useEffect(() => {
        if (type === types.language) {
            fetch('http://localhost:8080/languages')
                .then((response) => response.json())
                .then((data) => {
                    setLanguages(data);
                });
        } else if (type === types.translator) {
            fetch('http://localhost:8080/translators')
                .then((response) => response.json())
                .then((data) => {
                    setTranslators(data);
                });
        }
    }, [type]);

    function handleEdit() {
        func(id, field, type);
        setDisabled(true);
    }

    function handleEditIcon() {
        setDisabled(false);
    }

    function onChange(e, newValue) {
        console.log(newValue);
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
                setField(newValue.id);
                newValue = newValue.id;
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
            {(type !== types.notary && type !== types.status && type !== types.language) ? (
            <TextField 
                value={field}
                disabled={disabled}
                focused={!disabled}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onChange={onChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleEdit();
                    }
                }}
                onBlur={handleEdit}
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
            />) : (type === types.notary) ?
                        <Autocomplete
                            options={notaries}
                            onChange={onChange}
                            getOptionLabel={(option) => option.name}
                            id="status"
                            size='small'
                            disableClearable
                            disablePortal
                            value={notaries.filter((option) => option.id === field)[0]}
                            renderInput={(params) => <TextField {...params} label="" />}
                        />
                    : (type === types.status) ? 

                        <Autocomplete
                            options={statuses}
                            onChange={onChange}
                            getOptionLabel={(option) => option.name}
                            id="status"
                            size='small'
                            disableClearable
                            disablePortal
                            value={statuses.filter((option) => option.id === field)[0]}
                            renderInput={(params) => <TextField {...params} label="" />}
                        />

                        : (type === types.language) ?
                            <Autocomplete
                                options={languages}
                                onChange={onChange}
                                getOptionLabel={(option) => option}
                                id="status"
                                size='small'
                                disableClearable
                                disablePortal
                                value={field}
                                renderInput={(params) => <TextField {...params} label="" />}
                            /> 
                            : (type === types.translator) ?
                                <Autocomplete
                                    options={translators}
                                    onChange={onChange}
                                    getOptionLabel={(option) => option.name + ' ' + option.surname}
                                    id="status"
                                    size='small'
                                    disableClearable
                                    disablePortal
                                    value={field}
                                    renderInput={(params) => <TextField {...params} label="" />}
                                /> 
                                : <></>
                }
        </TableCell>
    );
}
