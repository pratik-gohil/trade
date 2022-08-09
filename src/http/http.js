export default class HTTP {
  constructor() {}

  static async get({ url, requestOptions = {} }) {
    return await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => err);
  }

  static async post(
    url,
    requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ) {
    return await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => err);
  }
}
