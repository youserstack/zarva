import MobileFilter from "@/components/MobileFilter";
import SortMenuSkeleton from "@/components/skeletons/SortMenuSkeleton";
import SortMenu from "@/components/SortMenu";
import { Suspense } from "react";
import { BiSolidGridAlt } from "react-icons/bi";

export default function Features() {
  return (
    <div className="기능버튼들 flex justify-end items-center pb-4 border-b dark:border-neutral-700 ">
      <Suspense fallback={<SortMenuSkeleton />}>
        <SortMenu />
      </Suspense>

      <button className="뷰_그리드_버튼 x-item -m-2 ml-5 p-2 sm:ml-7" type="button">
        <BiSolidGridAlt />
      </button>

      <MobileFilter />
    </div>
  );
}
