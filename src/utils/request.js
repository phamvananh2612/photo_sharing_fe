const API_DOMAIN = "http://localhost:4000/";

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
    const response = await fetch(API_DOMAIN + path, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });
    const result = await response.json();
    return { ok: response.ok, status: response.status, data: result };
  } catch (error) {
    throw new Error(`Lỗi khi gửi yêu cầu: ${error.message}`);
  }
};

//[PATCH]
export const path = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
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
