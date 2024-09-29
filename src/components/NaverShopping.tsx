import FilterContainer from "@/components/FilterContainer";

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

const ITEMS_PER_PAGE = 10;

export default async function NaverShopping({ searchParams }: { searchParams: SearchParams }) {
  // query string parameters
  const page = Number(searchParams.page) || 1;

  const query = searchParams.query || "제품";
  const display = ITEMS_PER_PAGE;
  const start = (page - 1) * ITEMS_PER_PAGE + 1; // 1, 11, 21, 31, ...
  const sort = searchParams.sort || "sim";
  const exclude = "used:rental:cbshop";

  const url =
    `https://openapi.naver.com/v1/search/shop.json?query=${query}` +
    `&display=${display}` +
    `&start=${start}` +
    `&sort=${sort}` +
    `&exclude=${exclude}`;

  const data = await fetch(url, {
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_SEARCH_ID as string,
      "X-Naver-Client-Secret": process.env.NAVER_SEARCH_SECRET as string,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  // console.log(data);

  return <FilterContainer data={data} />;
}
