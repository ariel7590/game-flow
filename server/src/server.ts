import http from 'http'
import dotenv from 'dotenv'
import app from './app'
import { mongoConnect } from './services/mongo';


const PORT = process.env.PORT || 8000;

dotenv.config();

const server = http.createServer(app);

async function startServer() {
	await mongoConnect();

	server.listen(PORT, () => {
		console.log("Listening to port ", PORT);
	});
}

startServer();
