const {model,Schema}=require('mongoose');
const Time = new Schema({
    hour:{
        type:Number,
        default:0
    },
    minute:{
        type:Number,
        default:0
    },
});

const restaurantSchema = new Schema({
    owner:String,
    name:String,
    description:String,
    img:{
        type:String,
        default:"https://www.fivebranches.edu/wp-content/uploads/2021/08/default-image.jpg"
    },
    rate:{
        type:Number,
        default:0
    },
    timeDelivery:{
        type:Number,
        default:0
    },
    location:{
        type:{
            coordinates:String,
            address:String
        },
        default:{
            coordinates:null,
            address:"Chưa có địa chỉ"
        }
    },
    openTime:Time,
    closeTime:Time,
    menu:{
        type: [{
            title:String,
            dish:[ {
                name:String,
                img:{
                    type:String,
                    default:"https://www.fivebranches.edu/wp-content/uploads/2021/08/default-image.jpg"
                },
                description: String,
                price:Number
            }]
        }],
        default:[]
    }
});
module.exports = model('Restaurant', restaurantSchema);
