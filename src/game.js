import {GAME_ROLES} from "./roles.js";
import {shuffle} from "./utils.js";

export class MafiaGame {
    constructor(roleCardId) {
        this.roles = [...GAME_ROLES];
        this.assignedRoles = [];
        this.currentIndex = 0;
        this.card = document.getElementById(roleCardId);

        if (!this.card) {
            throw new Error(`Element with id "${roleCardId}" not found`);
        }
    }

    assignRoles() {
        this.assignedRoles = shuffle([...this.roles]);
        this.currentIndex = 0;
        this.renderHiddenCard(1);
    }

    showNextRole() {
        if (this.currentIndex >= this.assignedRoles.length) {
            this.showGameComplete();
            return;
        }

        const currentRole = this.assignedRoles[this.currentIndex];

        if (this.card.dataset.step !== "shown") {
            this.renderRoleCard(currentRole);
            this.card.dataset.step = "shown";
        } else {
            this.currentIndex++;
            if (this.currentIndex < this.assignedRoles.length) {
                this.renderHiddenCard(this.currentIndex + 1);
            } else {
                this.showGameComplete();
            }
        }
    }

    renderRoleCard(role) {
        const imagePath = `img/${role.image}`;
        this.card.innerHTML = `
            <div class="card role-card ${role.team}-team">
                <h2>Гравець ${this.currentIndex + 1}</h2>
                <h3 class="role-name">${role.name}</h3>
                <img src="${imagePath}" alt="${role.name}" class="role-image">
            </div>`;
    }

    renderHiddenCard(playerNumber) {
        this.card.innerHTML = `
            <div class="card hidden-role">
                <p>Натисни для ролі ${playerNumber}</p>
                <div class="progress">${playerNumber}/${this.assignedRoles.length}</div>
            </div>`;
        this.card.dataset.step = "hidden";
    }

    showGameComplete() {
        this.card.innerHTML = `
            <div class="card game-complete">
                <h2>🎉 Всі ролі роздано!</h2>
                <p>Гра готова до початку</p>
            </div>`;
    }

    getCurrentRole() {
        return this.assignedRoles[this.currentIndex] || null;
    }

    getRemainingRoles() {
        return this.assignedRoles.length - this.currentIndex;
    }

    getTotalRoles() {
        return this.assignedRoles.length;
    }
}
