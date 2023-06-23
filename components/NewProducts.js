import { Title } from "@/components/Title";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

export default function NewProducts({ products, wishedProducts }) {
  return (
    <Center>
      <Title>NewProducts</Title>
      <ProductsGrid products={products} wishedProducts={wishedProducts}/>
    </Center>
  );
}
