const Restaurant = require('../models/Restaurant');

const postRestaurant = (req,res) => {
    try{
        const restaurant = new Restaurant(req.body);
        restaurant.img = "/" + req.file.path.replace(/\\/g,"/");
        restaurant.save().then(result => {
            res.status(200).json({message:"Create Restaurant Successfull!"})
        })
        .catch(err => {
            res.status(500).json({message:err})
        })
    }
    catch{}
}

const postNewDish = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.body.idRes);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        const menuIndex = restaurant.menu.findIndex(menu => menu._id.toString() === req.body.idMenu);
        if (menuIndex === -1) {
            return res.status(404).json({ message: "Menu not found" });
        }
        const dish = {
            name: req.body.name,
            img: "/" + req.file.path.replace(/\\/g,"/"),
            description: req.body.description,
            price: req.body.price
        };
        restaurant.menu[menuIndex].dish.push(dish);
        await restaurant.save();
        res.status(200).json({ message: "Add new dish successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {postRestaurant,postNewDish};