const z = require("zod");

const user = z.object({
    username: z.string().email(),
    password: z.string().min(8)
})

module.exports = {
    user: user
}