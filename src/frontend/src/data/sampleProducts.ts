import { Category } from "../backend.d";
import type { Product } from "../backend.d";

export const sampleProducts: Product[] = [
  {
    id: BigInt(1),
    name: "Celestial Solitaire Ring",
    category: Category.rings,
    weightGrams: 4.5,
    makingCharge: BigInt(8500),
    description:
      "Timeless 22K gold solitaire ring with a brilliant-cut diamond center stone.",
    imageUrl: "/assets/generated/product-ring-1.dim_500x500.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: BigInt(2),
    name: "Lumière Pendant Necklace",
    category: Category.necklaces,
    weightGrams: 8.2,
    makingCharge: BigInt(12000),
    description: "Delicate 22K gold chain with a teardrop diamond pendant.",
    imageUrl: "/assets/generated/product-necklace-1.dim_500x500.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: BigInt(3),
    name: "Pearl Drop Earrings",
    category: Category.earrings,
    weightGrams: 3.8,
    makingCharge: BigInt(6500),
    description:
      "Lustrous South Sea pearl drops suspended from 22K gold hooks.",
    imageUrl: "/assets/generated/product-earring-1.dim_500x500.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: BigInt(4),
    name: "Diamond Tennis Bracelet",
    category: Category.bracelets,
    weightGrams: 12.5,
    makingCharge: BigInt(22000),
    description:
      "Classic 22K gold tennis bracelet set with sparkling VS diamonds.",
    imageUrl: "/assets/generated/product-bracelet-1.dim_500x500.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: BigInt(5),
    name: "Royal Signet Ring",
    category: Category.mens,
    weightGrams: 9.0,
    makingCharge: BigInt(11000),
    description: "Bold 22K gold signet ring with engraved geometric pattern.",
    imageUrl: "/assets/generated/category-mens.dim_600x400.jpg",
    inStock: true,
    featured: false,
  },
  {
    id: BigInt(6),
    name: "Eternity Band",
    category: Category.rings,
    weightGrams: 5.2,
    makingCharge: BigInt(9500),
    description: "Magnificent full eternity band with channel-set diamonds.",
    imageUrl: "/assets/generated/category-rings.dim_600x400.jpg",
    inStock: true,
    featured: false,
  },
];
