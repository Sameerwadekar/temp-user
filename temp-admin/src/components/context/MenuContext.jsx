import { createContext, useContext, useEffect,useState } from "react";

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [tableData, setTableData] = useState([]);
  const [category,setCategory] = useState([]);

  // Fetch product data
  useEffect(() => {
    fetch("http://localhost:8080/product")
      .then((res) => res.json())
      .then((data) => setTableData(data["_embedded"]["products"]))
      .catch((err) => console.log(err));
  }, []);

  //fetch categories
  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then((res) => res.json())
      .then((data) => setCategory(data["_embedded"]["categories"]))
      .catch((err) => console.log(err));
  }, []);

  const fetchProductsByCategory = ((link)=>{
    fetch(link)
    .then(res=>res.json())
    .then(data=>setTableData(data["_embedded"]["products"]))
    .catch(err=>console.log(err))
  })

  return (
    <MenuContext.Provider
    value={{
        tableData,
        setTableData,
        category,
        setCategory,
        fetchProductsByCategory
    }}>
        {children}
    </MenuContext.Provider>
  )
}

export function useMenu() {
    return useContext(MenuContext)
}
