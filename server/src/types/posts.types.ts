export interface IReceivedPostContent{
    publisher: string;
	title: string;
	body: string;
	media: string[];
}
export interface IPost extends IReceivedPostContent{
    postId: string;
	deleted: boolean;
}