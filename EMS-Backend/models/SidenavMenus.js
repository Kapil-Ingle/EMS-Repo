import mongoose from "mongoose";

const sidenavMenuSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Title is the required field!']
    },
    icon: {
        type: String,
        require: [true, 'Icon is the required field!']
    },
    route: {
        type: String,
        require: [true, 'Route Name is the required field!']
    },
    sequence: {
        type: Number,
        require: [true, 'Sequence is the required field!']
    },
    role: {
        type: String,
        require: [true, 'Role is the required field!']
    }
});

const SidenavMenu = mongoose.model('SidenavMenu', sidenavMenuSchema);
export default SidenavMenu;