let addProductButton = document.getElementById('addProductButton');
let updateProductButton = document.getElementById('updateProductButton');
let productNameInput = document.getElementById('productNameInput');
let productPriceInput = document.getElementById('productPriceInput');
let productCategoryInput = document.getElementById('productCategoryInput');
let productDescriptionInput = document.getElementById(
  'productDescriptionInput'
);
let tablData = document.getElementById('tableBody');
let deleteBtn = document.getElementById('delete__Btn');
// let searchInput = document.getElementById("search");
let productContainer;
if (localStorage.getItem('myProducts') != null) {
  productContainer = JSON.parse(localStorage.getItem('myProducts'));
  displayProducts(productContainer);
} else {
  productContainer = [];
}

function clearForm() {
  productNameInput.value = '';
  productPriceInput.value = '';
  productCategoryInput.value = '';
  productDescriptionInput.value = '';
}

function addProduct() {
  let product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescriptionInput.value,
  };
  productContainer.push(product);
  localStorage.setItem('myProducts', JSON.stringify(productContainer));
  clearForm();
  displayProducts(productContainer);
}



function displayProducts(productList) {
  let container = ``;
  for (let i = 0; i < productList.length; i++) {
    container += `<tr>
        <td> ${i} </td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td><button onclick="updateProducts(${i})" class="btn btn-sm btn-outline-warning">update</button></td>
        <td><button onclick="deleteProducts(${i})" class="btn btn-sm btn-outline-danger" >delete</button></td>
    </tr>`;
  }
  tablData.innerHTML = container;
}


function searchProducts(searchTerm) {
  // let searchTerm = searchInput.value;
  let searchResult = [];
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true
    ) {
      searchResult.push(productContainer[i]);
    }
  }
  displayProducts(searchResult);
}


function deleteProducts(deletedIndex) {
  productContainer.splice(deletedIndex, 1);
  localStorage.setItem('myProducts', JSON.stringify(productContainer));
  displayProducts(productContainer);
}

// const deletedItem = deleteProducts();
// deleteBtn.addEventListener('click',deleteProducts)


let indexToUpdate;
function updateProducts(updatedIndex) {
    indexToUpdate = updatedIndex;
  productNameInput.value = productContainer[updatedIndex].name;
  productPriceInput.value = productContainer[updatedIndex].price;
  productCategoryInput.value = productContainer[updatedIndex].category;
  productDescriptionInput.value = productContainer[updatedIndex].desc;

  updateProductButton.classList.replace('d-none', 'd-inline-block');
  addProductButton.classList.add('d-none');

}


function updateProduct() {
  productContainer[indexToUpdate].name = productNameInput.value;
  productContainer[indexToUpdate].price = productPriceInput.value;
  productContainer[indexToUpdate].category = productCategoryInput.value;
  productContainer[indexToUpdate].desc = productDescriptionInput.value;

  localStorage.setItem('myProducts', JSON.stringify(productContainer));
  console.log(productContainer);
  displayProducts(productContainer);
  clearForm();
}

addProductButton.addEventListener('click', addProduct);
updateProductButton.addEventListener('click',  updateProduct);
