import React from "react";
import AuthService from "../Services/AuthService";

const Context = React.createContext();

const Provider = ({ children }) => {
    const [notaries, setNotaries] = React.useState([]);
    const [statuses, setStatuses] = React.useState([]);
    const [languages, setLanguages] = React.useState([]);
    const [translators, setTranslators] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);

    React.useEffect(() => {
        if(localStorage.getItem("user")) {
            setLoggedIn(true);
            return
        }
        setLoggedIn(false);
    }, [loggedIn]);

    function logout(err) {
        if (err.response.status === 401) {
            AuthService.logout(setLoggedIn);
        }
    }

    React.useEffect(() => {
        if (!loggedIn) {
            return;
        }

        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${AuthService.getCurrentUser().access_token}`,
            }
        };

        fetch("http://localhost:8080/notaries", requestOptions)
            .then((res) => res.json())
            .then((json) => {
                setNotaries(json);
            }).catch(logout);

        fetch("http://localhost:8080/statuses", requestOptions)
            .then((res) => res.json())
            .then((json) => {
                setStatuses(json);
            }).catch(logout);

        fetch("http://localhost:8080/languages", requestOptions)
            .then((res) => res.json())
            .then((json) => {
                setLanguages(json);
            }).catch(logout);

        fetch("http://localhost:8080/translators", requestOptions)
            .then((res) => res.json())
            .then((json) => {
                setTranslators(json);
            }).catch(logout);
    }, [loggedIn]);

    return (
        <Context.Provider value={{ languages, notaries, statuses, translators, loggedIn,
                                setLanguages, setNotaries, setStatuses, setTranslators, setLoggedIn }}>
            {children}
        </Context.Provider>
    );
}

export { Context, Provider };
