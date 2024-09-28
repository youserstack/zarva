"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

const sortOptions = [
  { name: "정확도순", value: "sim" },
  { name: "날짜순", value: "date" },
  { name: "높은가격순", value: "dsc" },
  { name: "낮은가격순", value: "asc" },
];

export default function SortMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChangeSort = (sort: string) => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("sort", String(sort));
    router.push(`?${currentParams.toString()}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="정렬버튼 relative inline-block text-left" ref={menuRef}>
      <button
        className="x-item group inline-flex justify-center text-sm font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        정렬
        <IoIosArrowDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0" />
      </button>

      {isOpen && (
        <div
          className="정렬옵션레이어 absolute right-0 z-10 mt-2 w-40 rounded-lg p-2
          bg-white dark:bg-neutral-900 dark:text-neutral-300
          ring-1 ring-black dark:ring-neutral-700 ring-opacity-5 shadow-lg dark:shadow-neutral-700
          transition origin-top-right transform scale-100 opacity-100"
        >
          {sortOptions.map((option) => (
            <a
              className={`
                block px-4 py-2 text-sm rounded-md cursor-pointer
                hover:bg-neutral-100 dark:hover:bg-neutral-700
                ${
                  option.value === searchParams.get("sort") // 예시로 '최신순'이 선택되었을 때
                    ? "font-medium text-neutral-900 dark:text-neutral-300"
                    : "text-neutral-500"
                }
              `}
              key={option.value}
              onClick={() => handleChangeSort(option.value)}
            >
              {option.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
