import { CategoryFilter } from "../components/filter";
import ProductList from "../components/product-list";

import { TopBar } from "../components/topbar";

export const Home = () => {
  return (
    <main className="w-full bg-white">
        <div className="container  mx-auto w-full max-w-[90%]">
      <TopBar />
      <br />
      
      <div className=" grid ds:grid-cols-1 gap-6 breakpoint:grid-cols-3">
        <CategoryFilter />
        <ProductList />
      </div>
    </div>
    </main>
  );
};
