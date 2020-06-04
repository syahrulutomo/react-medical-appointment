export const SELECT_SPESIALISASI = "SELECT_SPESIALISASI";

export const selectSpesialisasi = (data) => {
  return{
    type: SELECT_SPESIALISASI,
    payload: data,
  };
};