import mongoose from "mongoose";

const sidenavMenuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is the required field!']
    },
    icon: {
        type: String,
        required: [true, 'Icon is the required field!']
    },
    route: {
        type: String,
        required: [true, 'Route Name is the required field!']
    },
    sequence: {
        type: Number,
        required: [true, 'Sequence is the required field!']
    },
    role: {
        type: String,
        required: [true, 'Role is the required field!']
    }
});

const SidenavMenu = mongoose.model('SidenavMenu', sidenavMenuSchema);
export default SidenavMenu;