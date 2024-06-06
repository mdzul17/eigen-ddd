const autoBind = require("auto-bind")
const CheckMembersUseCase = require("../../../../Applications/use_case/CheckMembersUseCase")

class MembersController {
    constructor(container) {
        this._container = container

        autoBind(this)
    }

    async getMembers(req, res) {
        const checkMembersUseCase = this._container.getInstance(CheckMembersUseCase.name)
        const result = await checkMembersUseCase.execute()

        return res.status(200).json({
            status: 'success',
            data: result
        })
    }
}

module.exports = MembersController