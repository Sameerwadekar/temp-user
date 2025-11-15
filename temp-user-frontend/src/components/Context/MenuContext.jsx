import { createContext, useContext, useState, useEffect } from "react";

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCat, setSelectedCat] = useState("Dessert");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data["_embedded"]["categories"])
        console.log(data);
      })
      .catch((err) => console.error(err))
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
    <MenuContext.Provider
      value={{
        categories,
        meals,
        selectedCat,
        setSelectedCat,
        loading,
        currentPage,
        setCurrentPage,
        currentMeals,
        totalPages,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
