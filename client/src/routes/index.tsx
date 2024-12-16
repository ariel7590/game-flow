import { useRoutes } from "react-router-dom";
import Layout from "../components/layout/layout.component";
import LoginPage from "../pages/login-page/login-page";
import Homepage from "../pages/homepage/homepage.component";
import Forum from "../components/forum/forum.component";
import PostPage from "../pages/post-page/post-page.component";
import NewPost from "../pages/new-post/new-post.component";
import EditPost from "../pages/edit-post/edit-post.component";
import NewComment from "../pages/new-comment/new-comment.component";
import EditComment from "../pages/edit-comment/edit-comment.component";
import { appPath } from "./appPaths";
import SignUpPage from "../pages/sign-up-page/sign-up-page";

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
                    element: <LoginPage />
                },
                {
                    path: appPath.signup,
                    element: <SignUpPage />
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
                },
                {
                    path: appPath.error,
                    element: <h1>Error 404: Page not found!</h1>
                }
                

            ]
        },
    ]
    return useRoutes(routes);
}