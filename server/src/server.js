const http = require("http");
require("dotenv").config();
const app = require("./app");
// const mongoConnect
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
	// mongo connect

	server.listen(PORT, () => {
		console.log("Listening to port ", PORT);
	});
}

startServer();
