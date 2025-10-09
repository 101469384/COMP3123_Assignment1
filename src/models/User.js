const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: { type: String, required: true, trim: true, unique: true },
        email:    { type: String, required: true, trim: true, unique: true },
        password: { type: String, required: true }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        toJSON: {
            transform: (doc, ret) => {
                ret.user_id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.password;
                return ret;
            }
        }
    }
);

module.exports = model('User', UserSchema);
