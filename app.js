let alert = document.querySelector(".alert");
let form = document.querySelector(".grocery-form");
let btn = document.querySelector(".submit-btn");
let input = document.getElementById("grocery");
let list = document.querySelector(".grocery-list");
let clear = document.querySelector(".clear-btn");

clear.style.display = "none";

window.onload = () => {
  let i = getStorage();
  i.forEach((e) => {
    createList(e.id, e.val);
  });
};

let editFlag = false;
let editEl;
let editId = "";

form.addEventListener("submit", addItem);
clear.addEventListener("click", clearItem);

//add item
function addItem(e) {
  e.preventDefault();
  let input = document.getElementById("grocery");
  let val = input.value;
  // console.log(val);

  let id = Date.now();
  // console.log(id);

  if (val && !editFlag) {
    addStorage(id, val);
    createList(id, val);
    setDefault();
    disAlert("Item Added Successfully!!", "alert-success");
    clear.style.display = "block";
  } else if (val && editFlag) {
    editEl.innerHTML = val;

    let items = getStorage();
    items.forEach((i) => {
      if (editId == i.id) {
        i.val = input.value;
      }
    });
    localStorage.setItem("items", JSON.stringify(items));
    disAlert("Updated Successfully!!", "alert-success");
    setDefault();
  } else {
    disAlert("Please Enter the Item!!", "alert-danger");
  }
  input.value = "";
}

//clear items
function clearItem() {
  localStorage.removeItem("items");
  list.innerHTML = "";
  disAlert("Empty List!!", "alert-danger");
}

//alert message
function disAlert(message, type) {
  alert.innerHTML = message;
  alert.classList.add(type);

  setTimeout(() => {
    alert.innerHTML = "";
    alert.classList.remove(type);
  }, 3000);
}

function createList(id, val) {
  let el = document.createElement("article");
  el.setAttribute("data-id", id);
  el.classList.add("grocery-item");

  el.innerHTML = `
  <p class="title">${val}</p>
  <div >
  <button class="edit"><img src="edit.svg"></button>
  <button class="del"><img src="trash-2.svg"></button>
  </div>`;
  let edit = el.querySelector(".edit");
  let del = el.querySelector(".del");

  edit.addEventListener("click", editItem);
  del.addEventListener("click", delItem);

  list.appendChild(el);
}

function editItem(e) {
  let data = e.currentTarget.parentElement.parentElement;
  // console.log(data);
  editEl = data.querySelector(".title");
  document.getElementById("grocery").value = editEl.innerHTML;

  // console.log(editId);
  // editEl.innerHTML = input.value
  editFlag = true;
  editId = data.dataset.id;
  btn.textContent = "Edit";

  // setDefault()
}

// function editStorage(id,val){
//   let da = getStorage()
//   for(let i=0;i<da.length;i++){
//     if(da.id==id){
//       da.val=val
//        localStorage.setItem("items", JSON.stringify(da));

//     }
//   }
//   return da

// }

function delItem(e) {
  let item = e.currentTarget.parentElement.parentElement;
  // console.log(item);
  let d = getStorage();
  let did = Number(item.dataset.id);
  //  console.log(did);

  for (i = 0; i < d.length; i++) {
    if (d[i].id == did) {
      d.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("items", JSON.stringify(d));
  //ui delete
  item.remove();

  disAlert("Item Deleted Successfully!!", "alert-success");
}

function setDefault() {
  editFlag = false;
  editId = "";
  btn.textContent = "Submit";
}

function getStorage() {
  return JSON.parse(localStorage.getItem("items")) || [];
}
function addStorage(id, val) {
  let item = getStorage();
  let obj = { id, val };
  item.push(obj);
  localStorage.setItem("items", JSON.stringify(item));
}
