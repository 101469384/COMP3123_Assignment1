const { Schema, model } = require('mongoose');

const EmployeeSchema = new Schema(
    {
        first_name:      { type: String, required: true, trim: true },
        last_name:       { type: String, required: true, trim: true },
        email:           { type: String, required: true, trim: true, unique: true },
        position:        { type: String, required: true, trim: true },
        salary:          { type: Number, required: true, min: 0 },
        date_of_joining: { type: Date,   required: true },
        department:      { type: String, required: true, trim: true },
        profile_image: { type: String, default: null }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        toJSON: {
            transform: (doc, ret) => {
                ret.employee_id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    }
);

module.exports = model('Employee', EmployeeSchema);
