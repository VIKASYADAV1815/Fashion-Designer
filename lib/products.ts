import productsData from "@/lib/products.json";

export type ProductRecord = {
  id: string;
  slug?: string;
  name: string;
  tagline?: string;
  price: number;
  category: string;
  subCategory?: string;
  image?: string;
  images?: string[];
  video?: string;
  description?: string;
  details?: string[];
  isOutOfStock?: boolean;
  [key: string]: unknown;
};

const localProducts = productsData as ProductRecord[];

const PUBLIC_ASSET_PREFIXES = ["/lehanga", "/saree", "/drape", "/images", "/videos"];

const getBackendOrigin = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return "";

  return apiUrl.replace(/\/api\/?$/, "");
};

const productKey = (product: ProductRecord) => (product.slug || product.id || product.name).toLowerCase();

const hasMeaningfulValue = (value: unknown) => {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

const normalizeAssetUrl = (value: unknown, backendOrigin: string) => {
  if (typeof value !== "string" || !value) return value;
  if (/^https?:\/\//i.test(value)) return value;

  if (value.startsWith("/")) {
    if (PUBLIC_ASSET_PREFIXES.some((prefix) => value.startsWith(prefix))) {
      return value;
    }

    return backendOrigin ? `${backendOrigin}${value}` : value;
  }

  return value;
};

const normalizeProduct = (product: ProductRecord, backendOrigin: string): ProductRecord => ({
  ...product,
  id: product.id || product.slug || product.name,
  slug: product.slug || product.id || product.name,
  image: (normalizeAssetUrl(product.image, backendOrigin) as string | undefined) || "",
  images: Array.isArray(product.images)
    ? product.images
        .map((image) => normalizeAssetUrl(image, backendOrigin))
        .filter((image): image is string => typeof image === "string" && image.length > 0)
    : [],
  video: (normalizeAssetUrl(product.video, backendOrigin) as string | undefined) || "",
  tagline: product.tagline || "",
  subCategory: product.subCategory || "",
  description: product.description || "",
  details: Array.isArray(product.details) ? product.details : [],
  isOutOfStock: Boolean(product.isOutOfStock),
});

const mergeProductRecords = (remoteProduct: ProductRecord, localProduct?: ProductRecord): ProductRecord => {
  if (!localProduct) return remoteProduct;

  const merged: ProductRecord = { ...localProduct, ...remoteProduct };
  const keys = new Set([...Object.keys(localProduct), ...Object.keys(remoteProduct)]);

  keys.forEach((key) => {
    const remoteValue = remoteProduct[key];
    const localValue = localProduct[key];

    if (!hasMeaningfulValue(remoteValue) && hasMeaningfulValue(localValue)) {
      merged[key] = localValue;
    }
  });

  return merged;
};

const extractProducts = (data: unknown): ProductRecord[] => {
  if (Array.isArray(data)) return data as ProductRecord[];
  if (data && typeof data === "object" && Array.isArray((data as { products?: unknown }).products)) {
    return (data as { products: ProductRecord[] }).products;
  }

  return [];
};

export async function loadProductCatalog(): Promise<ProductRecord[]> {
  const backendOrigin = getBackendOrigin();
  const localCatalog = localProducts.map((product) => normalizeProduct(product, backendOrigin));
  const localByKey = new Map(localCatalog.map((product) => [productKey(product), product]));

  let remoteCatalog: ProductRecord[] = [];

  if (process.env.NEXT_PUBLIC_API_URL) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        remoteCatalog = extractProducts(data).map((product) => normalizeProduct(product, backendOrigin));
      }
    } catch {
      remoteCatalog = [];
    }
  }

  if (!remoteCatalog.length) {
    return localCatalog;
  }

  const mergedCatalog = remoteCatalog.map((remoteProduct) => {
    const localProduct = localByKey.get(productKey(remoteProduct));
    return normalizeProduct(mergeProductRecords(remoteProduct, localProduct), backendOrigin);
  });

  const mergedKeys = new Set(mergedCatalog.map((product) => productKey(product)));
  const localOnlyProducts = localCatalog.filter((product) => !mergedKeys.has(productKey(product)));

  return [...mergedCatalog, ...localOnlyProducts];
}
