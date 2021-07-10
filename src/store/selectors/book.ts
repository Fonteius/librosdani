import { createSelector } from "reselect";
import { AppState } from "src/store/rootReducer";

export const booksSelector = createSelector((state: AppState) => state.books, (books) => books);
export const bookSelector = createSelector((state: AppState) => state.books.book, (book) => book);
export const isBookLoadingSelector = createSelector((state: AppState) => state.books.loading, (loading) => loading);