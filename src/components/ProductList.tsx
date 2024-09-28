import Link from "next/link";

export default function ProductList({ items }: { items: {}[] }) {
  return (
    <div className="제품리스트 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div
        className="grid grid-cols-1 gap-x-6 gap-y-10 
        sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        {items.map((item: any) => (
          <Link key={item.productId} href={item.link} className="group" target="_blank">
            <div
              className="제품이미지 h-[200px] w-full overflow-hidden rounded-lg 
              bg-gray-200 
              /xl:aspect-h-8 /xl:aspect-w-7
              /aspect-h-1 /aspect-w-1 
              "
            >
              <img
                src={item.image}
                alt={""}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>

            <h3 className="제품명 mt-4 text-sm ">{item.title.replace(/<\/?[^>]+(>|$)/g, "")}</h3>

            <p className="최저가 mt-1 text-lg font-medium">
              {item.lprice.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
