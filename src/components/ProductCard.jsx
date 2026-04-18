import { Link } from 'react-router-dom';
import '../pages/Home.css'
import { useCart } from '../context/CartContext';

export default function PoductCard({product}) {
    const { addToCart, cartItems} = useCart();

    const productcheck = cartItems.find(item => item.id === product.id);
    const productQuantity = productcheck ? ` (${productcheck.quantity})` : '';

    return (
<div className='product-card'>
            <img style={{width: '100%', height: 'auto', objectFit: 'cover'}} src={product.image} alt={product.name} />
            <div>
              <h2 style={{textAlign: 'left', padding: '0.5rem'}}> {product.name}</h2>
              <p style={{padding:'0.5rem', textAlign: 'left', fontSize: '1.25rem', fontWeight: 'bold'}}>${product.price.toFixed(2)}</p>
            </div>
            <div style={{padding: '0.5rem', display: 'flex', gap: '0.5rem'}}>
              <Link className='btn btn-secondary' to={`/products/${product.id}`}>View Details</Link>
              <button onClick={() => addToCart(product.id)} className='btn btn-primary'>Add to Cart {productQuantity}</button>
              </div>
          </div>
    );
}