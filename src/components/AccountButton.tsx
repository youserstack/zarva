"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { MdAccountCircle } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function AccountButton() {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <div className="relative [&:hover_.x-margin]:block ">
      {session?.user?.image ? (
        <div className="rounded-full overflow-hidden border-2 border-white hover:border-lime-500">
          <Image src={session.user.image} alt="" width={20} height={20} />
        </div>
      ) : (
        <MdAccountCircle className="text-xl cursor-pointer" />
      )}

      <div className="계정레이어 x-margin hidden absolute top-full right-0 py-2 z-[10]">
        <ul
          className="min-w-40 rounded-lg p-2
          bg-white dark:bg-neutral-900 dark:text-neutral-300
          ring-1 ring-black dark:ring-neutral-700 ring-opacity-5 shadow-lg dark:shadow-neutral-700
          transition origin-top-right transform scale-100 opacity-100"
        >
          <div className="text-neutral-800 text-xs mt-2 mb-4 px-2">
            <p>{session?.user?.name}</p>
            <p>{session?.user?.email}</p>
          </div>

          <button
            className="로그아웃버튼 w-full px-4 py-2 text-sm inline-flex items-center gap-x-2 font-medium rounded-md 
          hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500"
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <RiLogoutCircleRLine />
            로그아웃
          </button>
        </ul>
      </div>
    </div>
  );
}
