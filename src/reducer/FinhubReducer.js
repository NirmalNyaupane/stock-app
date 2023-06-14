export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        responseData: action.payload.data,
        isLoading: false,
      };

    case "ERROR":
      return {
        ...state,
        isError: true,
        isLoading:false,
        errMsg: action.payload,
      };
    case "ADD_STOCK":
      return {
        ...state,
        isLoading:false,
        isError:false,
        responseData: [...state.responseData, action.payload.data],
      };
    case "LOADING_DATA":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export const stockReducer = (state, action) => {
  switch (action.type) {
    case "STOCK_FETCH_DATA":
      return {
        ...state,
        isLoading: false,
        responseData: action.payload,
      };
    case "STOCK_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCHING_DATA":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
