// у випадку додаванняя ролей, будь ласка використовуйте лише такі формулювання:
// "Мафія" / "Дон" / "Шериф" / "Мирний" / "Лікар"
let roles = [
    "Мафія",
    "Мафія",
    "Дон",
    "Шериф",
    "Мирний",
    "Мирний",
    "Мирний",
    "Мирний",
    "Мирний",
    "Мирний"
];

let currentIndex = 0;
let assignedRoles = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function assignRoles() {
    assignedRoles = shuffle([...roles]);
    currentIndex = 0;
    const card = document.getElementById("roleCard");

    card.setAttribute("data-step", "hidden");
    card.innerHTML = `
        <div class="card">
            <p>Натисни, щоб побачити роль гравця 1</p>
        </div>`;

    card.onclick = showNextRole;
}


// костиль для перекладу "назви ролі" на англійську
// для фоток
function translateRoleName(roleName) {
    switch(roleName) {
        case "Мафія":
            return "mafia";
        
        case "Дон":
            return "don";
        
        case "Шериф":
            return "sheriff"; 

        case "Мирний":
            return "civil";

        case "Лікар":
            return "doctor";
        
        default:
            break;
    }
}

function showNextRole() {
    const card = document.getElementById("roleCard");
    const role = assignedRoles[currentIndex];
    const roleKey = translateRoleName(role);
    const imagePath = `img/${roleKey}.jpg`;

    if (card.getAttribute("data-step") !== "shown") {
        card.innerHTML = `
        <div class="card">
            <h2>Роль гравця ${currentIndex + 1}</h2>
            <p>${role}</p>
            <img src="${imagePath}" alt="${role}">
        </div>`;
        card.setAttribute("data-step", "shown");
    } else {
        currentIndex++;

        if (currentIndex >= assignedRoles.length) {
            card.innerHTML = "<div class='card'><p>Усі ролі роздано!</p></div>";
            return;
        }

        card.innerHTML = `
        <div class="card">
            <p>Роль гравця ${currentIndex + 1}</p>
            <img src="img/default.png" alt="Next">
        </div>`;
        card.setAttribute("data-step", "hidden");
    }
}
