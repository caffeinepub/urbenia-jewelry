import { useQuery } from "@tanstack/react-query";
import { Category } from "../backend.d";
import type { Product } from "../backend.d";
import { useActor } from "./useActor";

export function useGoldPrice() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["goldPrice"],
    queryFn: async () => {
      if (!actor) return BigInt(6500);
      return actor.getGoldPrice();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
    staleTime: 25000,
  });
}

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["allProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByCategory(category: Category | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["productsByCategory", category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function computePrice(product: Product, goldPrice: bigint): number {
  return product.weightGrams * Number(goldPrice) + Number(product.makingCharge);
}

export { Category };
