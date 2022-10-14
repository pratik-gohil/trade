import { constants } from "../../constants/global";
import HTTP from "../http";

export const encrypt_decrypt = async ({ data, type }) => {
  return await HTTP.post(
    "http://api.lkp.net.in/commonAPI_test/HDFCCrypto/EncryptDecrypt",
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
