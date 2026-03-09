// loginPage

const authentication = () => {
  const inputName = document.getElementById("userName");
  const userName = inputName.value;
  const inputPass = document.getElementById("password");
  const password = inputPass.value;

  if (userName === "admin" && password === "admin123") {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("homePage").classList.remove("hidden");
  } else {
    alert("invalid Authentication");
  }
};
//
let issues = [];
const count = document.getElementById("count");
const createLabels = (arr) => {
  return arr
    .map(
      (el) =>
        `<span class="btn  btn-sm border-b-cyan-600 bg-[#FFF8DB]">${el}</span>`,
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

// details card
const getPriorityColor = (priority) => {
  if (priority === "high") {
    return "bg-red-300 ";
  } else if (priority === "low") {
    return "bg-gray-200";
  } else {
    return "bg-orange-200";
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

const loadCardDetails = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayCardDetails(details.data);
};

//buttons  toggling
const toggle = (id) => {
  document.getElementById("btnAll").classList.remove("btn-primary");
  document.getElementById("btnOpen").classList.remove("btn-primary");
  document.getElementById("btnClosed").classList.remove("btn-primary");

  document.getElementById(id).classList.add("btn-primary");
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

//card details
const displayCardDetails = (detail) => {
  // console.log(detail);
  const cardDetails = document.getElementById("modalContainer");
  cardDetails.innerHTML = "";
  const color = getPriorityColor(detail.priority);
  const author = detail.author
    ? detail.author.split("_").join(" ")
    : "No Author"; //using replace detail.author ? detail.author.replaceAll('_',' ') : 'no author'
  const assignee = detail.assignee
    ? detail.assignee.split("_").join(" ")
    : "No Assignee";

  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("space-y-5");
  detailsDiv.innerHTML = ` <h3 class="text-lg font-bold">${detail.title}</h3>
          <div class="flex items-center gap-5">
            <button class="${detail.status === "open" ? "bg-green-500 text-white" : "bg-purple-500 text-white"} rounded-xl  m-2 btn border-t-cyan-600">${detail.status}
                </button>
            <div class="flex gap-8">
              <li>Opened By ${author}</li>
              <li>${new Date(detail.createdAt).toLocaleDateString()}</li>
            </div>
          </div>
         <div class="card-actions gap-4 justify-between">
                <div class=""> ${createLabels(detail.labels)}</div>
              </div>
          <p>
           ${detail.description}
          </p>
          <div
            class="flex justify-between bg-[#F8FAFC] p-5 rounded-lg items-center"
          >
            <div>
              <h2 class="text-lg text-[#64748B]">Assignee:</h2>
              <p>${assignee}</p>
            </div>

            <div class="">
              <h2 class="text-lg text-[#64748B]">Priority:</h2>
               <button  class="${color} rounded-xl m-2 btn border-t-cyan-600 ">${detail.priority} </button>
            </div>
          </div>`;
  cardDetails.appendChild(detailsDiv);
  document.getElementById("modalDetails").showModal();
};

const displayCard = (items) => {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  items.forEach((item) => {
    const cardDiv = document.createElement("div");
    //default color
    const color = getPriorityColor(item.priority);
    cardDiv.innerHTML = `
         <div onclick="loadCardDetails(${item.id})" class=" bg-base-100 md:w-72 lg:h-full shadow-sm rounded-lg ${item.status === "open" ? "border-t-4 border-green-500" : "border-t-4 border-purple-500"}">
            <div class="card-body ">
              <div class="flex justify-between">
                <button class="rounded-xl m-2 btn border-t-cyan-600">${
                  item.status === "open"
                    ? `<img src="assets/OpenStatus.png" >`
                    : `<img src="assets/ClosedStatus.png">`
                }
                </button>
                <button  class="${color} rounded-xl m-2 btn border-t-cyan-600">${item.priority} </button>
              </div>
              <h2 class="card-title text-[14px]">${item.title}</h2>
              <p class="text-[12px]">
                ${item.description}
              </p>
              <div class="card-actions gap-4 justify-between">
                <div class=""> ${createLabels(item.labels)}</div>
              </div>
              <div class="divider"></div>
              <div class="flex gap-4 justify-between">
                 <div class="">#${item.id} by ${item.author}</div>
                <div class="">${new Date(item.createdAt).toLocaleDateString()}</div>
              </div>
               
              <div class="flex  text-[12px]  gap-4 justify-between">
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
  btnContainer.innerHTML = `
                  <button id="btnAll" onclick="allTab()" class="btn btn-primary ">
                    All 
                  </button>
                  <button id="btnOpen" onclick="openTab()" class="btn">
                    open
                  </button>
                  <button id="btnClosed" onclick="closeTab()" class="btn">
                    close
                  </button>
    `;
};
loadAllIssues();
document.getElementById("btnSearch").addEventListener("click", (e) => {
  e.preventDefault();
  const inputField = document.getElementById("inputSearch");
  const input = inputField.value.trim().toLowerCase();
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      const searchText = data.data || [];
      const filteredData = searchText.filter((title) =>
        title.title.toLowerCase().includes(input),
      );
      displayCard(filteredData);
      inputField.value = "";
    });
});
