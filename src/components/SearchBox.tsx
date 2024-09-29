"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CompositionEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

const items = [
  { id: 0, value: "시디즈1" },
  { id: 1, value: "시디즈2" },
  { id: 2, value: "시디즈3" },
  { id: 3, value: "이케아4" },
  { id: 4, value: "이케아5" },
  { id: 5, value: "이케아6" },
  { id: 6, value: "이이이케아" },
  { id: 7, value: "nike" },
  { id: 8, value: "nikeeee" },
  { id: 9, value: "nik" },
  { id: 10, value: "nikenike" },
];

// 공백제거하는 유틸리티 함수
const trimQuery = (query: string) => query.replace(/^\s+/, "").replace(/\s{2,}/g, " ");

export default function SearchBox() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isComposing, setIsComposing] = useState(false); // 2바이트한글단어 완성중인지 상태변수
  const filteredItems = items.filter((item) =>
    item.value.toLowerCase().includes(query.toLowerCase())
  );

  const pushQuery = (query: string) => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("query", query);
    currentParams.set("page", "1");
    router.push(`?${currentParams.toString()}`);
  };
  const resetQuery = () => {
    setFocusedIndex(-1);
    setOpen(false);
  };
  const submitSuggestionQuery = (suggestionQuery: string) => {
    setQuery(suggestionQuery);
    resetQuery();
    pushQuery(suggestionQuery); // 쿼리요청
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };
  const handleCompositionEnd = (e: CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    // setQuery(e.target.value); // 최종 조합된 텍스트를 반영
    setQuery(e.currentTarget.value); // 최종 조합된 텍스트를 반영
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    setOpen(true);
    // console.log(e.nativeEvent.isComposing);

    if (e.key === "ArrowDown") {
      e.preventDefault();

      // 조합 중이면 화살표 키 이벤트를 처리하지 않음
      if (isComposing) return;

      setFocusedIndex((prev: number) => (prev < filteredItems.length - 1 ? prev + 1 : -1));
      // setFocusedIndex((prev: number) => prev < filteredItems.length - 1 ? (prev + 1) % filteredItems.length  : -1);
      // ArrowDown은 기본적으로 다음요소로 인덱스를 증가해야한다.
      // 처음부터 카운팅을 증가하다가... 마지막(length-1)이되면 타겟인덱스는 처음인덱스가된다.
      // if (focusedIndex < filteredItems.length - 1)
      //   setFocusedIndex((prev) => (prev + 1) % filteredItems.length);
      // else setFocusedIndex(-1);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();

      // 조합 중이면 화살표 키 이벤트를 처리하지 않음
      if (isComposing) return;

      setFocusedIndex((prev: number) => (prev > -1 ? prev - 1 : filteredItems.length - 1));
      // setFocusedIndex((prev: number) => prev > -1 ? (prev - 1) % filteredItems.length : filteredItems.length - 1);
      // ArrowUp은 기본적으로 이전요소로 인덱스를 감소해야한다.
      // 마지막부터 카운팅을 감소하다가... 처음(-1)이되면 타겟인덱스는 마지막인덱스가된다.
      // if (focusedIndex > -1) setFocusedIndex((prev) => (prev - 1) % filteredItems.length);
      // else setFocusedIndex(filteredItems.length - 1); // 처음이되면 타겟인덱스는 마지막인덱스가된다.
    }
    if (e.key === "Escape") {
      e.preventDefault();
      resetQuery();
      inputRef.current?.blur(); // input 요소의 포커스 해제
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const suggestionQuery = filteredItems[focusedIndex]?.value;
      const currentQuery = e.currentTarget.value;
      const query = suggestionQuery || currentQuery;
      const trimmedQuery = trimQuery(query); // 공백 제거
      setQuery(trimmedQuery); // 새롭게 공백 제거된 검색어를 갱신
      pushQuery(trimmedQuery); // 쿼리요청
      resetQuery();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      // input 외부 클릭 시 닫히도록 설정
      if (
        !inputRef.current?.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        // console.log(e.target);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative   max-w-sm  md:w-[300px] ">
      <div className="쿼리박스 relative">
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3.5">
          <svg
            className="shrink-0 size-4 /text-neutral-400 /dark:text-white/60"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>

        <input
          className="x-default-color // 인풋은기본색상을설정해주어야한다
          w-full py-[3px] ps-10 pe-4 block text-sm rounded-md outline-none
          focus:ring focus:ring-lime-500"
          ref={inputRef}
          type="text"
          placeholder="검색"
          autoComplete="off"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            if (e.target.value === "\x1F" || e.target.value === "\x1E") return;
            setQuery(e.target.value);
            setFocusedIndex(-1);
          }}
          // 키다운에서 화살표키를 누르면 한글과 같은 2바이트단어를 완성상태로 변경해주어야하는데, 이때에 사용되는 컴포지션핸들러
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onKeyDown={handleKeyDown} // core handler
        />
      </div>

      {filteredItems.length > 0 && (
        <div
          ref={dropdownRef}
          className={`드랍다운 x-layer-color absolute w-full max-h-[500px] 
          mt-1 p-2 rounded-xl overflow-y-auto overflow-hidden z-50
          
          ring-1 ring-black dark:ring-neutral-700 ring-opacity-5 
          shadow-lg dark:shadow-neutral-700
          ${open ? "block" : "hidden"}
          
          [&::-webkit-scrollbar]:w-2 
          [&::-webkit-scrollbar-thumb]:rounded-full 
          [&::-webkit-scrollbar-track]:bg-neutral-100 
          [&::-webkit-scrollbar-thumb]:bg-neutral-300 
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700 
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
        `}
        >
          {filteredItems.map((v, i) => (
            <a
              key={i}
              tabIndex={i}
              onClick={() => submitSuggestionQuery(v.value)}
              className={`제안어 flex items-center gap-x-3 rounded-lg py-2 px-3 cursor-pointer
              ${focusedIndex === i ? "bg-neutral-100 dark:bg-neutral-800" : ""}`}
            >
              <span className="text-sm">{v.value}</span>
              {/* <span className="ms-auto text-xs">Gmail</span> */}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
