const Token = require('../models/Token')

class TokenRepository {
    async create(token) {
        const created = await Token.create(token)

        return created
    }
}

module.exports = TokenRepository