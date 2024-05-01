const {model,Schema}=require('mongoose');
const dishSchema = new Schema(
    {
        name:String,
        img:{
            type:String,
            default:"https://www.fivebranches.edu/wp-content/uploads/2021/08/default-image.jpg"
        },
        description: String,
        price:Number
    }
)
module.exports = model('Dish', dishSchema);

