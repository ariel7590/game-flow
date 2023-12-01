import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar.component";
import Homepage from "./pages/homepage/homepage.component";
import LoginSignupPage from "./pages/login-signup-page/login-signup-page.component";

function App() {
	return (
		<>
			<NavBar />
			<Router>
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/login' element={<LoginSignupPage />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
