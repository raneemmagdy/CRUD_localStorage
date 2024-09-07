var productNameInput=document.getElementById("productNameInput");
var productPriceInput=document.getElementById("productPriceInput");
var productCategoryInput=document.getElementById("productCategoryInput");
var productDescriptionInput=document.getElementById("productDescriptionInput");
var searchInput=document.getElementById("searchInput")
var addBtn=document.getElementById("addBtn")
var updateBtn=document.getElementById("updateBtn")
var alertName=document.getElementById("alertName")
var alertPrice=document.getElementById("alertPrice")
var alertCategory=document.getElementById("alertCategory")
var alertDescription=document.getElementById("alertDescription")
var productList=[];
var indexUpdate=0;
if(localStorage.getItem('Products')!= null){
  productList=JSON.parse(localStorage.getItem('Products'))
  displayData()
}






function AddProduct(){
  if(validationName() && validationPrice()&&validationCategory()&&validationDescription()){
    var product={
      productName:productNameInput.value,
      productPrice:productPriceInput.value,
      productCategory:productCategoryInput.value,
      productDescription:productDescriptionInput.value,
     }
    productList.push(product);
    localStorage.setItem('Products',JSON.stringify(productList))
  }
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


function validationName(){
  var text=productNameInput.value
  var regexName=/^[A-Z][a-z]{3,10}$/

  if(regexName.test(text)){
    productNameInput.classList.add('is-valid')
    productNameInput.classList.remove('is-invalid')
    alertName.classList.add('d-none')
    return true

  }else{
    alertName.classList.remove('d-none')
    productNameInput.classList.add('is-invalid')
    productNameInput.classList.remove('is-valid')
    return false
  }
}


function validationPrice(){
  var text=productPriceInput.value
  var regexName=/^([1-9][0-9]{0,6}|10000000)$/

  if(regexName.test(text)){
    productPriceInput.classList.add('is-valid')
    productPriceInput.classList.remove('is-invalid')
    alertPrice.classList.add('d-none')
    return true

  }else{
    alertPrice.classList.remove('d-none')
    productPriceInput.classList.add('is-invalid')
    productPriceInput.classList.remove('is-valid')
    return false
  }
}


function validationCategory(){
  var text=productCategoryInput.value
  var regexName=/^[A-Z][a-z]{3,20}$/

  if(regexName.test(text)){
    productCategoryInput.classList.add('is-valid')
    productCategoryInput.classList.remove('is-invalid')
    alertCategory.classList.add('d-none')
    return true

  }else{
    alertCategory.classList.remove('d-none')
    productCategoryInput.classList.add('is-invalid')
    productCategoryInput.classList.remove('is-valid')
    return false
  }
}
function validationDescription(){
  var text=productDescriptionInput.value
  var regexName=/^[a-z]{3,100}$/i

  if(regexName.test(text)){
    productDescriptionInput.classList.add('is-valid')
    productDescriptionInput.classList.remove('is-invalid')
    alertDescription.classList.add('d-none')
    return true

  }else{
    alertDescription.classList.remove('d-none')
    productDescriptionInput.classList.add('is-invalid')
    productDescriptionInput.classList.remove('is-valid')
    return false
  }
}