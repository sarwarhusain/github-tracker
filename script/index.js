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

const loadAllIssues = (id) => {
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
//button toggling

const toggle = (id) => {
  document.getElementById("btnAll").classList.remove("btn-primary");
  document.getElementById("btnOpen").classList.remove("btn-primary");
  document.getElementById("btnClosed").classList.remove("btn-primary");

  document.getElementById(id).classList.add("btn-primary");
};

const allTab = () => {
  count.innerText = issues.length;
  toggle("btnAll");
  displayCard(issues);
};
const openTab = () => {
  const statusOpen = issues.filter((issue) => issue.status === "open");
  count.innerText = statusOpen.length;
  toggle("btnOpen");
  displayCard(statusOpen);
};
const closeTab = () => {
  const statusClose = issues.filter((issue) => issue.status === "closed");
  count.innerText = statusClose.length;
  toggle("btnClosed");
  displayCard(statusClose);
};

const displayCard = (items) => {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";
  items.forEach((item) => {
    const colorStatus =
      item.status === "open"
        ? "border-t-4 border-green-500"
        : "border-t-4 border-purple-500";

    const cardDiv = document.createElement("div");

    cardDiv.innerHTML = `
    
         <div class=" bg-base-100 md:w-72 lg:h-full shadow-sm rounded-lg ${colorStatus}">
            <div class="card-body ">
              <div class="flex justify-between">
                <button class="rounded-full m-2 btn border-t-cyan-600">Right</button>
                <button class="rounded-full m-2 btn border-t-cyan-600">${item.priority}</button>
              </div>
              <h2 class="card-title text-[14px]">${item.title}</h2>
              <p class="text-[12px]">
                ${item.description}
              </p>
              <div class="card-actions gap-4 justify-between">
                <div class="text-[12px] ">${createLabels(item.labels)}</div>
              </div>
              <div class="divider"></div>
              <div class="text-[12px]  grid grid-cols-12 gap-4 justify-between">
                 <div class="col-span-6">#${item.id} by ${item.author}</div>
                <div class="col-span-6">${new Date(item.createdAt).toLocaleDateString()}</div>
              </div>
               
              <div class="card-actions text-[12px]  gap-4 justify-between">
                <div class="">${item.assignee ? item.assignee : "No Assignee"}</div>
                <div class="">${new Date(item.updatedAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>`;
    cardContainer.appendChild(cardDiv);
  });
};

const displayCardBtn = (issues) => {
  const btnContainer = document.getElementById("btnContainer");
  btnContainer.innerHTML = "";
  console.log(issues);
  const btnAll = document.createElement("div");
  btnAll.classList.add("space-x-10");
  btnAll.innerHTML = `
                  <button id="btnAll" onclick="allTab()" class="btn  btn-primary ">
                    All </button>
                  <button id="btnOpen" onclick="openTab()" class=" btn btn-primary ">
                    open
                  </button>
                  <button id="btnClosed" onclick="closeTab()" class="btn btn-primary  ">
                    close
                  </button>
    `;

  btnContainer.appendChild(btnAll);
};
loadAllIssues();
