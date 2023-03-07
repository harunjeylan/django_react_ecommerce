import store from "../../app/store";
import { refreshAccessToken } from "../../app/api/authApi";

export const uploadImage = async ({ post }) => {
  let headers = {}; //"Content-Type": "application/json; charset=UTF-8";
  const token = store.getState().auth.token;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  let response = await fetch(
    "http://127.0.0.1:8000/api/products/images/upload/",
    {
      method: "POST",
      headers,
      body: post,
    }
  );
  let data = await response.json();
  if (response.status === 200) {
    return data;
  } else if (response.status === 401) {
    refreshAccessToken(store);
  }
  return data;
};
