import { createContext, useState, useEffect, useRef, useContext } from "react";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const call = useRef(false);

    useEffect(() => {
        if (call.current) return; 
        call.current = true;

        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(result => {
                setData(result);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <DataContext.Provider value={{ data, setData, loading }}>
            {children}
        </DataContext.Provider>
    );
};
