import { Title } from "@/components/Title";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>NewProducts</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}
