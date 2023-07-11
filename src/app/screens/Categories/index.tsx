import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import Loader from '../../components/Loader';
import Error from '../../components/Error';


interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

const Categories = () => {
  const { data, isLoading, error } = useQuery<Category[]>('categories', async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories');
    if (!response.ok) {
      const errorMessage = "Failed to fetch categories";
      throw { message: errorMessage };
    }
    const data = await response.json();
    return data;
  });

  if (isLoading) {
    return <Loader/>
  }

  if (error) {
    return <Error message={(error as Error).message} />; 
   }

  return (
    <div className={styles.categoryList}>
      <h2>Categories</h2>
      <div className={styles.categoryCards}>
        {data?.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <Link to={`/category/${category.id}/products`}>
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
