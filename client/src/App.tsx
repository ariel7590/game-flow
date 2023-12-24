import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { authenticationThunk } from "./redux/users/users.thunks";
import NavBar from "./components/navbar/navbar.component";
import Homepage from "./pages/homepage/homepage.component";
import LoginSignupPage from "./pages/login-signup-page/login-signup-page.component";
import Forum from "./components/forum/forum.component";
import PostPage from "./pages/post-page/post-page.component";
import NewPost from "./pages/new-post/new-post.component";
import EditPost from "./pages/edit-post/edit-post.component";

function App() {

	const dispatch=useDispatch<AppDispatch>();

	useEffect(()=>{
		dispatch(authenticationThunk({}));
	},[])
	
	return (
		<>
			<Router>
				<NavBar />
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/login' element={<LoginSignupPage />} />
					<Route path='/forum' element={<Forum />} />
					<Route path="/forum/post/:id" element={<PostPage />} />
					<Route path="/forum/post/edit-post/:id" element={<EditPost />} />
					<Route path="/forum/new-post" element={<NewPost />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
