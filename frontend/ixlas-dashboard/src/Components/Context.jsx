import React from "react";

const Context = React.createContext();

const Provider = ({ children }) => {
    const [notaries, setNotaries] = React.useState([]);
    const [statuses, setStatuses] = React.useState([]);
    const [languages, setLanguages] = React.useState([]);
    const [translators, setTranslators] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);

    React.useEffect(() => {
        fetch("http://localhost:8080/notaries")
            .then((res) => res.json())
            .then((json) => {
                setNotaries(json);
            });

        fetch("http://localhost:8080/statuses")
            .then((res) => res.json())
            .then((json) => {
                setStatuses(json);
            });

        fetch("http://localhost:8080/languages")
            .then((res) => res.json())
            .then((json) => {
                setLanguages(json);
            });
        fetch("http://localhost:8080/translators")
            .then((res) => res.json())
            .then((json) => {
                setTranslators(json);
            });
    }, []);

    return (
        <Context.Provider value={{ languages, notaries, statuses, translators, loggedIn,
                                setLanguages, setNotaries, setStatuses, setTranslators, setLoggedIn }}>
            {children}
        </Context.Provider>
    );
}

export { Context, Provider };
