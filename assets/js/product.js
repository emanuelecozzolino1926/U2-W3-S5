const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const keyApi =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmI0YmY0YmQ0NzAwMTU4NWIxZWIiLCJpYXQiOjE3NjI1MDc1OTUsImV4cCI6MTc2MzcxNzE5NX0.M8nwzXbxPyuNyxY2Oj0qTF_vs-LNm9uJSZ4g59LrWm";

const getData = () => {
  fetch(apiUrl, {
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
    .then((data) => {
      console.log(data);

      const prodRow = document.getElementById("prod-row");
      data.forEach((product) => {
        prodRow.innerHTML += `
        <div class="card" style="height: 100hv;">
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}<br>${product.brand} Prezzo: ${product.price} €</p>
                    <a href="/admin.html?id=${product._id}" class="btn btn-warning">Modifica</a>
                    <a href="/details.html?id=${product._id}" class="btn btn-primary">Dettagli</a>
                </div>
        </div>
        
        `;
      });
    })
    .catch((error) => {
      console.log(`Non riesco a collegarmi al server ${error}`);
    });
};

getData();
