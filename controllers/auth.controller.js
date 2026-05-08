const {asyncHandlerv1}  = require('../utils/asyncHandler')
const authService = require("../services/auth.service")
const {successResponse} = require('../utils/response')

const login = asyncHandlerv1(async (req, res) => {
    const user = await authService.login(req.body)
    successResponse(res, user, "Berhasil login", 200)
})

const register = asyncHandlerv1(async (req, res) => {
    const user = await authService.register(req.body)
    successResponse(res, user, "Berhasil register", 201)
})

module.exports = {register, login}