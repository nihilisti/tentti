var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt')
const SALT_ROUNDS = 12
let hashedPassword
let alkuhetki = Date.now()
let loppuhetki = Date.now()

bcrypt.hash("kissa", SALT_ROUNDS, (err, hash) => {
    hashedPassword = hash
    console.log(hash)
    loppuhetki = Date.now()
    console.log("operaatio kesti (ms): ", loppuhetki - alkuhetki)
});

(async () => {
    try {
        hashedPassword = await bcrypt.hash("kissa", SALT_ROUNDS)
        console.log(hashedPassword)
        let result = await bcrypt.compare("kissa", hashedPassword)
        console.log(result)
    } catch (e) {
        console.log(e)
    }
})();

// var token1 = jwt.sign({ foo: 'bar' }, 'shhhhh');
// var token2 = jwt.sign({ foo: 'bar' }, 'shhhhh');

// console.log("og token", token1)
// token2 = token1.substring(0, 10)
// console.log("sormeiltu token", token1)

// try {
//     let result = jwt.verify(token1, 'shhhhh')
//     console.log("token verifioitu" +result)
// } catch(e) {
//     console.log("token ei ole ok")
// }

// console.log(token)