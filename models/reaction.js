const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    username: {
        type: String,
        reqired: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: function(date) {
            return `${date.getMonth() + 1}/${
                date.getDate() + 1
              }/${date.getFullYear()}`;
        }
    },
});

module.exports = reactionSchema;