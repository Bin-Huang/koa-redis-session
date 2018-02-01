const Redis = require("ioredis");

class Store {
    constructor(opts) {
        this.client = new Redis(opts);
        if (typeof opts.onError === "function") {
            this.client.on("error", opts.onError);
        }
    }
    async get(key) {
        const sess = await this.client.get(key);
        return JSON.parse(sess);
    }
    async set(key, sess, maxAge) {
        await this.client.set(key, JSON.stringify(sess), "EX", maxAge / 1000);
    }
    async destroy(key) {
        await this.client.del(key);
    }
}

module.exports = Store;