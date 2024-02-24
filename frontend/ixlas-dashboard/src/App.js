import './App.css';
import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import Dashboard from "./Components/Dashboard";
import Translators from './Components/Translators';
import TopBar from "./Components/TopBar";
import {defaultTheme} from './Components/Theme';
import Sidebar from './Components/Sidebar';
import Context from './Context';


function App() {
    const [open, setOpen] = React.useState(true);
    const [languages, setLanguages] = React.useState([]);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        fetch('http://localhost:8080/languages')
            .then(response => response.json())
            .then(data => {
                setLanguages(data);
            });
    }, [])

    return (
        <div className={"App"}>
            <Context.Provider value={{open, toggleDrawer, languages}}>
                <BrowserRouter>
                    <ThemeProvider theme={defaultTheme}>
                        <Box sx={{ display: 'flex' }}>
                            <CssBaseline />
                            <TopBar open={open} toggleDrawer={toggleDrawer}/>
                            <Sidebar open={open} toggleDrawer={toggleDrawer}/>
                            <Routes>
                                <Route path="/" element={<Dashboard />}/>
                                <Route path="/translators" element={<Translators/>}/>
                            </Routes>
                        </Box>
                    </ThemeProvider>
                </BrowserRouter>
            </Context.Provider>
        </div>
    );
}

export default App;
