import axios from "axios";

const getProducts = async () => {
  const response = await axios("https://api.escuelajs.co/api/v1/products");
  return response.data;
};

export default getProducts;
