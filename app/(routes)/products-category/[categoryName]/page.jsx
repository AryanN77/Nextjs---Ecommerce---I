import GlobalApi from "@/app/_utils/GlobalApi";
import React from "react";
import TopCategoryList from "../TopCategoryList";
import ProductList from "@/app/_components/ProductList";

async function ProductCategory({ params }) {
  const { categoryName } = await params;
  const prodcutList = await GlobalApi.getProductsByCategory(categoryName);
  const categoryList = await GlobalApi.getCategoryList();
  return (
    <div>
      <h2 className="bg-green-600 p-4 text-white font-bold text-3xl text-center">
        {categoryName}
      </h2>
      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={categoryName}
      />
      <div className="p-5 md:p-10">
        <ProductList productList={prodcutList} />
      </div>
    </div>
  );
}

export default ProductCategory;
