import React from "react";

const Context = React.createContext();

const Provider = ({ children }) => {
    const [notaries, setNotaries] = React.useState([]);
    const [statuses, setStatuses] = React.useState([]);
    const [languages, setLanguages] = React.useState([]);
    const [translators, setTranslators] = React.useState([]);

    React.useEffect(() => {
        fetch("http://localhost:8080/notaries")
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setNotaries(json);
            });

        fetch("http://localhost:8080/statuses")
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setStatuses(json);
            });

        console.log("fetching languages");
        fetch("http://localhost:8080/languages")
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setLanguages(json);
            });
        fetch("http://localhost:8080/translators")
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setTranslators(json);
            });
    }, []);
    
    return (
        <Context.Provider value={{ languages, notaries, statuses, translators,
                                setLanguages, setNotaries, setStatuses, setTranslators }}>
            {children}
        </Context.Provider>
    );
}

export { Context, Provider };
