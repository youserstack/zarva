import NaverShopping from "@/components/NaverShopping";

export default function Home({ searchParams }: any) {
  return (
    <main className="min-h-screen pt-[150px]">
      <section className="max-w-screen-lg /min-h-full px-4 py-12 lg:px-8">
        <NaverShopping searchParams={searchParams} />
      </section>
    </main>
  );
}
