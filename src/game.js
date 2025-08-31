import { ROLES, PLAYER_IMAGES } from "./roles.js";
import { shuffle } from "./utils.js";

export class MafiaGame {
    constructor(roleCardId) {
        this.roles = [...ROLES];
        this.playerImages = [...PLAYER_IMAGES];
        this.assignedRoles = [];
        this.assignedImages = [];
        this.currentIndex = 0;
        this.card = document.getElementById(roleCardId);
    }

    assignRoles() {
        const shuffledIndices = shuffle([...Array(this.roles.length).keys()]);

        this.assignedRoles = shuffledIndices.map(index => this.roles[index]);
        this.assignedImages = shuffledIndices.map(index => this.playerImages[index]);

        this.currentIndex = 0;
        this.renderHiddenCard(1);
    }

    showNextRole() {
        if (this.currentIndex >= this.assignedRoles.length) {
            this.card.innerHTML = `<div class="card"><p>Всі ролі роздано!</p></div>`;
            return;
        }

        const role = this.assignedRoles[this.currentIndex];
        const imagePath = `img/${this.assignedImages[this.currentIndex]}`;

        if (this.card.dataset.step !== "shown") {
            this.renderRoleCard(role, imagePath);
            this.card.dataset.step = "shown";
        } else {
            this.currentIndex++;
            if (this.currentIndex < this.assignedRoles.length) {
                this.renderHiddenCard(this.currentIndex + 1);
            } else {
                this.card.innerHTML = `<div class="card"><p>Всі ролі роздано!</p></div>`;
            }
        }
    }

    renderRoleCard(role, imagePath) {
        this.card.innerHTML = `
      <div class="card">
        <h2>Гравець ${this.currentIndex + 1}</h2>
        <p>${role}</p>
        <img src="${imagePath}" alt="${role}">
      </div>`;
    }

    renderHiddenCard(playerNumber) {
        this.card.innerHTML = `
      <div class="card hidden-role">
        <p>Натисни для ролі ${playerNumber}</p>
      </div>`;
        this.card.dataset.step = "hidden";
    }
}
