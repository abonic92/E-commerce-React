import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import styles from './styles.module.css';

interface RouteParams {
  categoryId: string;
  [key: string]: string | undefined;
}

interface Category {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  category: Category;
}

const fetchProductsByCategory = async (categoryId: string) => {
  const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
  if (!response.ok) {
    const errorMessage = 'Failed to fetch categories';
    throw { message: errorMessage };
  };
  const data = await response.json();
  return data as Product[];
};

const ProductsByCategory: React.FC = () => {
  const { categoryId } = useParams<RouteParams>();
  const { data, isLoading, error } = useQuery<Product[]>(['products', categoryId], () => fetchProductsByCategory(categoryId));

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={(error as Error).message} />;
  }

  // Calculating pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.categoryList}>
      <h2>Products by Category: {categoryId}</h2>
      <div className={styles.categoryCards}>
        {currentProducts?.map((product) => (
          <div key={product.id} className={styles.categoryCard}>
            {product.images.length > 0 && (
              <img src={product.images[0]} alt={product.title} className={styles.cardImage} />
            )}
            <h3>{product.title}</h3>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {/* Pagination */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          {"<"}
        </button>
        <span className={styles.paginationPage}>Page: {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastProduct >= (data?.length || 0)}
          className={styles.paginationButton}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ProductsByCategory;