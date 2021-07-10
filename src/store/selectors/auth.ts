import { createSelector } from "reselect";
import { AppState } from "src/store/rootReducer";

export const isAuthenticatedSelector = createSelector((state: AppState) => state.auth.idToken, (auth) => auth !== null);
export const isAuthLoadingSelector = createSelector((state: AppState) => state.auth.loading, (loading) => loading);
export const idTokenSelector = createSelector((state: AppState) => state.auth.idToken, (idToken) => idToken);
export const authSelector = createSelector((state: AppState) => state.auth, (auth) => auth);