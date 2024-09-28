"use client";

import React, { useState } from "react";
import { MdArrowRight } from "react-icons/md";

interface MediumCategory {
  name: string;
  minor: string[];
}

interface MajorCategory {
  name: string;
  medium: MediumCategory[];
  icon?: React.ReactNode;
}

const majorCategories: MajorCategory[] = [
  {
    name: "패션",
    medium: [
      { name: "남성패션", minor: ["남성의류", "남성신발"] },
      { name: "여성패션", minor: ["여성의류", "여성신발"] },
    ],
    icon: (
      <img
        src="https://shopping-phinf.pstatic.net/202201/c9f5abb3-97ec-4513-8051-5f376c033801.png?type=f32"
        alt=""
      ></img>
    ),
  },
  {
    name: "컴퓨터",
    medium: [
      { name: "노트북", minor: ["애플맥북", "LG그램"] },
      { name: "데스크탑", minor: ["브랜드PC", "올인원PC"] },
      { name: "모니터", minor: ["게이밍모니터", "와이드모니터"] },
      { name: "키보드/마우스", minor: ["키보드", "마우스"] },
    ],
    icon: (
      <img
        src="https://shopping-phinf.pstatic.net/202201/49e2c400-2362-4256-a5f4-07c476f160ac.png?type=f32"
        alt=""
      ></img>
    ),
  },
  {
    name: "가구/인테리어",
    medium: [
      { name: "소파", minor: ["매트리스", "토퍼"] },
      { name: "의자", minor: ["게이밍의자", "사무용의자", "좌식의자"] },
    ],
    icon: (
      <img
        src="https://shopping-phinf.pstatic.net/202201/4e2af214-17f0-4d00-a310-dab5dd008d6f.png?type=f32"
        alt=""
      ></img>
    ),
  },
];

export default function CategoryMenu() {
  const [majorIndex, setMajorIndex] = useState<number>(0);
  const [mediumIndex, setMediumIndex] = useState<number | null>(null);

  const mediumCategories = majorCategories[majorIndex].medium;
  const minorCategories = mediumIndex !== null ? mediumCategories[mediumIndex].minor : [];

  return (
    <div
      className="x-layer-color x-primary-color flex w-fit category text-xs shadow-lg border
      [&_>_ul]:border-r
      [&_>_ul:last-of-type]:border-r-0
      [&_>_ul]:w-[180px]
      [&_>_ul]:p-2
      [&_li:hover]:rounded-sm
      [&_li_a]:flex
      [&_li_a]:justify-between
      [&_li_a]:items-center
      [&_li_a]:px-[7px]
      [&_li_a]:leading-[28px]
      [&_svg]:text-lg
      [&_img]:w-[15px]
      [&_img]:h-[15px]"
    >
      {/* 대분류 */}
      <ul className="major">
        {majorCategories.map((category, index) => (
          <li
            key={index}
            onMouseEnter={() => {
              setMajorIndex(index);
              setMediumIndex(null); // 대분류에 마우스를 올리면 소분류는 숨김
            }}
          >
            <a href="#">
              <span className="flex items-center gap-2">
                {category.icon}
                {category.name}
              </span>

              <MdArrowRight />
            </a>
          </li>
        ))}
      </ul>

      {/* 중분류 */}
      <ul className="medium ">
        {mediumCategories.map((subcategory, index) => (
          <li
            key={index}
            onMouseEnter={() => setMediumIndex(index)} // 중분류에 마우스를 올리면 해당 소분류를 표시
          >
            <a href="#">
              {subcategory.name}

              <MdArrowRight />
            </a>
          </li>
        ))}
      </ul>

      {/* 소분류 */}
      {mediumIndex !== null && (
        <ul className="minor ">
          {minorCategories.map((minorItem, index) => (
            <li key={index}>
              <a href="#">{minorItem}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// const categories = [
//   {
//     name: "전자제품",
//     sub: [
//       {
//         name: "컴퓨터",
//         sub: [{ name: "노트북" }, { name: "데스크탑" }, { name: "키보드" }, { name: "마우스" }],
//       },
//       { name: "TV" },
//       { name: "냉장고" },
//     ],
//   },
//   { name: "패션", sub: [{ name: "남성의류" }, { name: "여성의류" }] },
//   { name: "인테리어", sub: [{ name: "의자" }, { name: "소파" }] },
// ];
