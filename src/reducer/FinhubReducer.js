export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        responseData:action.payload.data,
      };
    
    case "ERROR":
    return{
        ...state, 
        isError:true,
        errMsg:action.payload
    }
    case "ADD_STOCK":
      return{
        ...state,
        responseData:[...state.responseData, action.payload.data]
      }
    default:
      return state;
  }
};

export const stockReducer = (state, action)=>{
  switch(action.type){
    case "STOCK_FETCH_DATA":
      return{
        ...state,
        isLoading:false,
        responseData:action.payload
      }
    case "STOCK_LOADING":
      return{
        ...state,
        isLoading:true
      }
      
      default:
        return state
  }
}