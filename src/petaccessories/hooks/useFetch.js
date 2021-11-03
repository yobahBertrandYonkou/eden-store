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

const useFetchOne = (url, id, userId) => {
    const [ data, setData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ related, setRelated ] = useState(null);
    const [ hasOffer, setHasOffer ] = useState(false);
    const [ offer, setOffer ] = useState(null);

    console.log(id)
    // sending get request from server
    useEffect(() => {

        (async () => {
            await fetch(`${ url }/${ id }/${ userId }`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                // data
                setData(data.data);
                setRelated(data.related);
                

                if (data.hasOffer){
                    setHasOffer(true);
                    setOffer(data.offer)
                    console.log("kkkkkkkkkkk")
                    console.log(data.offer)
                }

                setIsLoading(false);
            })
            .catch(error => console.error(error));
        })();
    }, []);
    return { data, related, isLoading , offer, hasOffer}
}

export { useFetchAll, useFetchOne };