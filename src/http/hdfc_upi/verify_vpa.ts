import HTTP from "../http";

export const verify_vpa = async () => {
  return await HTTP.get({
    url: `${process.env.REACT_APP_API_HDFC_UPI_BASE_URL}/checkMeVirtualAddress`,
    requestOptions: {},
  });
};
