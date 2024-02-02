export function paginate(pageNumber: number) {
	const perPage = 10;
	const page = pageNumber || 1;
	const skip = perPage * page - perPage;
	return {
		skip,
		perPage,
	};
}
