export const SELECT_LOCATION = "SELECT_LOCATION";

export const selectLocation = (data) => {
  return{
    type: SELECT_LOCATION,
    payload: data,
  };
};