import { encrypt_decrypt } from "./encrypt";
import HTTP from "../http";

export const verify_vpa = async ({
  PGMerchantId = "HDFC000000000828",
  MerchantRefNo = "100",
  VPA = "tradetrade@hdfcbank",
  Status = "T",
}) => {
  const params = `${PGMerchantId}|${MerchantRefNo}|${VPA}|${Status}|||||||||NA|NA`;

  const encrypted_params = await encrypt_decrypt({ data: params, type: "E" });

  const data = await HTTP.get({
    url: `${process.env.REACT_APP_API_HDFC_UPI_BASE_URL}/checkMeVirtualAddress`,
    requestOptions: {
      body: encrypted_params.data,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  const decryped_data = encrypt_decrypt({ data, type: "D" });

  return decryped_data;
};
