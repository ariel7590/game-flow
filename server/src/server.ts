import http from 'http'
import config from 'config';
import app from './app'
import { mongoConnect } from './api/utils/mongo-connect';
import { cloudinaryConfig } from './config/cloudinary';


const PORT = config.get('port');

const server = http.createServer(app);

async function startServer() {
	await mongoConnect();
	await cloudinaryConfig();

	server.listen(PORT, () => {
		console.log("Listening to port ", PORT);
	});
}

startServer();
