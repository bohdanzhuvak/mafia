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

    showAllRoles() {
        if (this.assignedRoles.length === 0) {
            this.card.innerHTML = `
                <div class="card">
                    <p>Спочатку роздайте ролі!</p>
                </div>`;
            return;
        }

        const rolesList = this.assignedRoles.map((role, index) => {
            const imagePath = `img/${role.image}`;
            return `
                <div class="role-item ${role.team}-team">
                    <div class="role-number">${index + 1}</div>
                    <div class="role-info">
                        <h4>${role.name}</h4>
                        <span class="team-badge">${role.team === 'mafia' ? 'Мафія' : 'Місто'}</span>
                    </div>
                    <img src="${imagePath}" alt="${role.name}" class="role-thumbnail">
                </div>
            `;
        }).join('');

        this.card.innerHTML = `
            <div class="card all-roles-card">
                <h2>📋 Всі ролі гравців</h2>
                <div class="roles-list">
                    ${rolesList}
                </div>
                <div class="roles-summary">
                    <div class="summary-item">
                        <span class="summary-label">Мафія:</span>
                        <span class="summary-value mafia-count">${this.assignedRoles.filter(r => r.team === 'mafia').length}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Місто:</span>
                        <span class="summary-value town-count">${this.assignedRoles.filter(r => r.team === 'town').length}</span>
                    </div>
                </div>
                <button class="back-btn" onclick="this.closest('.card').dispatchEvent(new CustomEvent('backToGame'))">
                    Повернутися до гри
                </button>
            </div>`;
    }

    getCurrentRole() {
        return this.assignedRoles[this.currentIndex] || null;
    }

    getCurrentIndex() {
        return this.currentIndex;
    }

    getRemainingRoles() {
        return this.assignedRoles.length - this.currentIndex;
    }

    getTotalRoles() {
        return this.assignedRoles.length;
    }
}
