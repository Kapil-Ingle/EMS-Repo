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
            message: 'Dropdown data is not available!.'
        })
    }catch(error){
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

export { createDropdown, getDropdown, getAllDropdowns }