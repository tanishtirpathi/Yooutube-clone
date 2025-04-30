import { AsyncHanddler } from "../utils/AsyncHanddler.js";

const registerUser = AsyncHanddler(async (req , res) => {
    res.status(200).json({
        message:" Bc chal raha hai ja ke ab code kar  "
    })
})
export {registerUser}