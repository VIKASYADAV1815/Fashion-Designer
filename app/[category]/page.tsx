import ShopGrid from "@/app/shop/components/ShopGrid";
import ShopTransition from "@/app/shop/components/ShopTransition";
import React from "react";
import productsData from "@/lib/products.json";

const categoryTitles: Record<string, string> = {
  women: "Womenswear",
  men: "Menswear",
  accessories: "Accessories",
  lehenga: "Lehenga",
  dress: "Dress",
  drape: "Drape",
  "casual-fit": "Casual Fit",
  saree: "Saree",
  "party-wear": "Party Wear",
  "western-wear": "Western Wear",
  "indo-western-wear": "Indo Western Wear",
};

export async function generateStaticParams() {
  return Object.keys(categoryTitles).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (category === "dress") {
    return {
      title: "Western & Indo Western Party Wear Dresses for Women",
      description:
        "Shop western party wear dresses for womens, party wear dresses for women western, and party wear indo western dresses for womens .",
    };
  }
  if (category === "lehenga") {
    return {
      title: "Indo Western Lehenga & Silk Lehenga for Women",
      description:
        "Shop elegant indo western lehenga for women and luxurious silk lehenga for women at Khushi Chauhan. Perfect for weddings, parties, and festive occasions.",
    };
  }
  if (category === "saree") {
    return {
      title: "Party Wear Saree & Designer Organza Sarees for Girls",
      description:
        "Shop elegant party wear saree for girls and luxurious designer organza sarees at Khushi Chauhan. Perfect for weddings, parties, and festive occasions.",
    };
  }
  return {};
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  // In a real app, we would filter products by category here or fetch from API
  // For now, we reuse ShopGrid but change the title

  const title = categoryTitles[category] || category;

  return (
    <ShopTransition>
      <div className="min-h-screen mt-12 bg-white text-black">
        <ShopGrid category={category} initialProducts={productsData as any} />
        {category === "dress" && (
          <section className="bg-white text-black border-t border-zinc-200">
            <div className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-16">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-semibold uppercase tracking-wider">Western Party Wear Dresses for Womens</h2>
                  <p className="text-sm md:text-base leading-relaxed text-zinc-700">
                    Explore the finest western{"  "}
                    <strong className="font-semibold">party wear dresses for womens</strong>{"  "}
                    at Khushi Chauhan, perfect for birthdays, cocktail parties, and evening events. The dresses are stylish, colorful and comfortable to wear in order to shine. Whether you are looking for a casual night out or a glamorous event, the right{"  "}
                    <strong className="font-semibold">party wear dress for women western</strong>{"  "}
                    will elevate your style. Buy the newest fashion and discover things that match your character.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-semibold uppercase tracking-wider">Party Wear Indo Western Dresses for Womens</h2>
                  <p className="text-sm md:text-base leading-relaxed text-zinc-700">
                    Celebrate in style with <strong className="font-semibold">party wear indo western dresses for womens</strong>{"  "}
                    from Khushi Chauhan, designed to blend tradition with modern elegance. These garments are perfect in case of weddings, celebrations, or vacations as they are elegant in form but have modern design. Choose your perfect{"  "}
                    <strong className="font-semibold">party wear indo western dresses for womens</strong>{"  "}
                    and pair them with accessories to create a standout look. Find your favorite{"  "}
                    <strong className="font-semibold">party wear dress for women western</strong>{"  "}
                    or fusion style today.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-sm md:text-base leading-relaxed text-zinc-700">
                    Go out in style with{"  "}
                    <strong className="font-semibold">western party wear dresses for womens</strong>{"  "}
                    by Khushi Chauhan that are ideal for birthdays, evening parties and special occasions. Select the perfect{"  "}
                    <strong className="font-semibold">party wear dress for women</strong>{"  "}
                    to have a trendy and modern outlook. To dress up during festive events and weddings, our{"  "}
                    <strong className="font-semibold">party wears indo-western dresses for women's</strong>{"  "}
                    fusion dresses. The shop and every celebration will be memorable.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        {category === "lehenga" && (
          <section className="bg-white text-black border-t border-zinc-200">
            <div className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-16">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-semibold uppercase tracking-wider">Indo Western Lehenga for Women</h2>
                  <p className="text-sm md:text-base leading-relaxed text-zinc-700">
                    Enter the world of grace with a stunning{"  "}
                    <strong className="font-semibold">indo western lehenga for women</strong>{"  "}
                    from Khushi Chauhan, which is appropriate in weddings, festivals and special occasions. These lehengas are convenient to use and they make the old world meet with the new outlines in a way that not only makes them fancy, but also memorable. They should be paired with statement jewelry or a fancy blouse in order to shine during any occasion.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-semibold uppercase tracking-wider">Silk Lehenga for Women</h2>
                  <p className="text-sm md:text-base leading-relaxed text-zinc-700">
                    Make it special to your wardrobe with a{"  "}
                    <strong className="font-semibold">silk lehenga for women</strong>
                    , which is made with style and grace. The lehengas are ideal during receptions, parties, and festive occasions because they have high quality fabrics, elaborate crafts, and rich textures that make each wear a special outfit. Be noticed easily by bright colors and glamorous lines.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-sm md:text-base leading-relaxed text-zinc-700">
                    Celebrate your special moments in a gorgeous{"  "}
                    <strong className="font-semibold">indo western lehenga for women</strong>{"  "}
                    or a classy{"  "}
                    <strong className="font-semibold">silk lehenga for women</strong>
                    . The items are made to be traditional and also have a touch of modernity to them making sure that you look assured, stylish, and shining in them. The{"  "}
                    <strong className="font-semibold">indo western lehenga for women</strong>{"  "}
                    and{"  "}
                    <strong className="font-semibold">silk lehenga for women</strong>{"  "}
                    collection at Khushi Chauhan offers versatile designs for every celebration.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        {category === "saree" && (
          <section className="bg-white text-black border-t border-zinc-200">
            <div className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-16">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-semibold uppercase tracking-wider">Party Wear Saree for Girls</h2>
                  <p className="text-sm md:text-base leading-relaxed text-zinc-700">
                    Step into style with our{"  "}
                    <strong className="font-semibold">party wear saree for girls</strong>{"  "}
                    from Khushi Chauhan, perfect for birthdays, festive occasions, and evening parties. These{"  "}
                    <strong className="font-semibold">party wear saree for girls</strong>{"  "}
                    have bright colors, fine drapes and comfortable materials in order to make all celebrations memorable. Make them up with accessories to make them look good. Browse our line up to find fancy and elegant items that are unique.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-semibold uppercase tracking-wider">Designer Organza Sarees</h2>
                  <p className="text-sm md:text-base leading-relaxed text-zinc-700">
                    Take your wardrobe to the next level by adding{"  "}
                    <strong className="font-semibold">designer organza sarees</strong>{"  "}
                    by Khushi Chauhan which are made to look sophisticated and charming. The{"  "}
                    <strong className="font-semibold">designer organza sarees</strong>{"  "}
                    are ideal to use in a wedding or receptor or festival occasion and they have good textures and modern designs. Shine easily with a high-end design and quality. Party grandly at the same time enjoying comfort and sophistication.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-sm md:text-base leading-relaxed text-zinc-700">
                    Step into elegance with a{"  "}
                    <strong className="font-semibold">party wear saree for girls</strong>{"  "}
                    from Khushi Chauhan, perfect for birthdays, festive occasions, and evening parties. Wear it with accessories to have a statement. Our{"  "}
                    <strong className="font-semibold">designer organza sarees</strong>{"  "}
                    are made up of the best fabrics and modern designs that bring a touch of sophistications and beauty in every occasion. Party like a star, and enjoy as well as party in fashion with these elegant and fashionable sarees.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </ShopTransition>
  );
}
