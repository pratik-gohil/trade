import HTTP from "../../http";

export const getCorporateAction = async ({ type, name }) => {
  return await HTTP.post(
    `http://api.lkp.net.in/CommonAPI_Test/Fundamental/${type}/${name}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic U1c3NlE1SklBRDpsa3BAMTIz`,
      },
    }
  );
};
