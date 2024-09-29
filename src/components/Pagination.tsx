"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

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

export default function Pagination({ data }: { data: Data }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1); // currentPage
  const [pageGroup, setPageGroup] = useState(Math.floor((page - 1) / 10)); // 10개씩 점프할 페이지그룹 (0, 0.1=>0, 0.2=>0, ... 1, 1.1=>1, ...)
  const totalPages = Math.ceil(data.total / data.display); // 전체_아이템_수를 페이지_당_아이템_수로 나눈다. (70개 아이템 / 10개 아이템 = 7페이지)

  const handlePageClick = (page: number) => {
    setPage(page);

    // 쿼리스트링파라미터를 변경하고 요청
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("page", String(page));
    router.push(`?${currentParams.toString()}`);
  };

  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
      handlePageClick(pageGroup * 10);
    }
  };

  // 이해중...
  const handleNextGroup = () => {
    const maxGroup = Math.floor((totalPages - 1) / 10);
    console.log({ maxGroup });
    if (pageGroup < maxGroup) {
      setPageGroup(pageGroup + 1);
      handlePageClick(pageGroup * 10 + 1);
    }
  };

  // 이해중...
  const getPageNumbers = () => {
    const start = pageGroup * 10 + 1;
    const end = Math.min(start + 9, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // useEffect(() => console.log({ page }), [page]);
  useEffect(() => {
    // searchParams.get("page") && setPageGroup(Math.floor((page - 1) / 10));
    if (searchParams.get("page")) {
      setPageGroup(Math.floor((page - 1) / 10));
    }
  }, []);

  useEffect(() => {
    const page = Number(searchParams.get("page"));

    if (page) {
      setPage(page);
    }
  }, [searchParams.get("page")]);

  return (
    <nav
      className="페이지네이션 isolate m-auto -space-x-[1px] flex justify-center "
      // isolate : stacking context 와 관련된 속성 (z-index)
      // -space-x-px : 수평으로 정렬된 박스요소의 좌우테두리가 서로 붙게되면 두껍께 보인다. 겹치게 만들어서 마치 한줄로 보이도록 한다. (negative margin)
    >
      <button
        className="이전버튼 relative inline-flex items-center rounded-l-md px-2 py-2 cursor-pointer
          백그라운드 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-700
          쉐도우 ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700
          이벤트
          focus:z-20 focus:outline-offset-0
          disabled:hover:cursor-not-allowed 
          disabled:hover:bg-inherit 
          disabled:text-neutral-300 
          dark:disabled:text-neutral-700"
        disabled={pageGroup === 0}
        onClick={handlePrevGroup}
      >
        <SlArrowLeft />
      </button>

      <div className="/w-fit -space-x-[1px] flex items-center flex-wrap">
        {getPageNumbers().map((num: number) => (
          <a
            href=""
            key={num}
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(num);
            }}
            className={`relative inline-flex items-center px-4  py-2 text-sm font-semibold 
              백그라운드 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-700
              쉐도우 ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700
              이벤트 focus:z-20 focus:outline-offset-0
              ${num === page ? "bg-neutral-100 dark:bg-neutral-700" : ""}`}
          >
            {num}
          </a>
        ))}
      </div>

      <button
        disabled={pageGroup === Math.floor((totalPages - 1) / 10)}
        onClick={handleNextGroup}
        className="이후버튼 relative inline-flex items-center rounded-r-md px-2 py-2 cursor-pointer
          백그라운드 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-700
          쉐도우 ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700
          이벤트 
          focus:z-20 focus:outline-offset-0
          disabled:hover:cursor-not-allowed 
          disabled:hover:bg-inherit 
          disabled:text-neutral-300 
          dark:disabled:text-neutral-700"
      >
        {/* <ChevronRightIcon className="h-5 w-5" /> */}
        <SlArrowRight />
      </button>
    </nav>
  );
}

// const prev = () => {
//   const prevPage = currentPage - 1;
//   const currentParams = new URLSearchParams(searchParams.toString());
//   currentParams.set("page", prevPage.toString());
//   router.push(`?${currentParams.toString()}`);
// };

// const next = () => {
//   const nextPage = currentPage + 1;
//   const currentParams = new URLSearchParams(searchParams.toString());
//   currentParams.set("page", nextPage.toString());
//   router.push(`?${currentParams.toString()}`);
// };

// const handlePrev = () => page > 1 && setPage((page) => page - 1);
// const handleNext = () => page < data.total && setPage((page) => page + 1);
// const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
//   const currentPage = e.currentTarget.getAttribute("data-page") as string;
//   setPage(Number(currentPage));
//   const currentParams = new URLSearchParams(searchParams);
//   currentParams.set("page", currentPage);
//   router.push(`?${currentParams.toString()}`);
// };
