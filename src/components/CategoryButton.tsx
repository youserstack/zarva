"use client";

import CategoryMenu from "@/components/CategoryMenu";
import { useState } from "react";

export default function CategoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative hidden md:block text-white">
      <button
        className={`rounded-md px-2 py-[1px] outline-none hover:bg-neutral-200/20
          ${open ? "bg-neutral-200/20 " : ""} `}
        onClick={() => setOpen(!open)}
        onBlur={() => setOpen(false)}
      >
        카테고리
      </button>

      <div className={`${open ? "block" : "hidden"} absolute top-full z-[100] min-w-[100px]`}>
        <CategoryMenu />
      </div>
    </div>
  );
}
