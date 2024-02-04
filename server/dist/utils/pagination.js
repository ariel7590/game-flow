"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
function paginate(pageNumber, itemsPerPage) {
    const perPage = itemsPerPage || 10;
    const page = pageNumber || 1;
    const skip = perPage * page - perPage;
    return {
        skip,
        perPage,
    };
}
exports.paginate = paginate;
