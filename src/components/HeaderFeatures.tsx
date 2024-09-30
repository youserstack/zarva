"use client";

import AccountButton from "@/components/AccountButton";
import { FaBasketShopping } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HeaderFeatures() {
  const { data: session } = useSession();

  return (
    <div className="text-white flex justify-end items-center gap-4 [&_>_*]:cursor-pointer">
      {session ? (
        <>
          <IoIosNotifications className="text-xl" />
          <FaBasketShopping className="text-xl" />
          <AccountButton />
        </>
      ) : (
        <>
          <FaBasketShopping className="text-xl" />
          <Link
            className="로그인버튼 px-4 py-1 inline-flex items-center gap-x-2 text-sm 
            font-medium rounded-lg border border-transparent 
          bg-blue-600 hover:bg-blue-700 text-white"
            type="button"
            href={"/signin"}
          >
            로그인
          </Link>
        </>
      )}
    </div>
  );
}
