import { HttpConfig } from "../../constants/config/HttpConfig";

class HttpRequest {
  headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };

  constructor() {
    this.base_url = HttpConfig.domain;

    let token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : JSON.parse(sessionStorage.getItem("token")) ?? null;

    if (token) {
      this.headers = { ...this.headers, Authorization: "Bearer " + token };
    }
  }

  request(url, method = "GET", data = null) {
    const endpoint_url = `${this.base_url}/${url}`;
    const headers = this.headers;

    const options = {
      headers,
      method,
      // mode: "no-cors",
    };

    if (data) {
      options.body = JSON.stringify({ ...data });
    }

    return fetch(endpoint_url, options);
  }

  get(url) {
    return this.request(url, "GET")
      .then((res) => {
        if (!res.ok) {
          throw res;
        } else {
          return res.json();
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  post(url, data) {
    return this.request(url, "POST", data)
      .then((res) => {
        if (!res.ok) {
          throw res;
        } else {
          return res.json();
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  delete(url) {
    return this.request(url, "DELETE")
      .then((res) => {
        if (!res.ok) {
          throw res;
        } else {
          return res.json();
        }
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default HttpRequest;

export function Request() {
  return new HttpRequest();
}
