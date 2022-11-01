import { constants } from "../../constants/global";
import HTTP from "../http";

export const encrypt_decrypt = async ({ data, type }) => {
  return await HTTP.post(
    `${process.env.REACT_APP_FUNDAMENTAL_BASE_URL}/HDFCCrypto/EncryptDecrypt`,
    {
      method: "POST",
      body: JSON.stringify({
        type,
        data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
