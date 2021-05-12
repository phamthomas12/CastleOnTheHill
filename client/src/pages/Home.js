import React from "react";
import HeaderImage from "../components/HeaderImage";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import PostsList from "../components/PostList";

function Home() {
  return (
    <>
    <HeaderImage />
    <Layout>
    <NavBar />
    <PostsList />
    </Layout>
    </>
  );
};

export default Home;
