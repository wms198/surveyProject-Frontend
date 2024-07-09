import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
         fetch(url, {
             singel: abortCont.singel,
             credentials: "include",
             redirect: "manual"
         })
             .then(res => {
                 if(res.type == "opaqueredirect"){
                     throw Error("redirect");
                 }

                 if(!res.ok){
                     throw Error('could not fetch the data for that resource');
                 }
                 console.log("useFetch response:", res.clone().json());
                 return res.json();
             })
             .then((data) => {
                 setData(data);
                 console.log("useFetch data:", data);
                 setIsPending(false);
                 setError(null);
             })
             .catch((err) => {
                if(err.name === 'AbortError'){
                    console.log("fetch aborted");
                }else if(err.name === "redirect"){
                 setIsPending(false);
                 setError(err.message);
                }else{
                 setIsPending(false);
                 setError(err.message);
                }
             })
        }, 300);

        return () => abortCont.abort();
     }, [url]);

     return { data, isPending, error };
}

export default useFetch;
