import React,{useState,useEffect} from 'react';

function useGriphy(query){
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchData(){
            const response  = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=K484gSxgwRGvoUlKZ0RCXjecdnYh2MT0&q=${query}&limit=25&offset=0&rating=G&lang=en`);
            const json = await response.json();
            console.log({json});
            setResults(
                json.data.map(item=>{
                    return item.images.preview.mp4;
                })
            );
        }
        if(query !== ''){
            fetchData();
        }
    }, [query]);
    return [results, loading];
}
export default function AsyncHooks(){
    const [search, setSearch] = useState('') ;
    const [query, setQuery] = useState('') ;
  
    const [results, loading] = useGriphy(query);

    const onSubmit = (e)=>{
        e.preventDefault();
        setQuery(search);
    }    
    return (
        <div>
            <h1>[A]sync React Hooks</h1>
            <form onSubmit={onSubmit}>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search for gif"/>
                <button type="submit">Search</button>
            </form>
            <br/>
            {
                results.map(item=>(
                    <video autoPlay loop key={item} src={item} />
                ))
            }
        </div>
    );   
}