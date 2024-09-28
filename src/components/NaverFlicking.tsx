"use client";

import { useEffect, useRef } from "react";
import Flicking from "@egjs/react-flicking";
import { Arrow } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { panels } from "@/data/panels";

export default function NaverFlicking() {
  const parentRef = useRef(null);
  const flickingRef = useRef<Flicking>(null); // Flicking 인스턴스를 저장할 ref

  useEffect(() => {
    // Flicking 인스턴스가 생성된 후에 Arrow 플러그인을 추가
    if (flickingRef.current) {
      const arrowPlugin = new Arrow({
        parentEl: parentRef.current,
        prevElSelector: ".x-prev",
        nextElSelector: ".x-next",
        disabledClass: "x-disabled-arrow",
      });
      flickingRef.current.addPlugins(arrowPlugin);
    }
  }, [parentRef]);

  return (
    <div ref={parentRef} className="w-full relative flex justify-between items-center gap-2 py-2">
      <span className="x-prev text-blue-500 cursor-pointer">
        <SlArrowLeft className="stroke-[100px]" />
      </span>

      <Flicking
        ref={flickingRef} // Flicking 컴포넌트 참조 저장
        moveType="freeScroll"
        align="prev"
        deceleration={0.0005}
        bound
        // plugins={[new Arrow()]} // 좌우화살표버튼 기능추가
        // plugins={[
        //   new Arrow({
        //     parentEl: parentRef.current,
        //     // prevElSelector: ".x-prev",
        //     // nextElSelector: ".x-next",
        //   }),
        // ]} // 좌우화살표버튼 기능추가
        // circular
      >
        {panels.map((value, index) => (
          <div
            className="flicking-panel flex justify-center items-center gap-1 py-2 px-3 rounded-lg
            mr-2 bg-neutral-200 dark:bg-neutral-900 text-center"
            key={index}
          >
            <span>{value.icon}</span>
            {value.name}
          </div>
        ))}
      </Flicking>

      <span className="x-next text-blue-500 cursor-pointer ">
        <SlArrowRight className="stroke-[100px]" />
      </span>
    </div>
  );
}
