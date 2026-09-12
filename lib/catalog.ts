export type ProductStatus = "PREORDER" | "READY" | "DRAFT" | "SOLD_OUT";

export type Book = {
  id: string;
  slug: string;
  name: string;
  description: string;
  author?: string;
  muhaqqiq?: string;
  preorderPrice?: number;
  retailPrice?: number;
  preorderStartsAt?: string;
  preorderEndsAt?: string;
  preorderStatus?: "UPCOMING" | "OPEN" | "CLOSED";
  dimensions?: string;
  weightGrams?: number;
  coverType?: string;
  /** Foto fisik kitab. Maksimal lima foto per katalog. */
  images?: string[];
  status: ProductStatus;
};

// Temporary local source. Replace this module with a database repository
// (e.g. Supabase/Prisma) once admin authentication and storage are configured.
export const books: Book[] = [
  {
    id: "riyadhussalihin", slug: "riyadhussalihin", name: "Riyadhussalihin",
    description: "Koleksi hadits pilihan tentang adab, ibadah, dan pembinaan jiwa.",
    author: "Imam an-Nawawi", images: [], status: "PREORDER",
    preorderStatus: "UPCOMING", coverType: "Softcover", dimensions: "Menunggu pembaruan spesifikasi"
  },
  {
    id: "al-adzkar", slug: "al-adzkar", name: "Al-Adzkar",
    description: "Dzikir dan doa pilihan untuk menghidupkan hari dengan tuntunan yang terpercaya.",
    author: "Imam an-Nawawi", images: [], status: "PREORDER",
    preorderStatus: "UPCOMING", coverType: "Softcover", dimensions: "Menunggu pembaruan spesifikasi"
  }
];
