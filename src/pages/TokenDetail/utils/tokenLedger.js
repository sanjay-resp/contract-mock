
class TokenLedger {
    constructor() {
        this.balances = {};
        this.minted = {};
    }
    /**
     * Mint tokens to a user (only once per address)
     * @param {string} user 
     * @param {number} amount 
     * @returns {string}
     */

    mint(user, amount) {
        if (this.minted[user]) throw new Error("User already minted.");
        this.balances[user] = (this.balances[user] || 0) + amount;
        this.minted[user] = true;
        return "Mint successful.";
    }

    /**
      * Transfer tokens from one user to another
      * @param {string} from 
      * @param {string} to 
      * @param {number} amount 
      * @returns {string}
      */

    transfer(from, to, amount) {
        if ((this.balances[from] || 0) < amount) return "Insufficient balance.";
        this.balances[from] -= amount;
        this.balances[to] = (this.balances[to] || 0) + amount;
        return "Transfer successful.";
    }

    /**
     * Get balance of a user
     * @param {string} user 
     * @returns {number}
     */

    balanceOf(user) {
        return this.balances[user] || 0;
    }
}

export const tokenLedger = new TokenLedger();
