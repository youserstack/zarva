"use client";

import CategoryButton from "@/components/CategoryButton";
import NaverFlicking from "@/components/NaverFlicking";
import SearchBox from "@/components/SearchBox";
import Link from "next/link";
import { useState } from "react";
import { FaBasketShopping } from "react-icons/fa6";
import { HiBars2 } from "react-icons/hi2";
import { IoIosNotifications, IoIosNotificationsOff } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

const HamburgerButton = ({ onClick }: any) => (
  <button
    className="햄버거버튼 { flex md:hidden } 
              relative size-9  justify-center items-center    
              text-sm font-semibold rounded-lg text-white 
              hover:bg-neutral-200/20 [&_svg]:stroke-2"
    type="button"
    onClick={onClick}
  >
    <HiBars2 />
  </button>
);

const Logo = () => (
  <Link
    className="로고 flex-none font-semibold text-xl text-white focus:outline-none focus:opacity-80"
    href={""}
  >
    ysk
  </Link>
);

export default function Header() {
  // 모바일_네비게이션
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <section className="w-full flex flex-col flex-wrap z-50 whitespace-nowrap bg-gradient-to-r from-cyan-500 to-blue-500">
        <nav
          className="GNB w-full relative max-w-5xl mx-auto px-4 
          grid grid-cols-[5fr_auto_5fr] items-center gap-3
          sm:px-6 lg:px-8 py-2"
        >
          <>
            <HamburgerButton onClick={() => setOpen(true)} />
            <CategoryButton />
          </>

          <Logo />

          <div className="text-white flex justify-end items-center gap-2">
            <FaBasketShopping className="text-xl" />
            <MdAccountCircle className="text-xl" />
            <IoIosNotifications className="text-xl" />
            <IoIosNotificationsOff className="text-xl" />
          </div>

          <div className="모바일사이드메뉴컨테이너 { fixed md:hidden } font-semibold z-[200]">
            <div
              className={`Backdrop ${open ? "block" : "hidden"} 
              fixed inset-0 bg-black bg-opacity-25 z-[200] `}
              onClick={() => setOpen(false)}
            ></div>

            <div
              className={`Drawer 
                ${open ? "translate-x-0:" : "-translate-x-full"}
                x-layer-color
                fixed top-0 left-0 w-full h-full max-w-xs basis-full grow z-[200]
                transition-all duration-300 transform 
                overflow-hidden overflow-y-auto
                p-2 space-y-4 
              `}
            >
              <div className="상단 p-2 flex justify-between items-center">
                <h3 className="font-bold">모바일 메뉴</h3>

                <button
                  className="닫기버튼 size-8 inline-flex justify-center items-center gap-x-2 rounded-full hover:bg-neutral-200  dark:hover:bg-neutral-600"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  <IoCloseOutline className="w-full h-full" />
                </button>
              </div>

              <ul className="메뉴 flex flex-col gap-0.5">
                <Link
                  href={"#home"}
                  onClick={() => setOpen(false)}
                  className="x-item p-2 flex items-center text-sm rounded-lg "
                >
                  <svg
                    className="size-4 me-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                  Home
                </Link>

                <Link
                  href={"#works"}
                  onClick={() => setOpen(false)}
                  className="x-item p-2 flex items-center text-sm rounded-lg"
                >
                  <svg
                    className="size-4 me-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 12h.01" />
                    <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                    <rect width="20" height="14" x="2" y="6" rx="2" />
                  </svg>
                  Works
                </Link>

                <Link
                  href={"#about"}
                  onClick={() => setOpen(false)}
                  className="x-item p-2 flex items-center text-sm rounded-lg"
                >
                  <svg
                    className="size-4 me-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  About
                </Link>
              </ul>
            </div>
          </div>
        </nav>

        <div className="w-full relative max-w-5xl mx-auto px-4 flex justify-between items-center gap-8 sm:px-6 lg:px-8 py-2 md:gap-3">
          <SearchBox />
        </div>
      </section>

      <section className="x-default-color w-full flex flex-col flex-wrap md:justify-start md:flex-nowrap z-50">
        <nav className="LNB w-full max-w-5xl relative mx-auto">
          <NaverFlicking />
        </nav>
      </section>
    </header>
  );
}
