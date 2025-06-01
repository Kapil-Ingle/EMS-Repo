import { Dropdown } from "../models/commonModel.js";


const createDropdown = async (req, res) => {
    try{
        const {dropdownName, dropdownValues, description} = req.body;
        const dropdownData = new Dropdown({
            dropdownName,
            dropdownValues,
            description,
            createdAt: new Date(),
            updatedAt: undefined
        });
        await dropdownData.save();
        res.status(200).json({
            status: 'success',
            message: 'Dropdown created successfully!'
        })
    }catch(error){
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

const getDropdown = async (req, res) => {
    try {
        const dropdownName = req.body.dropdownName;
        const dropdown = await Dropdown.findOne({dropdownName});
        
        if(!dropdown){
            return res.status(404).json({
                status: 'fail',
                message: 'Dropdown not found'
            })
        }

        return res.status(200).json({
            status: 'success',
            data:{
                dropdown
            }
        })

    }catch(error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

const getAllDropdowns = async (req, res) => {
    try{
        const dropdowns = await Dropdown.find({});
        if(dropdowns){
            return res.status(200).json({
                status: 'success',
                data: {
                    dropdowns
                }
            })
        }
        return res.status(404).json({
            status: 'fail',
            message: 'Dropdown data is not available!'
        })
    }catch(error){
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

const editDropdown = async (req, res) => {
    try {
        const dropdownData = req.body;
        dropdownData.updatedAt = new Date;
        const dropdown = await Dropdown.findByIdAndUpdate(dropdownData._id, dropdownData);
        if(dropdown){
            return res.status(200).json({
                status: 'success',
                message: 'Dropdown updated successfully!',
                data: {
                    dropdown
                }
            })
        }
        return res.status(404).json({
            status: 'fail',
            message: 'Error to update dropdown!'
        })

    }catch(error){
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

const deleteDropdown = async (req, res) => {
    try{
        const _id = req.body._id;
        const dropdown = await Dropdown.findByIdAndDelete(_id);

        if(dropdown){
            return res.status(200).json({
                status: 'success',
                message: 'Dropdown deleted successfully!'
            })
        }
        return res.status(404).json({
            status: 'fail',
            message: 'Error to delete dropdown!'
        })
    }catch(error){
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

export { createDropdown, getDropdown, getAllDropdowns, editDropdown, deleteDropdown }