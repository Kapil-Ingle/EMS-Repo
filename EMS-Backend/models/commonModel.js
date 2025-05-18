import mongoose from "mongoose";

const dropdownSchema = new mongoose.Schema({
    dropdownName: {type: String, require: [true, 'Dropdown name is required field!']},
    dropdownValues: {type: String, unique: true, require: [true, 'Dropdown value is required field!']},
    description: {type: String, require: [true, 'Description is required field!']},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const Dropdown = mongoose.model('Dropdown', dropdownSchema);

export { Dropdown }