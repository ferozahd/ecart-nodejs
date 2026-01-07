import mongoose, { Schema, Document, Model } from "mongoose";

/** Item document interface */
export interface IItem extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/** Schema */
const itemSchema = new Schema<IItem>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price:{
      type:Number,
      required:true,
      default:0
    },
    image:{
      type:String,
      required:false,
      default:undefined
    }
  },
  {
    timestamps: true
  }
);

/** Model */
const Item: Model<IItem> =
  mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);

export default Item;
