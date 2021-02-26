export const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TEXT":
      return {
        searchText: action.searchText,
      };
    default:
      return state;
  }
};
