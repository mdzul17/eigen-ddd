const autoBind = require("auto-bind")
const CheckMembersUseCase = require("../../../../Applications/use_case/CheckMembersUseCase")
const AddMemberUseCase = require("../../../../Applications/use_case/AddMemberUseCase")

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

    async postMember(req, res, next) {
        try {
            const addMemberUseCase = this._container.getInstance(AddMemberUseCase.name)

            const addMember = await addMemberUseCase.execute(req.body)

            return res.status(201).json({status: 'success', data: addMember})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MembersController