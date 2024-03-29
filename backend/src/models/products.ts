import { Schema, model } from "mongoose";
import { IBaseDocument, baseSchemaFields } from "./base";
import { SchemaFields } from "./type";
import { ModelRefs } from "./models";
import { ISeller } from "./sellers";

interface ProductEntity {
  name: string;
  postDescription: string;
  tags: string[];
  sellingPrice: string;
  mrp: string;
  medias: any[];
  available: boolean;
  sellerId: string | ISeller;
}

interface IProduct extends IBaseDocument, ProductEntity {}

const productSchemaFields: SchemaFields<ProductEntity> = {
  name: { type: String },
  postDescription: { type: String },
  sellerId: { type: Schema.Types.ObjectId, ref: ModelRefs.Sellers },
  sellingPrice: { type: String },
  mrp: { type: String },
  available: { type: Boolean },
  tags: [{ type: String }],
  medias: [{ type: Schema.Types.Mixed }],
};

const productSchema = new Schema<IProduct>({
  ...baseSchemaFields,
  ...productSchemaFields,
});

productSchema.index(
  {
    name: "text",
    tags: "text",
  },
  {
    name: "product_search_index",
    weights: {
      name: 5,
      tags: 1,
    },
  }
);

export const ProductModel = model<IProduct>(ModelRefs.Products, productSchema);

export { IProduct, ProductEntity };
