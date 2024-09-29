import NaverShopping from "@/components/NaverShopping";

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main className="min-h-screen pt-[150px]">
      <section className="max-w-screen-lg /min-h-full px-4 py-12 lg:px-8">
        <NaverShopping searchParams={searchParams} />
      </section>
    </main>
  );
}
