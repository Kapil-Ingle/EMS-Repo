import mongoose from "mongoose";

const dropdownSchema = new mongoose.Schema({
    dropdownName: {type: String, required: [true, 'Dropdown name is required field!']},
    dropdownValues: {type: [String], required: [true, 'Dropdown value is required field!']},
    description: {type: String, required: [true, 'Description is required field!']},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const Dropdown = mongoose.model('Dropdown', dropdownSchema);

export { Dropdown }