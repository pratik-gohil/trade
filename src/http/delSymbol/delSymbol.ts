import { constants } from "../../constants/global";
const { TOKEN, USER_ID } = constants;

export const delSymbol = async ({
  groupName,
  exchangeInstrumentID,
  exchangeSegment,
  symbolExpiry,
}) => {
  return await fetch(
    `${
      process.env.REACT_APP_API_BASE_URL
    }/enterprise/group/symbols?userID=${localStorage.getItem(
      USER_ID
    )}&groupName=${groupName}&exchangeInstrumentID=${exchangeInstrumentID}&exchangeSegment=${exchangeSegment}&symbolExpiry=${symbolExpiry}
`,
    {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem(TOKEN) || "",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
};
