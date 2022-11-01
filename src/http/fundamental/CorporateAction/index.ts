import HTTP from "../../http";

export const getCorporateAction = async ({ type, name }) => {
  return await HTTP.post(
    `${process.env.REACT_APP_FUNDAMENTAL_BASE_URL}/Fundamental/${type}/${name}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic U1c3NlE1SklBRDpsa3BAMTIz`,
      },
    }
  );
};
