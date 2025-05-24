import ClientProductPage from './ClientProductPage';

// Mock data - This would typically come from an API or database
const product = {
  id: "1",
  name: "PlayStation 5 Digital Edition",
  price: 449500,
  description: "Découvrez une nouvelle génération de jeux incroyables PlayStation avec une version tout numérique de la console PS5. Profitez du chargement ultra-rapide avec un disque SSD ultra-haute vitesse, d'une immersion plus profonde avec la prise en charge du retour haptique, des déclencheurs adaptatifs et de l'audio 3D.",
  images: [
    "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=2832&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2832&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622297845775-5ff1b87b0bc7?q=80&w=2832&auto=format&fit=crop"
  ],
  category: "Consoles",
  specs: [
    "Résolution 4K",
    "SSD Ultra-rapide",
    "Ray Tracing",
    "Audio 3D",
    "Manette DualSense incluse"
  ],
  stock: 5
};

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ProductPage = async ({ params }: Props) => {
  // Await the params Promise
  const { id } = await params;
  
  // In a real app, this would be an API call using the ID
  console.log(`Loading product with ID: ${id}`);
  
  // For now, we'll just return the mock product
  // In a real app, you would fetch the product data here
  // const product = await getProduct(id);

  return <ClientProductPage product={product} />;
};

export default ProductPage;