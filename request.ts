import { requestData } from "./type/type";

export function request() {
  const url =
    "https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available";

  const data = fetch(url)
    .then((responce) => responce.json())
    .then((data) => {
      console.log(data);
    })
    .then((error) => {
      console.log(error);
    });
}
