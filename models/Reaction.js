const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dayjs(timestamp).format('MMM DD, YYYY [at] hh:mm a'),
        }
    },
    {
        toJSON: {
          getters: true,
        },
        _id: false,
      }
)


module.exports = ReactionSchema;