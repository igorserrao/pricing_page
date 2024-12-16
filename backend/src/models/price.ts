import mongoose, { Schema } from 'mongoose';

export const PriceSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        price: { type: Number, required: true, unique: true },
        repositories: { type: Schema.Types.Mixed, required: false },
        members: { type: Schema.Types.Mixed, required: false },
        storage: { type: Schema.Types.Mixed, required: true },
        support: { type: Schema.Types.Mixed, required: false },
    },
    {
        timestamps: true,
    },
);

export const PriceModel = mongoose.model('Price', PriceSchema);
