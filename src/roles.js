export const GAME_ROLES = [
    {
        id: "mafia1",
        name: "Мафія",
        image: "mafia1.jpg",
        team: "mafia",
    },
    {
        id: "mafia2",
        name: "Мафія",
        image: "mafia2.jpg",
        team: "mafia",
    },
    {
        id: "don",
        name: "Дон",
        image: "don.jpg",
        team: "mafia",
    },
    {
        id: "sheriff",
        name: "Шериф",
        image: "sheriff.jpg",
        team: "town",
    },
    {
        id: "civil1",
        name: "Мирний",
        image: "civil1.jpg",
        team: "town",
    },
    {
        id: "civil2",
        name: "Мирний",
        image: "civil2.jpg",
        team: "town",
    },
    {
        id: "civil3",
        name: "Мирний",
        image: "civil3.jpg",
        team: "town",
    },
    {
        id: "civil4",
        name: "Мирний",
        image: "civil4.jpg",
        team: "town",
    },
    {
        id: "civil5",
        name: "Мирний",
        image: "civil5.jpg",
        team: "town",
    },
    {
        id: "civil6",
        name: "Мирний",
        image: "civil6.jpg",
        team: "town",
    }
];

export const ROLES = GAME_ROLES.map(role => role.name);
export const PLAYER_IMAGES = GAME_ROLES.map(role => role.image);

export const getRoleById = (id) => GAME_ROLES.find(role => role.id === id);
export const getRolesByTeam = (team) => GAME_ROLES.filter(role => role.team === team);
export const getMafiaCount = () => GAME_ROLES.filter(role => role.team === "mafia").length;
export const getTownCount = () => GAME_ROLES.filter(role => role.team === "town").length;
