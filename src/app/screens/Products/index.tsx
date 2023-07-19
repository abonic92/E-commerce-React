import React, { useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import styles from "./styles.module.css";
import CardList from "../../components/CardList";
import CardChildren from "../../components/CardChildren";
import { Category, Product } from "../Interface";


const fetchCategories = async () => {
  const response = await fetch("https://api.escuelajs.co/api/v1/categories");
  if (!response.ok) {
    const errorMessage = "Failed to fetch categories";
    throw new Error(errorMessage);
  }
  const data = await response.json();
  return data as Category[];
};

const fetchProducts = async (query: string) => {
  const response = await fetch(`https://api.escuelajs.co/api/v1/products${query}`);
  if (!response.ok) {
    const errorMessage = "Failed to fetch products";
    throw new Error(errorMessage);
  }
  const data = await response.json();
  return data as Product[];
};

const Products: React.FC = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMin(e.target.value);
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMax(e.target.value);
  };

  const handleFilterClick = () => {
    const queryParams = `?title=${title}&categoryId=${category}&price_min=${priceMin}&price_max=${priceMax}`;
    setFilteredProductsQuery(queryParams);
  };

  const handleClearFilters = () => {
    setTitle("");
    setCategory("");
    setPriceMin("");
    setPriceMax("");
    setFilteredProductsQuery("");
  };

  const { data: categoriesData, isLoading: isLoadingCategories, error: categoriesError } = useQuery<Category[]>(
    "categories",
    fetchCategories,
    {
      onSuccess: (data) => {
        setCategories(data);
      }
    }
  );

  const [filteredProductsQuery, setFilteredProductsQuery] = useState("");

  const { data: productsData, isLoading: isLoadingProducts, error: productsError } = useQuery<Product[]>(
    ["products", filteredProductsQuery],
    () => fetchProducts(filteredProductsQuery)
  );

  if (isLoadingCategories || isLoadingProducts) {
    return <Loader />;
  }

  if (categoriesError || productsError) {
    return <Error message={(categoriesError || productsError).message} />;
  }

  const filteredProducts = productsData || [];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.filtersContainer}>
        <h3 className={styles.filterTitle}>Opciones de Filtrado</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          className={styles.filterInput}
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className={styles.filterSelect}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id.toString()}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={priceMin}
          onChange={handlePriceMinChange}
          className={styles.filterInput}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceMax}
          onChange={handlePriceMaxChange}
          className={styles.filterInput}
        />
        <button onClick={handleFilterClick} className={`${styles.filterButton} ${styles.filterButtonFilter}`}>
          Filtrar
        </button>
        <button onClick={handleClearFilters} className={`${styles.filterButton} ${styles.filterButtonClear}`}>
          Clear Filters
        </button>
      </div>

      <div className={styles.productList}>
        <h2>Product List</h2>
        
        {filteredProducts.length > 0 ? (
          <CardList>
            {filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <CardChildren
                  image={product.images[0]}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                />
              </div>
            ))}
          </CardList>
        ) : (
          <h1 className={styles.noProductsMessage}>No products found.</h1>
        )}
      </div>
    </div>
  );
};

export default Products;
