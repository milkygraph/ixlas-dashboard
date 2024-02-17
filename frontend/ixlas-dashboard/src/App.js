import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Analytics from "./Components/Analytics";
import Translators from './Components/Translators';


function App() {
    return (
        <div className={"App"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/translators" element={<Translators/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
