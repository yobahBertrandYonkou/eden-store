import {useEffect, useState } from 'react';

const useFetchAll = (url, category, type) => {
    const [ data, setData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ hasData, setHasData ] = useState(true);

    // sending get request from server
    useEffect(() => {

        (async () => {
 
            await fetch(`${ url }/${ category }/${ type }`)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                // no data
                if (data.products.length == 0) {
                    setHasData(false);
                }

                // data
                setData(data);
                setIsLoading(false);
            })
            .catch(error => console.error(error));
        })();
    }, []);
    return { data, isLoading, hasData }
}

const useFetchOne = (url, id) => {
    const [ data, setData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    console.log(id)
    // sending get request from server
    useEffect(() => {

        (async () => {
            await fetch(`${ url }/${ id }`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // data
                setData(data);
                setIsLoading(false);
            })
            .catch(error => console.error(error));
        })();
    }, []);
    return { data, isLoading }
}

export { useFetchAll, useFetchOne };