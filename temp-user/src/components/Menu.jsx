import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCat, setSelectedCat] = useState("Dessert");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 16;

  // Fetch all categories
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error(err));
  }, []);

  // Fetch meals for selected category
  useEffect(() => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCat}`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals || []);
        setCurrentPage(1); // reset to page 1 when category changes
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [selectedCat]);

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentMeals = meals.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(meals.length / itemsPerPage);

  return (
    <div className="flex">
      {/* Sidebar Categories */}
      <aside className="w-1/5 border-r bg-gray-50 p-4">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat.idCategory}
              onClick={() => setSelectedCat(cat.strCategory)}
              className={`cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-red-100 ${
                selectedCat === cat.strCategory
                  ? "text-red-500 font-bold"
                  : "text-gray-700"
              }`}
            >
              <img
                src={cat.strCategoryThumb}
                alt={cat.strCategory}
                className="w-6 h-6 rounded"
              />
              {cat.strCategory}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Menu Items */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">{selectedCat} Menu</h1>

        {loading ? (
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        ) : currentMeals.length === 0 ? (
          <p className="text-gray-500">No meals available for this category.</p>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-6">
              {currentMeals.map((meal) => (
                <Card key={meal.idMeal} className="overflow-hidden">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-1">
                      {meal.strMeal}
                    </h3>
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                      View Details
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
                Previous
              </Button>

              <span className="font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
