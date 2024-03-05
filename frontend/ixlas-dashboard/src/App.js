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
import {Provider} from './Components/Context';
import Notaries from './Components/Notaries'

function App() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div className={"App"}>
            <Provider>
                <BrowserRouter>
                    <ThemeProvider theme={defaultTheme}>
                        <Box sx={{ display: 'flex' }}>
                            <CssBaseline />
                            <TopBar open={open} toggleDrawer={toggleDrawer}/>
                            <Sidebar open={open} toggleDrawer={toggleDrawer}/>
                            <Routes>
                                <Route path="/" element={<Dashboard />}/>
                                <Route path="/translators" element={<Translators/>}/>
                                <Route path="/notaries" element={<Notaries/>}/>
                            </Routes>
                        </Box>
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
