const Restaurant = require('../models/Restaurant');
//const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');
module.exports = {
   // Upload: GraphQLUpload,
    Query:{
        async getRestaurantID(_,{ID}){
            return Restaurant.findById(ID);
        },
        async getRestaurant(){
            return Restaurant.find();
        }
    },
    Mutation:{
        
        async createRestaurant(_,{restaurantInput,locationInput,file}){
            const {owner, name, description, img, rate, timeDelivery, openTime,closeTime } = restaurantInput;
            // const { createReadStream, filename, mimetype, encoding } = await file;
            // const stream = createReadStream();
            // const out = require('fs').createWriteStream('local-file-output.txt');
            // stream.pipe(out);
            // await finished(out);
      
            const createRestaurant = new Restaurant(
                {
                    owner,
                    name,
                    description,
                    img,
                    rate,
                    timeDelivery,
                    openTime,
                    closeTime 
                }
            )
            const res = await createRestaurant.save();
            if (!res) {
                console.log('Failed to create restaurant');
            }
            return {
                id: res.id,
                ...res._doc
            }
        },
        async addnewMenu(_,{ID,menuInput:{title}}){
            const restaurant = await Restaurant.findById(ID);
            restaurant.menu.push({title:title})
            restaurant.save();
       },
       async deleteRestaurant(_,{ID}){
            const deleteRes = (await Restaurant.deleteOne({_id:ID})).modifiedCount;
            return deleteRes;
       },
    //    async editMenu(_,{ID_Res,ID_Menu,dishInput:{name,img,description,price}}){
    //         try{
    //             const RestaurantID = await Restaurant.findById(ID_Res);
    //             if (!RestaurantID) {
    //                 return ({
    //                     message:'Res not found'
    //                 })
    //             }
    //             const editMenu = await RestaurantID.menu.findIndex(menu => menu._id.toString() === ID_Menu);
    //             editMenu.dish.push({name:name,img:img,description:description,price:price})
    //             editMenu.save()
    //             return true
    //         }
    //         catch (error){
    //             throw new Error(`Failed to edit menu: ${error.message}`);
    //         }
    //    }
    async editMenu(_, { ID_Res, ID_Menu, dishInput: { name, img, description, price } }) {
        try {
            const restaurant = await Restaurant.findById(ID_Res);
            
           // const menuID = restaurant.menu.find(ID_Menu)
            const menuIndex = restaurant.menu.findIndex(menu => menu._id.toString() === ID_Menu);
            
            if (menuIndex === -1) {
                throw new Error('Menu item not found');
            }
            restaurant.menu[menuIndex].dish.push({name:name,img:img,description:description,price:price})
           // menuID.dish.push({name:name,img:img,description:description,price:price})

            await restaurant.save();
            
            return true;
        } catch (error) {
            throw new Error(`Failed to edit menu: ${error.message}`);
        }
    }
    
    }
  
}