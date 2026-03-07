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

const loadAllIssues = () => {
  fetch("../public/public.json")
    .then((res) => res.json())
    .then((data) => {
      issues = data.data;
      displayCardBtn(issues);
    });
};
const loadAllCards = () => {
  fetch("../public/public.json")
    .then((res) => res.json())
    .then((data) => {
      displayCard(data.data);
    });
};
//display Card
const loadCard = (id) => {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayCard(data);
    });
};
//showOpen close

const showOpen = () => {
  const statusOpen = issues.filter((issue) => issue.status === "open");
  displayCard(statusOpen);
  console.log(statusOpen);
};
const showClose = () => {
  const statusClose = issues.filter((issue) => issue.status === "closed");

  displayCard(statusClose);
  console.log(statusClose);
};

// assignee: "";
// author: "shortcuts_shawn";
// createdAt: "2024-01-30T10:15:00Z";
// description: "Implement keyboard shortcuts for common actions to improve productivity for power users.";
// id: 27;
// labels: ["enhancement"];
// priority: "low";
// status: "open";
// title: "Add keyboard shortcuts";
// updatedAt: "2024-01-30T10:15:00Z";
const displayCard = (issuesCards) => {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";
  issuesCards.forEach((issueCard) => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `<div class="card bg-base-100  shadow-sm">
            <div class="card-body">
              <div class="flex justify-between">
                <button>round</button>
                <button>high</button>
              </div>
              <h2 class="card-title">${issueCard.title}</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div class="card-actions gap-4 justify-between">
                <div class="badge badge-outline">Fashion</div>
                <div class="badge badge-outline">Products</div>
              </div>
              <div class="card-actions gap-4 justify-between">
                <div class="">#1 by john_doe</div>
                <div class="">created art</div>
              </div>
              <div class="card-actions gap-4 justify-between">
                <div class="">1/15/2024</div>
                <div class="">updated art</div>
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
  btnAll.innerHTML = ` <button onclick="loadAllCards()" class="btn btn-soft btn-primary ">
      All
    </button>
    <button onclick="showOpen()" class="btn btn-soft btn-primary ">
      open
    </button><button onclick="showClose()" class="btn btn-soft btn-primary ">
      close
    </button>
    `;

  btnContainer.appendChild(btnAll);
};
loadAllIssues();
loadAllCards();
