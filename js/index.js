var productNameInput=document.getElementById("productNameInput");
var productPriceInput=document.getElementById("productPriceInput");
var productCategoryInput=document.getElementById("productCategoryInput");
var productDescriptionInput=document.getElementById("productDescriptionInput");
var searchInput=document.getElementById("searchInput")
var addBtn=document.getElementById("addBtn")
var updateBtn=document.getElementById("updateBtn")
var productList=[];
var indexUpdate=0;
if(localStorage.getItem('Products')!= null){
  productList=JSON.parse(localStorage.getItem('Products'))
  displayData()
}






function AddProduct(){
   var product={
    productName:productNameInput.value,
    productPrice:productPriceInput.value,
    productCategory:productCategoryInput.value,
    productDescription:productDescriptionInput.value,
   }
  productList.push(product);
  localStorage.setItem('Products',JSON.stringify(productList))
  clearInput();
  displayData()
  // console.log(productList);
}
function clearInput(){
    productNameInput.value='';
    productPriceInput.value='';
    productCategoryInput.value='';
    productDescriptionInput.value='';
}
function displayData(){
    var cartona='';
    for(var i=0;i< productList.length;i++){
        cartona+=`<tr>
              <td>${i+1}</td>
              <td>${productList[i].productName}</td>
              <td>${productList[i].productPrice}</td>
              <td>${productList[i].productCategory}</td>
              <td>${productList[i].productDescription}</td>
            <td>
              <button class="btn btn-danger"  onclick="deleteProduct(${i})">Delete</button>
              <button class="btn btn-warning" onclick="setData(${i})">Update</button>
            </td>

            </tr>`
    }
    document.getElementById('tableBody').innerHTML=cartona

}
function deleteProduct(id){
   productList.splice(id,1);
   localStorage.setItem('Products',JSON.stringify(productList))
   // console.log(productList);
   displayData()
}


function search(){
  var term=searchInput.value;
  
  var cartona='';
    for(var i=0;i< productList.length;i++){
      if(productList[i].productName.toLowerCase().includes(term.toLowerCase())){
        cartona+=`<tr>
        <td>${i+1}</td>
        <td>${productList[i].productName}</td>
        <td>${productList[i].productPrice}</td>
        <td>${productList[i].productCategory}</td>
        <td>${productList[i].productDescription}</td>
      <td>
        <button class="btn btn-danger"  onclick="deleteProduct(${i})">Delete</button>
        <button class="btn btn-warning" onclick="updateProduct(${i})">Update</button>
      </td>

      </tr>`
      }
    }
    document.getElementById('tableBody').innerHTML=cartona
}

function setData(id){
  indexUpdate=id;

  var currentProduct=productList[id];
  productNameInput.value=currentProduct.productName;
  productPriceInput.value=currentProduct.productPrice;
  productCategoryInput.value=currentProduct.productCategory;
  productDescriptionInput.value=currentProduct.productDescription;
  updateBtn.classList.remove('d-none')
  addBtn.classList.add('d-none')

}
function updateProduct(){
  var product={
    productName:productNameInput.value,
    productPrice:productPriceInput.value,
    productCategory:productCategoryInput.value,
    productDescription:productDescriptionInput.value,
   }
   productList.splice(indexUpdate,1,product)
   localStorage.setItem("Products",JSON.stringify(productList))
   displayData();
   clearInput();
   updateBtn.classList.add('d-none')
   addBtn.classList.remove('d-none')
}