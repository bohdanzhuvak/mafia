import { MafiaGame } from "./game.js";

class GameManager {
    constructor() {
        this.game = null;
        this.isInitialized = false;
    }

    async initialize() {
        try {
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve, { once: true });
                });
            }

            this.setupGame();
            this.setupEventListeners();
            this.isInitialized = true;

            console.log('🎮 Mafia Game initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize game:', error);
            this.showErrorMessage('Помилка ініціалізації гри');
        }
    }

    setupGame() {
        const roleCardElement = document.getElementById("roleCard");
        if (!roleCardElement) {
            throw new Error('Element with id "roleCard" not found');
        }

        this.game = new MafiaGame("roleCard");
    }

    setupEventListeners() {
        const assignBtn = document.getElementById("assignRolesBtn");
        const card = document.getElementById("roleCard");

        if (!assignBtn) {
            throw new Error('Element with id "assignRolesBtn" not found');
        }

        assignBtn.addEventListener("click", () => {
            try {
                this.game.assignRoles();
                // Активируем кнопку "Показати всі ролі" после раздачи ролей
                const showAllRolesBtn = document.getElementById("showAllRolesBtn");
                if (showAllRolesBtn) {
                    showAllRolesBtn.disabled = false;
                }
                console.log('🎯 Roles assigned successfully');
            } catch (error) {
                console.error('❌ Failed to assign roles:', error);
                this.showErrorMessage('Помилка роздачі ролей');
            }
        });

        card.addEventListener("click", () => {
            try {
                this.game.showNextRole();
            } catch (error) {
                console.error('❌ Failed to show next role:', error);
                this.showErrorMessage('Помилка показу ролі');
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space' || event.code === 'Enter') {
                event.preventDefault();
                if (this.game && this.game.getRemainingRoles() > 0) {
                    this.game.showNextRole();
                }
            }
        });

        const showAllRolesBtn = document.getElementById("showAllRolesBtn");
        if (showAllRolesBtn) {
            showAllRolesBtn.disabled = true;

            showAllRolesBtn.addEventListener("click", () => {
                try {
                    this.game.showAllRoles();
                    console.log('📋 Showing all roles');
                } catch (error) {
                    console.error('❌ Failed to show all roles:', error);
                    this.showErrorMessage('Помилка показу всіх ролей');
                }
            });
        }

        card.addEventListener('backToGame', () => {
            try {
                if (this.game.getCurrentIndex() > 0) {
                    this.game.renderRoleCard(this.game.getCurrentRole());
                } else {
                    this.game.renderHiddenCard(1);
                }
            } catch (error) {
                console.error('❌ Failed to return to game:', error);
                this.showErrorMessage('Помилка повернення до гри');
            }
        });
    }

    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 1000;
            font-weight: bold;
        `;

        document.body.appendChild(errorDiv);

        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 3000);
    }

    getGame() {
        return this.game;
    }
}

const gameManager = new GameManager();
gameManager.initialize().catch(error => {
    console.error('❌ Game initialization failed:', error);
});

export { gameManager };
