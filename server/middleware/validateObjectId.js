import { isValidObjectId } from 'mongoose';

function validateObjectID(...ObjectIDs) {
    return function (req, res, next) {
        ObjectIDs.forEach((id) => {
            if (!isValidObjectId(req.params[id])) {
                res.status(400)
                throw new Error("Invalid id.")
            } else {
                next();
            }
        });
    }
}

module.exports = validateObjectID