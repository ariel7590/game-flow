export interface IReceivedPostContent{
    creatorId: number;
	title: string;
	body: string;
	media: string[];
}
export interface IPost extends IReceivedPostContent{
    postId: string;
	deleted: boolean;
}