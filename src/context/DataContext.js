import { createContext, useEffect, useState } from "react";
import Post from "../Post";
import { format } from "date-fns";
import PostLayout from "../PostLayout";
import EditPage from "../EditPage";
import api from "../api/posts";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setposts] = useState([]);
  const [search, setSearch] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setposts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      console.log("response", response);
      const allPosts = [...posts, response.data];
      setposts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error:${err.message}`);
      }
    }
  };
  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setposts(
        posts.map((post) => (post.id == id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setposts(postsList);
      navigate("/");
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };
  return(
    <DataContext.Provider
        value={{
        width,
        search,
        setSearch,
        posts,
        fetchError,
        isLoading,
        searchResults,
        handleSubmit,
        setPostTitle,
        postTitle,
        postBody,
        setPostBody,
        handleEdit,
        editBody,
        setEditBody,
        editTitle,
        setEditTitle,
        handleDelete,
        }}
    >
        {children}
    </DataContext.Provider>
  )
};
export default DataContext;
