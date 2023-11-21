import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<StyledEngineProvider injectFirst>
			<Provider store={store}>
				<App />
			</Provider>
		</StyledEngineProvider>
	</React.StrictMode>
);
