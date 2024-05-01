const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar Upload
    type File {
      filename: String!
      mimetype: String!
      encoding: String!
    }
    type Location {
      coordinates: String
      address: String
    }
    type Menu {
      _id:String
      title: String
      dish: [Dish]
    }

    type Dish {
      name: String
      img: String
      description: String
      price: Float
    }
    type Time {
      hour: Int
      minute: Int
    }

    type Restaurant {
    
      _id:String
      owner:String
      name:String
      description:String
      img:String
      rate:Float
      timeDelivery:Int
      location:Location
      openTime: Time
      closeTime: Time
      menu: [Menu]
    }
    input LocationInput {
      coordinates: String
      address: String
    }
    input InputTime{
      hour: Int
      minute: Int
    }
    input RestaurantInput {
      owner:String
      name:String
      description:String
      img:String
      rate:Float
      timeDelivery:Int
      openTime:InputTime
      closeTime:InputTime
    }
    input MenuInput {
      title: String
      dish: [DishInput]
    }

    input DishInput {
      name: String
      img: String
      description: String
      price: Float
    }
    type Query {
      getRestaurantID(ID: ID!): Restaurant!
      getRestaurant: [Restaurant]
    }
    type Mutation {
      createRestaurant(restaurantInput: RestaurantInput, locationInput: LocationInput,file: Upload!): Restaurant!
      addnewMenu(ID: ID!, menuInput: MenuInput): Boolean
      deleteRestaurant(ID: ID!): Boolean
      editMenu(ID_Res: ID!,ID_Menu: ID!,dishInput: DishInput):Boolean
    }
`;
//editProduct(ID: ID!, restaurantInput: RestaurantInput): Boolean
// deleteProduct(ID: ID!): Boolean

