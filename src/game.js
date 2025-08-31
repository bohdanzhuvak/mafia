import { ROLES, ROLE_TRANSLATIONS } from "./roles.js";
import { shuffle } from "./utils.js";

export class MafiaGame {
    constructor(roleCardId) {
        this.roles = [...ROLES];
        this.assignedRoles = [];
        this.currentIndex = 0;
        this.card = document.getElementById(roleCardId);
    }

    assignRoles() {
        this.assignedRoles = shuffle([...this.roles]);
        this.currentIndex = 0;
        this.renderHiddenCard(1);
    }

    translateRole(role) {
        return ROLE_TRANSLATIONS[role] || "unknown";
    }

    showNextRole() {
        if (this.currentIndex >= this.assignedRoles.length) {
            this.card.innerHTML = `<div class="card"><p>Усі ролі роздано!</p></div>`;
            return;
        }

        const role = this.assignedRoles[this.currentIndex];
        const roleKey = this.translateRole(role);
        const imagePath = `img/${roleKey}.jpg`;

        if (this.card.dataset.step !== "shown") {
            this.renderRoleCard(role, imagePath);
            this.card.dataset.step = "shown";
        } else {
            this.currentIndex++;
            if (this.currentIndex < this.assignedRoles.length) {
                this.renderHiddenCard(this.currentIndex + 1);
            } else {
                this.card.innerHTML = `<div class="card"><p>Усі ролі роздано!</p></div>`;
            }
        }
    }

    renderRoleCard(role, imagePath) {
        this.card.innerHTML = `
      <div class="card">
        <h2>Роль гравця ${this.currentIndex + 1}</h2>
        <p>${role}</p>
        <img src="${imagePath}" alt="${role}">
      </div>`;
    }

    renderHiddenCard(playerNumber) {
        this.card.innerHTML = `
      <div class="card">
        <p>Натисни, щоб побачити роль гравця ${playerNumber}</p>
        <img src="img/default.png" alt="Next">
      </div>`;
        this.card.dataset.step = "hidden";
    }
}
