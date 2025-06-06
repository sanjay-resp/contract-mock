// src/mock/mockTokens.js
import { tokenLedger } from "../utils/tokenLedger";

export const initialUsers = [
    { id: "Alice", name: "Alice", amount: 100 },
    { id: "Bob", name: "Bob", amount: 50 },
    { id: "Charlie", name: "Charlie", amount: 0 },
];

// Mint initial tokens
// initialUsers.forEach((user) => tokenLedger.mint(user.id, user.amount));
