import { createSelector } from "reselect";
import { AppState } from "../rootReducer";

export const isAuthenticatedSelector = createSelector((state: AppState) => state.auth.idToken, (auth) => auth !== null);
