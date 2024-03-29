export interface IReceivedPostContent {
	publisher: string;
	publisherId: number;
	gameName: string;
	title: string;
	body: string;
	media: string[];
}
export interface IPost extends IReceivedPostContent {
	postId: string;
	deleted: boolean;
}
export interface IPostForEditing {
	postId: string;
	newGameName: string;
	newTitle: string;
	newContent: string;
	newMedia: string; // Recieved from the client as a JSON string
	publisherId: string; // Recieved from the client as a string
}
