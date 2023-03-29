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
loadData();

function loadData() {
  let my_list = localStorage.getItem("List");
  if (my_list !== null) {
    let arrList = JSON.parse(my_list);
    arrList.forEach((item) => {
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
        let doItem = k.target.parentElement;
        doItem.addEventListener("animationend", () => {
          let text = doItem.children[0].innerText;
          let myListArr = JSON.parse(localStorage.getItem("List"));
          myListArr.forEach((item, index) => {
            if (item.toDo == text) {
              myListArr.splice(index, 1);
              localStorage.setItem("List", JSON.stringify(myListArr));
            }
          });
          doItem.remove();
        });
        trashItem.style.animation = "scaleDown 0.5s forwards";
      });
      a_div.appendChild(checkIcon);
      a_div.appendChild(trashIcon);

      section.appendChild(a_div);
    });
  }
}

//演算法篩選
function mergeTime(arr1, arr2) {
  let result = [];
  let k = 0;
  let o = 0;

  while (k < arr1.length && o < arr2.length) {
    if (Number(arr1[k].toMonth) > Number(arr2[o].toMonth)) {
      result.push(arr2[o]);
      o++;
    } else if (Number(arr1[k].toMonth) < Number(arr2[o].toMonth)) {
      result.push(arr1[k]);
      k++;
    } else if (Number(arr1[k].toMonth) == Number(arr2[o].toMonth)) {
      if (Number(arr1[k].toDay) > Number(arr2[o].toDay)) {
        result.push(arr2[o]);
        o++;
      } else {
        result.push(arr1[k]);
        k++;
      }
    }
  }

  while (k < arr1.length) {
    result.push(arr1[k]);
    k++;
  }
  while (o < arr2.length) {
    result.push(arr2[o]);
    o++;
  }
  return result;
}

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    let mid = Math.floor(arr.length / 2);
    let right = arr.slice(0, mid);
    let left = arr.slice(mid, arr.length);
    return mergeTime(mergeSort(right), mergeSort(left));
  }
}

let sortBtn = document.querySelector("div.sort button");
sortBtn.addEventListener("click", () => {
  let sortArr = mergeSort(JSON.parse(localStorage.getItem("List")));
  localStorage.setItem("List", JSON.stringify(sortArr));

  //remove data
  let len = section.children.length;
  for (let i = 0; i < len; i++) {
    section.children[0].remove();
  }

  //load data
  loadData();
});
