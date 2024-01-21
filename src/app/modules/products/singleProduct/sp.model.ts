import { Schema, model } from 'mongoose';
import { ISingleProduct } from './sp.interface';

const SingleProductSchema = new Schema<ISingleProduct>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      default:
        'https://ilsto.websites.co.in/obaju-pink/img/product-placeholder.png',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const SingleProduct = model<ISingleProduct>(
  'SingleProduct',
  SingleProductSchema
);
