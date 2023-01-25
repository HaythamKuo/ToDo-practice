let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", (e) => {
  e.preventDefault(); //避免資料被送出 因為預設是送出

  let pForm = e.target.parentElement; //取得了這個form
  let toDo = pForm.children[0].value; //我需要這個小孩索引第一個的值
  let toMonth = pForm.children[1].value;
  let toDay = pForm.children[2].value;
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
  section.appendChild(a_div);
});
