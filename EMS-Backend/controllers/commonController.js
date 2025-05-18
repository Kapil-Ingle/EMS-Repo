import { Dropdown } from "../models/commonModel.js";


const createDropdown = async (req, res) => {
    try{
        const {dropdownName, dropdownValues, description} = req.body;
        const dropdownData = new Dropdown({
            dropdownName,
            dropdownValues,
            description
        });
        await dropdownData.save();
        res.status(200).json({
            status: 'success',
            message: 'Dropdown data saved successfully!'
        })
    }catch(error){
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

export { createDropdown }