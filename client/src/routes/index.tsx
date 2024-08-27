import React from "react";
import { useRoutes } from "react-router-dom";
import Layout from "../components/layout/layout.component";
import LoginSignupPage from "../pages/login-signup-page/login-signup-page.component";
import Homepage from "../pages/homepage/homepage.component";
import Forum from "../components/forum/forum.component";
import PostPage from "../pages/post-page/post-page.component";
import NewPost from "../pages/new-post/new-post.component";
import EditPost from "../pages/edit-post/edit-post.component";
import NewComment from "../pages/new-comment/new-comment.component";
import EditComment from "../pages/edit-comment/edit-comment.component";
import { appPath } from "./appPaths";
import SignUp from "../components/sign-up/sign-up.component";

export default function Router() {
    const routes = [
        {
            path: appPath.homePage,
            element: <Layout />,
            children: [
                {
                    path: appPath.homePage,
                    element: <Homepage />
                },
                {
                    path: appPath.login,
                    element: <LoginSignupPage />
                },
                {
                    path: appPath.signup,
                    element: <SignUp />
                },
                {
                    path: appPath.forum,
                    element: <Forum />
                },
                {
                    path:appPath.postPage,
                    element: <PostPage />
                },
                {
                    path: appPath.editcomment,
                    element:<EditComment />
                },
                {
                    path: appPath.newComment,
                    element: <NewComment />
                },
                {
                    path: appPath.editPost,
                    element: <EditPost />
                },
                {
                    path: appPath.newPost,
                    element: <NewPost />
                }
                

            ]
        },
    ]
    return useRoutes(routes);
}