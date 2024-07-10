import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BlogList from "./BlogList";
import useFetch from './useFetch';
import AddidPage from "./AddidPage";

const Home = () => {
    const { data :results, isPending, error } = useFetch("http://localhost:8080/logout");
    const history = useHistory();

    const handelClick = () =>{
        let path = `start`;
        history.push(path);
    }
    

    return ( 
        <div className="home container">
            <div className="addMarginBotton">
                <h1>Welcome, let's start.</h1>
            </div>
            <div>
                <button onClick={handelClick}>Next</button>
            </div>
        </div>
     );
}
 
export default Home;

//<BlogList  blogs = {blogs.filter((blog) => blog.author === 'mario')} title="Mario's blogs"/>

/* 用 [], 只在名字第一次改变时才会在console中显示。 如果没有[], 每一次的改变都会显示出来
    useEffect(() => {
        console.log("use effect ran");
        console.log(name);
    }, [name]);
*/

/*
[
        { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
        { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
        { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
    ]
*/

/*
    //Button删除，更新信息（blogs）
    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs)

    }
*/