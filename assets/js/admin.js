//DOM DATA
const nameProduct = document.getElementById("name");
const descProduct = document.getElementById("description");
const brandProduct = document.getElementById("brand");
const imgProduct = document.getElementById("img");
const priceProduct = document.getElementById("price");
const form = document.getElementById("event-form");

//API
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const keyApi =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmI0YmY0YmQ0NzAwMTU4NWIxZWIiLCJpYXQiOjE3NjI1MDc1OTUsImV4cCI6MTc2MzcxNzE5NX0.M8nwzXbxPyuNyxY2Oj0qTF_vs-LNm9uJSZ4g59LrWm";

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    (this.name = _name),
      (this.description = _description),
      (this.brand = _brand),
      (this.imageUrl = _imageUrl),
      (this.price = _price);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameProduct.value;
  const description = descProduct.value;
  const brand = brandProduct.value;
  const imageUrl = imgProduct.value;
  const price = priceProduct.value;

  const newProd = new Product(name, description, brand, imageUrl, price);

  fetch(apiUrl, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmI0YmY0YmQ0NzAwMTU4NWIxZWIiLCJpYXQiOjE3NjI1MDc1OTUsImV4cCI6MTc2MzcxNzE5NX0.M8nwzXbxPyuNyxY2Oj0qTF_vs-LNm9uJSZ4g59LrWmI",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(newProd),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Risposta ok");
        console.log(response);

        form.reset();
        return response.json();
      } else {
        console.log("Errore nella risposta del server");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log("Errore nel caricamento", error);
    });
});
