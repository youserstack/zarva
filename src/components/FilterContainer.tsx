"use client";

import Filter from "@/components/Filter";
import Features from "@/components/Features";
import ProductList from "@/components/ProductList";
import Pagination from "@/components/Pagination";
import { Suspense } from "react";
import FilterSkeleton from "@/components/skeletons/FilterSkeleton";
import PaginationSekleton from "@/components/skeletons/PaginationSekleton";

interface Item {
  title: string;
  link: string;
  image: string;
  lprice: string;
  hprice: string;
  mallName: string;
  productId: string;
  productType: string;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

interface Data {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: Item[];
}

export default function FilterContainer({ data }: { data: Data }) {
  return (
    <div className="필터컨테이너 [&_.x-item:hover]:text-neutral-500 pb-24 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
      <Suspense fallback={<FilterSkeleton />}>
        <Filter />
      </Suspense>

      <div className="제품리스트 lg:col-span-3 ">
        <Features />
        <ProductList items={data.items} />
        <Suspense fallback={<PaginationSekleton />}>
          <Pagination data={data} />
        </Suspense>
      </div>
    </div>
  );
}
