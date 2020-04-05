import React, {useEffect, useState} from 'react';
import axios from 'axios';
export default function Es(){
    const [list, setList]  = useState([]);
    useEffect(()=>{
        setList([1,2,3]);
        axios.post(`http://localhost:3001/es_search`, {  })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    },[]);

    
    return (
        <h1>Es {list.length}</h1>
    );
}