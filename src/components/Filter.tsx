"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { filters, suggestionCategories } from "@/data/filters";
import { LuMinus, LuPlus } from "react-icons/lu";

interface OpenFilterOptions {
  [key: string]: boolean; // 키는 문자열이고 값은 boolean
}

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openFilterOptions, setOpenFilterOptions] = useState<OpenFilterOptions>({});

  const handleChangeFilter = (isChecked: boolean, name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // 체크박스가 선택된 경우
    if (isChecked) {
      // 필터 값을 쿼리 파라미터에 추가
      params.append(name, value);
    } else {
      // 체크박스가 해제된 경우, 해당 값을 삭제
      const updatedValues = params.getAll(name).filter((v) => v !== value);
      params.delete(name);
      updatedValues.forEach((v) => params.append(name, v));
    }

    // URL 업데이트 (페이지 새로고침 없이)
    router.push("?" + params.toString());
  };

  return (
    <form className="필터 hidden lg:block">
      <ul className="기본_카테고리_목록 space-y-4 pb-6 text-sm font-medium border-b dark:border-neutral-700">
        {suggestionCategories.map((category) => (
          <li key={category.name} className="x-item">
            <a href={category.href}>{category.name}</a>
          </li>
        ))}
      </ul>

      {filters.map((filter) => (
        <div key={filter.id} className="border-b dark:border-neutral-700 py-6">
          <button
            className="필터옵션버튼 x-item group flex w-full items-center justify-between py-3 text-sm -my-3"
            type="button"
            onClick={() =>
              setOpenFilterOptions((state: OpenFilterOptions) => ({
                ...state,
                [filter.id]: !state[filter.id],
              }))
            }
          >
            <span className="font-medium">{filter.name}</span>
            <span className="ml-6 flex items-center">
              {openFilterOptions[filter.id] ? <LuMinus /> : <LuPlus />}
            </span>
          </button>

          {openFilterOptions[filter.id] && (
            <div className="필터옵션상세리스트 pt-6 space-y-4">
              {filter.options.map((option, optionIdx) => (
                <div key={option.value} className="x-item flex items-center">
                  <input
                    defaultValue={option.value}
                    defaultChecked={option.checked}
                    id={`filter-${filter.id}-${optionIdx}`}
                    name={`${filter.id}[]`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={(e) => handleChangeFilter(e.target.checked, filter.id, option.value)}
                  />
                  <label htmlFor={`filter-${filter.id}-${optionIdx}`} className="ml-3 text-sm">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </form>
  );
}
