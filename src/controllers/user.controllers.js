import { AsyncHanddler } from "../utils/AsyncHanddler.js";

const registerUser = AsyncHanddler(async (req , res) => {
    res.status(200).json({
        message:" okay work done "
    })
})
export {registerUser}