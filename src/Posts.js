import React, {useEffect, useState} from 'react';
function PostItem({first_name, last_name}){
    return(
        <div style={{border: "1px gray solid", margin:"10"}}>
            <p>{first_name} {last_name}</p>
        </div>
    );
}
export default function Posts(){
    const [posts, setPosts] = useState([]);
    const [data_posts, setDataPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [url, setUrl] = useState(`https://reqres.in/api/users?page=1`);
    const getListposts = async (page)=>{
        let response = await fetch(url);
        let data = await response.json();
        setPosts(data);
        setDataPosts(data_posts.concat(data.data));
    }
    useEffect(()=>{
        getListposts(page);
    },[url,page])

    let loadmore = (<></>);
    if(posts.page<posts.total_pages){
        loadmore = (<button type="button" onClick={(e)=>{
            setUrl(`https://reqres.in/api/users?page=${page+1}`);
        }}>Load more</button>);
    }
    return (
        <div>
            {data_posts.length>0?data_posts.map((post)=><PostItem key={post.id} {...post}/>):(<code>empty</code>)}
            {loadmore}
        </div>
    );
}