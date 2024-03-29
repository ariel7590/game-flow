export function paginate(pageNumber: number, itemsPerPage?: number) {
	const perPage = itemsPerPage || 10;
	const page = pageNumber || 1;
	const skip = perPage * page - perPage;
	return {
		skip,
		perPage,
	};
}
