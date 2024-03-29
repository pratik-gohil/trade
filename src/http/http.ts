export default class HTTP {
  static async get({
    url,
    requestOptions = {},
  }: {
    url: string;
    requestOptions: any;
  }) {
    return await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => err);
  }

  static async post(
    url: string,
    requestOptions: any = {
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

  static async put({
    url,
    requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    },
  }: {
    url: string;
    requestOptions: any;
  }) {
    return await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => err);
  }

  static async delete({
    url,
    requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    },
  }: {
    url: string;
    requestOptions: any;
  }) {
    return await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => err);
  }
}
