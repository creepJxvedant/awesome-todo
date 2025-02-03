let data = JSON.parse(localStorage.getItem("my-data")) || [];

function getData() {
  const title = document.getElementById("textbox").value.trim();
  const date = document.getElementById("calender-box").value.trim();

  if (title && date) {
    SetItem(data.length, false, title, date);
    document.getElementById("textbox").value = "";
    document.getElementById("calender-box").value = "";
  } else {
    alert("Please fill in all fields.");
  }
}

function SetItem(idx, ischecked, title, date) {
  const currentdata = { idx, ischecked, title, date };
  data.push(currentdata);
  storageUpdate(data);
}

function storageUpdate(currentdata) {
  localStorage.setItem("my-data", JSON.stringify(currentdata));
  listAdd();
}

function listAdd() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  data.forEach((list) => {
    const li = document.createElement("li");
    li.className = list.ischecked ? "checked" : "";

    li.innerHTML = `
            <div class="checkbox-wrapper">
                <input type="checkbox" id="task-${list.idx}" ${
      list.ischecked ? "checked" : ""
    } onchange="updateList(${list.idx})">
                <label for="task-${list.idx}"></label>
            </div>
            <div class="task-content">
                <div class="task-title">${list.title}</div>
                <div class="task-date">${list.date}</div>
            </div>
            <button class="btn delete-btn" onclick="deleteList(${
              list.idx
            })">Delete</button>
        `;

    todoList.appendChild(li);
  });
}

function deleteList(index) {
  data = data.filter((item) => item.idx !== index);
  data.forEach((item, i) => (item.idx = i));
  storageUpdate(data);
}

function updateList(index) {
  const item = data.find((item) => item.idx === index);
  if (item) {
    item.ischecked = !item.ischecked;
    storageUpdate(data);
  }
}

listAdd();
