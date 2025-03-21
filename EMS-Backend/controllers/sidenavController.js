import SidenavMenu from "../models/SidenavMenus.js";

const getSidenavMenus = async (req, res) => {
    try{
        const role = res.user.role;
        if(role === 'admin'){
            const menus = await SidenavMenu.find({role: role}).sort({sequence: 1});
            res.status(200).json({
                status: 'success',
                data: {
                    menus
                }
            })
        }
    }catch(error){
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}

export default getSidenavMenus 