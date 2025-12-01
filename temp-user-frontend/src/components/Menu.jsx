import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import FilterSheet from "./ui/FilterSheet";
import { useMenu } from "./Context/MenuContext";
import Loader from "@/components/ui/Loader";
import DialogStickyFooterDemo from "./MealDialog";

export default function Menu() {
  const {
    categories,
    selectedCat,
    loading,
    currentMeals,
    currentPage,
    setCurrentPage,
    totalPages,
    fetchProductsByCategory,
  } = useMenu();

  return (
    <div className="flex">
      {/* Sidebar Categories */}
      <aside className="w-1/5 border-r bg-gray-50 p-4 sm:block hidden">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat.idCategory}
              onClick={() => fetchProductsByCategory(cat._links.products.href)}
              className={`cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-red-100 ${
                selectedCat === cat.strCategory
                  ? "text-red-500 font-bold"
                  : "text-gray-700"
              }`}
            >
              <img
                src="https://media.istockphoto.com/id/1817174766/photo/pink-homemade-ice-cream.jpg?s=2048x2048&w=is&k=20&c=NahMADv-dOSZCOyX_VelNyEkx80EBTRotNnqsY8kz0w="
                alt={cat.strCategory}
                className="w-6 h-6 rounded"
              />
              {cat.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Filter Icon for Small Screens */}
      <div className="block sm:hidden absolute top-[90px] right-5">
        <FilterSheet />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <h1 className="text-2xl font-bold mb-4">{selectedCat} Menu</h1>

        {loading ? (
          <div className="flex justify-center items-center w-full h-[60vh]">
            <Loader />
          </div>
        ) : currentMeals.length === 0 ? (
          <p className="text-gray-500">No meals available for this category.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
              {currentMeals.map((meal) => (
                <Card key={meal.idMeal} className="overflow-hidden ">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/08/18/00/37/ice-1601932_960_720.jpg"
                    alt={meal.strMeal}
                    className="w-full h-40 object-cover  mt-0"
                  />
                  <CardContent className="">
                    <div className="flex justify-between  items-center">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-1">
                        {meal.name}
                      </h3>
                      <DialogStickyFooterDemo
                        imgLink={meal.strMealThumb}
                        title={meal.name}
                        description = {meal.description}
                        price = {meal.price}
                      />
                    </div>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-1">
                      Rs.{meal.price}
                    </h3>
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                      Add To Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <ChevronLeft />
              </Button>

              <span className="font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <ChevronRight />
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
