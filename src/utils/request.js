const API_DOMAIN = process.env.REACT_APP_API_DOMAIN || "http://localhost:4000/";

//[GET]
export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "GET",
    credentials: "include",
  });
  const result = await response.json();
  return result;
};

//[POST]
export const post = async (path, options) => {
  try {
    let body;
    let headers = { Accept: "application/json" };

    //  nếu option là Formdata thì ko set content-type
    if (options instanceof FormData) {
      body = options;
    } else {
      // nếu options là object thì gửi JSON
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(options);
    }
    const response = await fetch(API_DOMAIN + path, {
      method: "POST",
      credentials: "include",
      headers,
      body,
    });
    const result = await response.json();
    return { ok: response.ok, status: response.status, data: result };
  } catch (error) {
    throw new Error(`Lỗi khi gửi yêu cầu: ${error.message}`);
  }
};

//[PATCH]
export const patch = async (path, options) => {
  try {
    let body;
    let headers = { Accept: "application/json" };

    //  nếu option là Formdata thì ko set content-type
    if (options instanceof FormData) {
      body = options;
    } else {
      // nếu options là object thì gửi JSON
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(options);
    }
    const response = await fetch(API_DOMAIN + path, {
      method: "PATCH",
      credentials: "include",
      headers,
      body,
    });
    const result = await response.json();
    return { ok: response.ok, status: response.status, data: result };
  } catch (error) {
    throw new Error(`Lỗi khi gửi yêu cầu: ${error.message}`);
  }
};

//[DELETE]
export const del = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE",
    credentials: "include",
  });

  const result = await response.json();
  return result;
};
