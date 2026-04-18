import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../products/products";
import '../components/Navbar.css' 
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart, cartItems } = useCart();

  
  

  useEffect(() => {
    const fetchedProduct = getProductById(Number(id));
    if (!fetchedProduct) {
      navigate("/");
      return;
    }
    setProduct(fetchedProduct);
    
  }, [id]);

  console.log(product);



    if (!product) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Loading...</h1>
            </div>
        );
    }
    
    const productcheck = cartItems.find(item => item.id === Number(product.id));
    const productQuantity = productcheck ? ` (${productcheck.quantity})` : '';


    return (
    <div className='product-card'>
            <img style={{width: '50%', height: 'auto', objectFit: 'cover'}} src={product.image} alt={product.name} />
            <div>
              <h2 style={{textAlign: 'left', padding: '0.5rem'}}> {product.name}</h2>
              <h3 style={{padding: '0.5rem', textAlign: 'left', fontSize: '1.1rem', fontWeight: 'normal'}}>{product.description}</h3>
              <p style={{padding:'0.5rem', textAlign: 'left', fontSize: '1.25rem', fontWeight: 'bold'}}>${product.price.toFixed(2)}</p>
            </div>
            
            <div style={{padding: '0.5rem', display: 'flex', gap: '0.5rem'}}>
              <button onClick={() => addToCart(product.id)} className='btn btn-primary'>Add to Cart {productQuantity}</button>
            </div>
    </div>
    );
}