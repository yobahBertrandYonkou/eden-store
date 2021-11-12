import { useEffect, useState } from "react"

var useFilters = () => {
    const [filters, setFilters] = useState(null);
    
    useEffect( () => {
        fetch("http://localhost:9000/products/filters")
        .then( response => response.json() )
        .then( filters =>  {
            console.log(filters);
            setFilters(filters);
        })
        .catch( error => console.log(error) );
    },[]);

    return { filters };
}

export { useFilters };
