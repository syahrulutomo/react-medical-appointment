export const SELECT_DOKTER = "SELECT_DOKTER";

export const selectDokter = (data) => {
  return{
    type: SELECT_DOKTER,
    payload: data,
  };
};