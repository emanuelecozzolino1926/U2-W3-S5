const url = window.location.search;
const urlId = new URLSearchParams(url);
const prodId = urlId.get("id");

const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";

const getData = () => {
  fetch(apiUrl + "/" + prodId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmI0YmY0YmQ0NzAwMTU4NWIxZWIiLCJpYXQiOjE3NjI1MDc1OTUsImV4cCI6MTc2MzcxNzE5NX0.M8nwzXbxPyuNyxY2Oj0qTF_vs-LNm9uJSZ4g59LrWmI",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Response ok status: ${response.status}`);
        return response.json();
      } else {
        throw new Error(`Il server non risponde status ${response.status}`);
      }
    })
    .then((idData) => {
      console.log(idData);

      document.getElementById("name").innerText = idData.name;
      document.getElementById("description").innerText = idData.description;
      document.getElementById("price").innerText = idData.price + " €";

      document
        .querySelector(".card-img-top")
        .setAttribute("src", idData.imageUrl);
    })
    .catch((error) => {
      console.log(`Non riesco a collegarmi al server ${error}`);
    });
};
getData();
