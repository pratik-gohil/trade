import { encrypt_decrypt } from "./encrypt";
import HTTP from "../http";

// PGMerchantId|OrderNo|PayerVA| Amount|Remarks|expValue|MCC Code|1|2|3|4|5|6|7|8|NA|NA
export const meTransCollectSvc = async ({
  PGMerchantId = "HDFC000000000828",
  OrderNo = "100",
  VPA = "tradetrade@hdfcbank",
  Amount = "",
  Remarks = "",
  ExpiryValue = "",
}) => {
  const params = `${PGMerchantId}|${OrderNo}|${VPA}|${Amount}|${Remarks}|${ExpiryValue}|6012|||||||||NA|NA`;

  const encrypted_params = await encrypt_decrypt({ data: params, type: "E" });

  const data = await HTTP.get({
    url: `${process.env.REACT_APP_API_HDFC_UPI_BASE_URL}/checkMeVirtualAddress`,
    requestOptions: {
      body: encrypted_params.data,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      httpsAgent: { rejectUnauthorized: false },
    },
  });

  console.log(data);

  // const decryped_data = encrypt_decrypt({ data, type: "D" });

  // return decryped_data;
};
