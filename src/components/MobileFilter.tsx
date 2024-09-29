"use client";

import { filters, suggestionCategories } from "@/data/filters";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuMinus, LuPlus } from "react-icons/lu";
import { MdFilterAlt } from "react-icons/md";

export default function MobileFilter() {
  const [open, setOpen] = useState(false);
  const [openFilterOptions, setOpenFilterOptions] = useState<{ [key: string]: boolean }>({});

  return (
    <div className="모바일필터 lg:hidden">
      <button
        className="모바일필터_버튼 x-item -m-2 ml-4 p-2 sm:ml-6 lg:hidden flex "
        type="button"
        onClick={() => setOpen(true)}
      >
        <MdFilterAlt className="h-5 w-5" />
      </button>

      <div
        className={`모바일필터_백드랍 fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300 ease-linear
              ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`모바일필터_모달 fixed top-0 bottom-0 right-0 w-full max-w-xs z-[200] transition-all flex
                ${open ? "translate-x-0:" : "translate-x-full"}`}
      >
        <div
          className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto 
        bg-white text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 py-4 pb-12 
          shadow-xl transition-transform duration-300 ease-in-out transform"
        >
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium">필터</h2>
            <button
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full p-2 hover:bg-neutral-200"
              onClick={() => setOpen(false)}
            >
              <IoClose />
            </button>
          </div>

          <form className="필터 mt-4 border-t dark:border-neutral-700">
            <ul className="기본_카테고리_목록 px-2 py-3 font-medium">
              {suggestionCategories.map((category) => (
                <li key={category.name}>
                  <a href={category.href} className="block px-2 py-3">
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>

            {filters.map((section) => (
              <div key={section.id} className="border-t dark:border-neutral-700 px-4 py-6">
                <h3 className="-mx-2 -my-3 flow-root">
                  <button
                    className="flex w-full items-center justify-between px-2 py-3 font-medium"
                    type="button"
                    onClick={() => {
                      setOpenFilterOptions((state) => ({
                        ...state,
                        [section.id]: !state[section.id],
                      }));
                    }}
                  >
                    <span>{section.name}</span>
                    <span className="ml-6 flex items-center">
                      {openFilterOptions[section.id] ? <LuMinus /> : <LuPlus />}
                    </span>
                  </button>
                </h3>

                {openFilterOptions[section.id] && (
                  <div className="pt-6 space-y-6">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          defaultValue={option.value}
                          defaultChecked={option.checked}
                          id={`filter-mobile-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}
