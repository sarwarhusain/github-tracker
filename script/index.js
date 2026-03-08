// loginPage

// const authentication = () => {
//   const inputName = document.getElementById("userName");
//   const userName = inputName.value;
//   const inputPass = document.getElementById("password");
//   const password = inputPass.value;

//   if (userName === "admin" && password === "admin123") {
//     document.getElementById("loginPage").classList.add("hidden");
//     document.getElementById("homePage").classList.remove("hidden");
//   } else {
//     alert("invalid");
//   }
// };
//
let issues = [];
const count = document.getElementById("count");
const createLabels = (arr) => {
  return arr
    .map(
      (el) =>
        `<span class="btn btn-sm border-b-cyan-600 m-1 bg-[#FFF8DB]">${el}</span>`,
    )
    .join("");
};
// spinner
const spinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("cardContainer").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("cardContainer").classList.remove("hidden");
  }
};
const loadAllIssues = () => {
  spinner(true);
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      issues = data.data;
      count.innerText = issues.length;
      displayCard(issues);
      displayCardBtn(issues);
    });
};

// const loadCard = (id) => {
//   fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
//     .then((res) => res.json())
//     .then((data) => {
//       displayCard(data);
//     });
// };

//buttons  toggling
const toggle = (id) => {
  document.getElementById("btnAll").classList.remove("btn-primary");
  document.getElementById("btnOpen").classList.remove("btn-primary");
  document.getElementById("btnClosed").classList.remove("btn-primary");
  document.getElementById(id).classList.add("btn-primary");
};

const toggling = () => {
  const isActive = document.querySelectorAll(".btnActive");
  isActive.classList.add("active");
};

const allTab = () => {
  count.innerText = issues.length;
  document.getElementById("openText").classList.remove("text-green-500");
  document.getElementById("closedText").classList.remove("text-purple-500");
  toggle("btnAll");
  displayCard(issues);
};
const openTab = () => {
  const statusOpen = issues.filter((issue) => issue.status === "open");
  count.innerText = statusOpen.length;

  const openColor = document.getElementById("openText");
  const closeColor = document.getElementById("closedText");

  openColor.classList.add("text-green-500");
  closeColor.classList.remove("text-purple-500");

  toggle("btnOpen");
  displayCard(statusOpen);
};
const closeTab = () => {
  const statusClose = issues.filter((issue) => issue.status === "closed");
  count.innerText = statusClose.length;

  const closeColor = document.getElementById("closedText");
  const openColor = document.getElementById("openText");
  closeColor.classList.add("text-purple-500");

  openColor.classList.remove("text-green-500");
  closeColor.classList.add("text-purple-500");

  toggle("btnClosed");
  displayCard(statusClose);
};

const displayCard = (items) => {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  items.forEach((item) => {
    const cardDiv = document.createElement("div");
    //default color
    let color = "";
    if (item.priority === "high") {
      color = "bg-red-300 ";
    } else if (item.priority === "low") {
      color = "bg-gray-200";
    } else {
      color = "bg-orange-200";
    }

    cardDiv.innerHTML = `
         <div class=" bg-base-100 md:w-72 lg:h-full shadow-sm rounded-lg ${item.status === "open" ? "border-t-4 border-green-500" : "border-t-4 border-purple-500"}">
            <div class="card-body ">
              <div class="flex justify-between">
                <button class="rounded-full m-2 btn border-t-cyan-600">${
                  item.status === "open"
                    ? `<img src="../assets/Open-Status.png" >`
                    : `<img src="../assets/Closed-Status.png">`
                }
                </button>
                <button  class="${color} rounded-full m-2 btn border-t-cyan-600">${item.priority} </button>
              </div>
              <h2 class="card-title text-[14px]">${item.title}</h2>
              <p class="text-[12px]">
                ${item.description}
              </p>
              <div class="card-actions gap-4 justify-between">
                <div class="text-[12px] "> ${createLabels(item.labels)}</div>
              </div>
              <div class="divider"></div>
              <div class="text-[12px] flex gap-4 justify-between">
                 <div class="">#${item.id} by ${item.author}</div>
                <div class="">${new Date(item.createdAt).toLocaleDateString()}</div>
              </div>
               
              <div class="card-actions text-[12px]  gap-4 justify-between">
                <div class="">${item.assignee ? item.assignee : "No Assignee"}</div>
                <div class="">${new Date(item.updatedAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>`;

    cardContainer.appendChild(cardDiv);
  });
  spinner(false);
};

const displayCardBtn = () => {
  const btnContainer = document.getElementById("btnContainer");
  btnContainer.innerHTML = "";
  const btnAll = document.createElement("div");
  btnAll.classList.add("space-x-10");
  btnAll.innerHTML = `
                  <button id="btnAll" onclick="allTab()" class="btn  btn-primary ">
                    All </button>
                  <button id="btnOpen" onclick="openTab()" class=" btn btn-primary ">
                    open
                  </button>
                  <button id="btnClosed" onclick="closeTab()" class=" btn btn-primary  ">
                    close
                  </button>
    `;

  btnContainer.appendChild(btnAll);
};
loadAllIssues();
