import mongoose, { Model, Schema, Types } from "mongoose";


export interface IShop extends Document {
    id: Types.ObjectId,
    name: string,
    ownerId:string
}

const shopSchema = new Schema<IShop>({
    name: {
        type: String,
        trim: true,
        required: true
    }, 
    
    ownerId: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});



const ShopModel: Model<IShop> = mongoose.models.Shop || mongoose.model<IShop>("Shop", shopSchema);

export default ShopModel;