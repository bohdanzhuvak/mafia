import { MafiaGame } from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
    const game = new MafiaGame("roleCard");

    const assignBtn = document.getElementById("assignRolesBtn");
    assignBtn.addEventListener("click", () => game.assignRoles());

    const card = document.getElementById("roleCard");
    card.addEventListener("click", () => game.showNextRole());
});
