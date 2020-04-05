import React, {useEffect, useState} from 'react';
import ContentLoader, { Facebook } from 'react-content-loader';
function PostItem({first_name, last_name, avatar, email}){
    return(
        <div style={{border: "1px gray solid", margin:"10"}}>
            <p>{first_name} {last_name} {email}</p>
            <img src={avatar} alt="Avatar"/>
        </div>
    );
}
export default function Posts(){
    const [posts, setPosts] = useState([]);
    const [data_posts, setDataPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [url, setUrl] = useState(`https://reqres.in/api/users?page=1&delay=5`);
    const [isLoading, setIsLoading] = useState(false);
    const getListposts = async (page)=>{
        setIsLoading(true);
        let response = await fetch(url);
        let data = await response.json();
        setPosts(data);
        setDataPosts(data_posts.concat(data.data));
        setIsLoading(false);
    }
    useEffect(()=>{
        getListposts(page);
    },[url])

    let loadmore = (<></>);
    if(posts.page<posts.total_pages){
        loadmore = (<button type="button" onClick={(e)=>{
            setUrl(`https://reqres.in/api/users?page=${page+1}&delay=5`);
        }}>Load more</button>);
    }
    const MyLoader = () => (
        <ContentLoader viewBox="0 0 380 70">
          {/* Only SVG shapes */}    
          <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
          <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
          <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
        </ContentLoader>
      )
    return (
        <div>
            {data_posts.length>0?data_posts.map((post)=><PostItem key={post.id} {...post}/>):(<code>loading...</code>)}
            {isLoading?<ContentLoader/>:loadmore}
        </div>
    );
}