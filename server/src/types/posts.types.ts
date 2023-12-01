export interface IReceivedPostContent{
    creatorId: number;
	body: string;
	media: string[];
}
export interface IPost extends IReceivedPostContent{
    postId: string;
	deleted: boolean;
}