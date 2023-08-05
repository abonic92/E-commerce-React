import { useMutation, useQueryClient } from "react-query";
import { UserData } from "../screens/Interface";

interface Credentials {
  email: string;
  password: string;
}

const fetchUserData = async (accessToken: string): Promise<UserData> => {
  const response = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const userData = await response.json();
  return userData;
};

const useLoginMutation = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation<UserData, Error, Credentials>(
    async (credentials) => {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      const { access_token } = data;

      // Guardar el token de acceso en el localStorage
      localStorage.setItem("accessToken", access_token);

      const userData = await fetchUserData(access_token);

      // Guardar los datos del usuario en el localStorage
      localStorage.setItem("userData", JSON.stringify(userData));

      return userData;
    },
    {
      onError: (error) => {
        throw error;
      },
      onSettled: (data, error) => {
        if (!error) {
          queryClient.invalidateQueries(["userData", data]); // Invalidate the userData query after login
        }
      },
    }
  );

  return loginMutation;
};

export default useLoginMutation;
