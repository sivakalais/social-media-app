import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Post from "./Post";
import { format } from "date-fns";
import PostLayout from "./PostLayout";
import { useEffect, useState } from "react";
import EditPage from "./EditPage";
import api from "./api/posts";
import { DataProvider } from "./context/DataContext";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header title="Kalai Social Media" />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="post">
            <Route index element={<NewPost />} />
            <Route path=":id" element={<PostPage />} />
          </Route>
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
