import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./config/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<StyledEngineProvider injectFirst>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</StyledEngineProvider>
	// </React.StrictMode>
);
