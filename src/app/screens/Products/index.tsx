import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styles from './styles.module.css';
import Loader from '../../components/Loader';
import Error from '../../components/Error';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const CategoryProducts = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { data, isLoading, error } = useQuery<Product[]>(`category_${categoryId}_products`, async () => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <div className={styles.productList}>
      <h2>Products</h2>
      <div className={styles.productCards}>
        {data.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;