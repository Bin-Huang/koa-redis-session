Simple redis sessioin store for [koa-sessioin](https://github.com/koajs/session).

```javascript
const session = require("koa-session");
const redisStore = require("koa-redis-session");
const Koa = require("koa");
const app = new Koa();

app.keys = ["some secret hurr"];
app.use(session({
    key: 'koa:sess',
    maxAge: 86400000,

    store: new redisStore({
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        family: 4,           // 4 (IPv4) or 6 (IPv6)
        password: 'auth',
        db: 0,
        // ... And more options you can use in ioredis 
        // See: https://github.com/luin/ioredis/blob/HEAD/API.md#new_Redis

        onError: (e) => console.log(e), // Optional. it will be called when redis client emits an error event.
    }),
}, app));
```

# Why Use?

When you use `koa-session` without external session stores, the session is stored in a cookie by default. It has some disadvantages:

- Session is stored on client side unencrypted
- Browser cookies always have length limits

In addition, when you use external stores, session storage is dependent on your external store -- you can't access the session if your external store is down. Use external session stores only if necessary.

refer: https://github.com/koajs/session