
  
  interface Category{
    id: number;
    name: string;
    image: string;
    creationAt: string;
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

  interface RouteParams {
    categoryId: string;
    [key: string]: string | undefined;
  }
  


  interface LoginUserProps {
    setLoggedIn: (loggedIn: boolean) => void;
    setUserName: (userName: string) => void;
  }


  interface UserData {
    id: number;
    email: string;
    name: string;
    role: string;
  }

  
  export { Category, Product, LoginUserProps, RouteParams, UserData };
  