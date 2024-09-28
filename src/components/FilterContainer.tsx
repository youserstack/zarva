"use client";

import Filter from "@/components/Filter";
import Features from "@/components/Features";
import ProductList from "@/components/ProductList";
import Pagination from "@/components/Pagination";

export default function FilterContainer({ data }: any) {
  return (
    <div className="필터컨테이너 [&_.x-item:hover]:text-neutral-500 pb-24 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
      <Filter />

      <div className="제품리스트 lg:col-span-3 ">
        <Features />
        <ProductList items={data.items} />
        <Pagination data={data} />
      </div>
    </div>
  );
}
