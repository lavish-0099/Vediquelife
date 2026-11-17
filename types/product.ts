import {
  Ingredients,
  ProductBenefits,
  ProductCategories,
  ProductDirectionsForUse,
  ProductFaqs,
  ProductGallery,
  ProductIngredients,
  Products,
  Reviews,
} from "@prisma/client";

export type ProductWithCategory = Products & {
  ProductCategories: ProductCategories;
  ProductGallery: ProductGallery[];
  productBenefits: ProductBenefits[];
  productDirectionsForUse: ProductDirectionsForUse[];
  productFaqs: ProductFaqs[];
  ProductIngredients?: (ProductIngredients & {
    ingredient: Ingredients;
  })[];
  reviews: Reviews[];
};
