import './App.css';
import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {CssBaseline, Box, Container } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import Dashboard from "./Components/Dashboard";
import Translators from './Components/Translators';
import TopBar from "./Components/TopBar";
import {defaultTheme} from './Components/Theme';
import Sidebar from './Components/Sidebar';
import {Provider, Context} from './Components/Context';
import Notaries from './Components/Notaries'
import Login from './Components/Login'
import SignUp from './Components/SignUp'

function App() {
    return (
        <div className={"App"}>
            <Provider>
                <Router/>
            </Provider>
        </div>
    );
}

function Router() {
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const context = React.useContext(Context);
    const loggedIn = context.loggedIn;

    React.useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '2rem'}}>
                    <h1>Loading...</h1>
                </Box>
            </Container>
        );
    }

    return (
        (loggedIn === false) ? (
            <BrowserRouter>
                <ThemeProvider theme={defaultTheme}>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <Routes>
                            <Route path="/" element={<Login />}/>
                            <Route path="/signup" element={<SignUp />}/>
                        </Routes>
                    </Box>
                </ThemeProvider>
            </BrowserRouter>
        ) : (
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
            )
    );
}

export default App;
