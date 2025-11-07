//DOM DATA
const nameProduct = document.getElementById("name");
const descProduct = document.getElementById("description");
const brandProduct = document.getElementById("brand");
const imgProduct = document.getElementById("img");
const priceProduct = document.getElementById("price");
const form = document.getElementById("event-form");
const resetBtn = document.getElementById("resetBtn");

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

//CREAZIONE PRODOTTO
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !nameProduct.value.trim() ||
    !descProduct.value.trim() ||
    !brandProduct.value.trim() ||
    !imgProduct.value.trim() ||
    !priceProduct.value.trim()
  ) {
    alert("Compila tutti i campi prima di procedere");
    return;
  }
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
        console.log(`Response ok status: ${response.status}`);

        form.reset();
        return response.json();
      } else {
        throw new Error(`Il server non risponde status ${response.status}`);
      }
    })
    .then((products) => {
      prodTotal.innerText(`Test ${products.length}`);
    })
    .catch((error) => {
      console.log(`Non riesco a collegarmi al server ${error}`);
    });
});

//ELIMINAZIIONE PRODOTTO
const url = window.location.search;

const urlId = new URLSearchParams(url);
const prodId = urlId.get("id");
console.log("id", prodId);

const delBtn = document.querySelector(".btn-danger");
const editBtn = document.querySelector(".btn-warning");

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
    })
    .catch((error) => {
      console.log(`Non riesco a collegarmi al server ${error}`);
    });
};
getData();

delBtn.addEventListener("click", () => {
  const conferma = confirm("Vuoi davvero eliminare questo prodotto?");
  if (!conferma) return;
  fetch(apiUrl + "/" + prodId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmI0YmY0YmQ0NzAwMTU4NWIxZWIiLCJpYXQiOjE3NjI1MDc1OTUsImV4cCI6MTc2MzcxNzE5NX0.M8nwzXbxPyuNyxY2Oj0qTF_vs-LNm9uJSZ4g59LrWmI",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert("Elimianto");
        window.location.href = "/product.html";
      } else {
        throw new Error(`Il server non risponde status ${response.status}`);
      }
    })
    .catch((error) => {
      console.log(`Non riesco a collegarmi al server ${error}`);
    });
});

// MODIFICA

// MODIFICA

if (prodId) {
  fetch(apiUrl + "/" + prodId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmI0YmY0YmQ0NzAwMTU4NWIxZWIiLCJpYXQiOjE3NjI1MDc1OTUsImV4cCI6MTc2MzcxNzE5NX0.M8nwzXbxPyuNyxY2Oj0qTF_vs-LNm9uJSZ4g59LrWmI",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Il server non risponde status ${response.status}`);
      }
    })
    .then((editData) => {
      nameProduct.value = editData.name;
      descProduct.value = editData.description;
      brandProduct.value = editData.brand;
      imgProduct.value = editData.imageUrl;
      priceProduct.value = editData.price;

      editBtn.addEventListener("click", () => {
        const updated = new Product(
          nameProduct.value,
          descProduct.value,
          brandProduct.value,
          imgProduct.value,
          priceProduct.value
        );

        fetch(apiUrl + "/" + prodId, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmI0YmY0YmQ0NzAwMTU4NWIxZWIiLCJpYXQiOjE3NjI1MDc1OTUsImV4cCI6MTc2MzcxNzE5NX0.M8nwzXbxPyuNyxY2Oj0qTF_vs-LNm9uJSZ4g59LrWmI",
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(updated),
        })
          .then((response) => {
            if (response.ok) {
              alert("Modificato");
              return response.json();
            } else {
              throw new Error(
                `Il server non risponde status ${response.status}`
              );
            }
          })
          .then(() => {
            window.location.href = "/product.html";
          })
          .catch((error) => {
            console.log(`Non riesco a collegarmi al server ${error}`);
          });
      });
    })
    .catch((error) => {
      console.log(`Non riesco a collegarmi al server ${error}`);
    });
}

resetBtn.addEventListener("click", (e) => {
  const conferma = confirm("Sei sicuro di voler resettare il form?");
  if (!conferma) e.preventDefault();
});
