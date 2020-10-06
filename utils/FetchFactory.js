import axios from "axios";

async function doFetch(url, method, bodyData) {
  const resp = axios(optionsFetch(url, method, bodyData));
  return resp;
}

function optionsFetch(url, method = "POST", bodyData) {
  const options = {
    url: url,
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: bodyData,
  };

  return options;
}

export { doFetch };
