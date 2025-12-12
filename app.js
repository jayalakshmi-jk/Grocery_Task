let btn = document.querySelector(".submit-btn");
let clear = document.querySelector(".clear-btn");

document.querySelector(".clear-btn").style.display = "none";

btn.addEventListener("click", (e) => {
  e.preventDefault();

  let input = document.getElementById("grocery").value.trim();
  if (input === "") {
    let alert = document.querySelector(".alert");
    document.querySelector(".alert").innerHTML = "Please Enter the Item!!!";

    alert.classList.add("alert-danger");
    alert.classList.remove(".alert-success ");

    document.getElementById("grocery").value = "";

    setTimeout(() => {
      document.querySelector(".alert").innerHTML = "";
      alert.classList.remove(".alert-danger");
    }, 2000);
  } else {
    let list = document.querySelector(".grocery-list");
    let li = document.createElement("li");

    li.classList.add("grocery-item");
    list.appendChild(li);

    li.innerHTML = ` <p class="text">${input}</p>
    <div><button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button></div>`;

    //store the data in localStorage
    let previous = JSON.parse(localStorage.getItem("items")) || [];
    // console.log(previous)
    previous.push(input);
    // console.log(previous)
    localStorage.setItem("items", JSON.stringify(previous));

    let edit = li.querySelector(".edit-btn");
    let del = li.querySelector(".delete-btn");

    //Edit Button
    edit.addEventListener("click", () => {
      let text = li.querySelector(".text");
      document.getElementById("grocery").value = text.textContent;
      btn.textContent = "Edit";
      li.remove();

      // SUCCESS message
      let alert = document.querySelector(".alert");
      alert.innerHTML = "Item Edited Successfully";
      alert.classList.add("alert-success");
      alert.classList.remove("alert-danger");

      setTimeout(() => {
        alert.innerHTML = "";
        alert.classList.remove("alert-success");
      }, 2000);
    });
    btn.textContent = "Submit";

    //Delete Button
    del.addEventListener("click", () => {
      li.remove();
    });

    //display success message
    document.getElementById("grocery").value = "";
    let alert = document.querySelector(".alert");
    document.querySelector(".alert").innerHTML = "Added Item Successfully";
    alert.classList.add("alert-success");
    alert.classList.remove("alert-danger");
    document.querySelector(".clear-btn").style.display = "block";

    setTimeout(() => {
      document.querySelector(".alert").innerHTML = "";
      alert.classList.remove("alert-success");
    }, 2000);

    //Clear the Items
    clear.addEventListener("click", () => {
      //  li.innerHTML = ""
      list.removeChild(li);
    });
  }
});
