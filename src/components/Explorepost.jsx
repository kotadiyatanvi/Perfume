import "./Explorepost.css";
import Card from "./Card";
import { useEffect, useState } from "react";
import { ImEarth } from "react-icons/im";

const ExplorePost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        //in fetch API method first parameter is API path and second parameter is in object method name
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "GET"
        })
        console.log({ response });

        const data = await response.json()
        console.log({ data });
        setPosts(data);
        setLoading(false);
    }
    useEffect(() => {
        console.log("useEffect Running...");
        fetchData()
    }, []);


    console.log("---------", posts);

    return (
        <>
            <div className="explore-header">
                <h2>Explore Post</h2>
                <input type="search" placeholder="search" />
            </div>

            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="card-container">
                    {posts.map((item) => (
                        <Card 
                        img={`https://picsum.photos/id/${item.id}/500/300`}
                        key={item.id}
                        
                        id={item.id}
                            title1={item.title}
                            desc={item.body}
                            from={"explore"} />

                    ))}
                </div>
            )}
        </>
    )
}

export default ExplorePost;

