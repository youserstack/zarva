"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { SiKakaotalk, SiNaver } from "react-icons/si";

const Header = () => (
  <div className="text-center">
    <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">계정 로그인</h1>
    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
      계정이 없으신가요?
      <a
        className="ml-2 text-blue-600 decoration-2 hover:underline 
        focus:outline-none focus:underline font-medium dark:text-blue-500"
      >
        여기에서 가입하세요
      </a>
    </p>
  </div>
);

const Partition = () => (
  <div
    className="파티션 flex items-center py-3 text-xs uppercase 
  text-neutral-400 dark:text-neutral-500 
    before:flex-1 before:border-t before:border-neutral-200 before:me-6 
    after:flex-1 after:border-t after:border-neutral-200 after:ms-6 
  dark:before:border-neutral-600 dark:after:border-neutral-600"
  >
    Or
  </div>
);

const items = [
  { id: "google", icon: <FcGoogle className="w-[1.2rem] h-auto" />, label: "구글 계정으로 로그인" },
  {
    id: "naver",
    icon: <SiNaver className="w-[0.8rem] h-auto text-[#03C75A]" />,
    label: "네이버 계정으로 로그인",
  },
  {
    id: "kakao",
    icon: <SiKakaotalk className="w-[1rem] h-auto  text-[#FEE500]" />,
    label: "카카오 계정으로 로그인",
  },
];

export default function SigninBox() {
  return (
    <div
      className="로그인_박스 w-[300px] mx-auto sm:w-[400px] p-4 sm:p-7 mt-7 
      shadow-sm border rounded-xl
      bg-white dark:bg-neutral-900
      border-neutral-200 dark:border-neutral-700"
    >
      <Header />

      <div className="mt-5">
        <div className="Oauth flex flex-col gap-2">
          {items.map((item) => (
            <button
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm 
              font-medium rounded-lg border border-neutral-200 bg-white text-neutral-800 shadow-sm 
              hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 disabled:opacity-50 
              disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 
              dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              type="button"
              key={item.id}
              onClick={async () => {
                await signIn(item.id, { redirect: true, callbackUrl: "/" });
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <Partition />

        <form className="일반로그인 grid gap-y-4">
          <div>
            <label className="block text-sm mb-1 dark:text-white" htmlFor="email">
              email
            </label>

            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                className="
                py-3 px-4 block w-full 
                rounded-lg text-sm 
                border border-neutral-200 
                focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-neutral-600
                dark:border-neutral-700
                dark:bg-neutral-900 dark:text-neutral-400 
                dark:placeholder-neutral-500 
                disabled:opacity-50 disabled:pointer-events-none 
                "
              />

              {/* <div className="경고아이콘 hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                <svg
                  className="size-5 text-red-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </div> */}
            </div>

            {/* <p 
                 className="hidden text-xs text-red-600 mt-2" id="email-error">
                  Please include a valid email address so we can get back to you
                </p> */}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm  dark:text-white">
                password
              </label>

              <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500">
                비밀번호 분실
              </a>
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                required
                className="
                py-3 px-4 block w-full rounded-lg text-sm 
                border border-neutral-200 
                focus:border-blue-500 focus:ring-blue-500 
                dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600
                disabled:opacity-50 disabled:pointer-events-none"
              />

              {/* <div className="경고아이콘 hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                <svg
                  className="size-5 text-red-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </div> */}
            </div>

            {/* <p className="hidden text-xs text-red-600 mt-2" id="password-error">
              8+ characters required
            </p> */}
          </div>

          <div className="flex items-center gap-[12px]">
            <input
              className="
              flex shrink-0 mt-0.5 border-neutral-200 rounded 
              text-blue-600 focus:ring-blue-500 
              dark:bg-neutral-800 dark:border-neutral-700 
              dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-neutral-800"
              id="remember-me"
              name="remember-me"
              type="checkbox"
            />

            <label className="text-sm dark:text-white" htmlFor="remember-me">
              자동 로그인
            </label>
          </div>

          <button
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 
              text-sm font-medium rounded-lg border border-transparent bg-blue-600 
              text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 
              disabled:opacity-50 disabled:pointer-events-none"
            type="submit"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
