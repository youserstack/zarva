"use client";

import CategoryMenu from "@/components/CategoryMenu";
import { useState } from "react";

export default function CategoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative hidden md:block text-white">
      <div
        className={`fixed inset-0 bg-black z-[100] 
        transition-opacity duration-[0.7s] ease-in-out
        ${open ? "opacity-50" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      <button
        className={`relative rounded-md px-2 py-[1px] outline-none hover:bg-neutral-200/20 z-[100]
        ${open ? "bg-neutral-200/20 " : ""} `}
        onClick={() => setOpen(!open)}
      >
        카테고리
      </button>

      <div
        className={`absolute top-full min-w-[100px] z-[100] 
        ${open ? "block" : "hidden"}  `}
      >
        <CategoryMenu />
      </div>
    </div>
  );
}
