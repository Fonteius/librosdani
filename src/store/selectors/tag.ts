import { createSelector } from "reselect";
import { AppState } from "src/store/rootReducer";

export const tagsSelector = createSelector((state: AppState) => state.tags.tags, (tags) => tags);