const inputBox = document.querySelector(".list-box input");
const addbtn = document.querySelector(".list-box button");
const listitems = document.querySelector(".listitems");
const deleteAllbtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  let userData = inputBox.value;
  if (userData.trim() !== "") {
    addbtn.classList.add("active");
  } else {
    addbtn.classList.remove("active");
  }
};

showtasks();

addbtn.onclick = () => {
  let userData = inputBox.value;
  let getlocalstorage = localStorage.getItem("new todo");
  let listArr = getlocalstorage ? JSON.parse(getlocalstorage) : [];
  listArr.push(userData);
  localStorage.setItem("new todo", JSON.stringify(listArr));
  showtasks();
};

function showtasks() {
  let getlocalstorage = localStorage.getItem("new todo");
  let listArr = getlocalstorage ? JSON.parse(getlocalstorage) : [];

  const pendingnumb = document.querySelector(".pendingnumb");
  pendingnumb.textContent = listArr.length;

  if (listArr.length > 0) {
    deleteAllbtn.classList.add("active");
  } else {
    deleteAllbtn.classList.remove("active");
  }

  let newLitag = "";
  listArr.forEach((element, index) => {
    newLitag += `<li>${element}<span onclick="deletetask(${index})"><i class="fa-solid fa-trash"></i></span></li>`;
  });

  listitems.innerHTML = newLitag;
  inputBox.value = "";
  addbtn.classList.remove("active");
}

function deletetask(index) {
  let getlocalstorage = localStorage.getItem("new todo");
  let listArr = JSON.parse(getlocalstorage);
  listArr.splice(index, 1);
  localStorage.setItem("new todo", JSON.stringify(listArr));
  showtasks();
}

deleteAllbtn.onclick = () => {
  localStorage.setItem("new todo", JSON.stringify([]));
  showtasks();
};
