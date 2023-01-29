let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", (e) => {
  e.preventDefault(); //避免資料被送出 因為預設是送出

  let pForm = e.target.parentElement; //取得了這個form
  let toDo = pForm.children[0].value; //我需要這個小孩索引第一個的值
  let toMonth = pForm.children[1].value;
  let toDay = pForm.children[2].value;

  if (toDo === "" || toMonth === "" || toDay === "") {
    alert("Please input some lists and dates.");
    return;
  }
  //create item
  let a_div = document.createElement("div");
  a_div.classList.add("todo");
  let a_pragraph = document.createElement("p");
  a_pragraph.classList.add("todoList");
  a_pragraph.innerText = toDo;
  let a_time = document.createElement("p");
  a_time.classList.add("todoTime");
  a_time.innerText = toMonth + "/" + toDay;

  //再來要appen到section裡面
  a_div.appendChild(a_pragraph);
  a_div.appendChild(a_time);

  //新增icon 在JS裡做
  let checkIcon = document.createElement("button");
  checkIcon.classList.add("check");
  checkIcon.innerHTML = '<i class="fa-solid fa-check"></i>'; //這裡要放一個字串
  checkIcon.addEventListener("click", (e) => {
    let doItem = e.target.parentElement;
    doItem.classList.toggle("done");
  });

  let trashIcon = document.createElement("button");
  trashIcon.classList.add("trash");
  trashIcon.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashIcon.addEventListener("click", (k) => {
    let trashItem = k.target.parentElement;
    trashItem.addEventListener("animationend", () => {
      trashItem.remove();
    });
    trashItem.style.animation = "scaleDown 0.5s forwards";
  });
  a_div.appendChild(checkIcon);
  a_div.appendChild(trashIcon);
  a_div.style.animation = "scaleUp 0.5s forwards";
  //create object, need a name and value?
  let my_list = {
    toDo: toDo,
    toMonth: toMonth,
    toDay: toDay,
  };
  //set a local storage
  let dailyToDO = localStorage.getItem("List");
  if (dailyToDO == null) {
    localStorage.setItem("List", JSON.stringify([my_list])); //我需要一個object放進去Array
  } else {
    let arrList = JSON.parse(dailyToDO);
    arrList.push(my_list);
    localStorage.setItem("List", JSON.stringify(arrList));
  }
  pForm.children[0].value = "";
  section.appendChild(a_div);
});
