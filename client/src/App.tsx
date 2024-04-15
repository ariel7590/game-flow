import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { authenticationThunk } from "./redux/users/users.thunks";
import Router from "./routes";

function App() {

	const dispatch=useDispatch<AppDispatch>();

	useEffect(()=>{
		async function authentication(){
			await dispatch(authenticationThunk({}));
		}
		
		authentication();
	},[])
	
	return (
		<>
		<BrowserRouter>
			<Router />
		</BrowserRouter>
		</>
	);
}

export default App;
