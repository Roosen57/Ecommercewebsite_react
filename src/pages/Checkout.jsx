import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../components/Navbar.css'

export default function Checkout() {
  const { getCartItemswithDetails, removeFromCart, addToCart, removeCompletelyFromCart, getTotalCartPrice, emptyCart } = useCart();
  const cartItemsWithDetails = getCartItemswithDetails();
  const Navigate = useNavigate();
  if (cartItemsWithDetails.length === 0) {
    Navigate('/');
  }

  function emptyCartbtn() {
    emptyCart();
    alert("Thank you for your purchase!");
    Navigate('/');
  }

  return (
    <div>
      <h1>Checkout Page</h1>
      {cartItemsWithDetails.map(item => (
        <div style={{margin: '10px', backgroundColor: '#3d3d3d', padding: '10px', alignContent: 'center', display: 'flex', height: '50px', marginBottom: '20px', overflow: 'hidden'}} key={item.id}>
          <img style={{width: 'auto', height: '100%', objectFit: 'cover'}} src={item.product.image} alt={item.product.name} />
          <h2 style={{padding:'10px'}}>{item.product.name}</h2>
          
          <p style={{padding:'10px'}}>Price: ${item.product.price.toFixed(2)}</p>
          <button onClick={() => removeFromCart(item.product.id)} style={{padding:'10px'}}>-</button>
          <p style={{padding:'10px'}}>{item.quantity}</p>
          <button onClick={() => addToCart(item.product.id)} style={{padding:'10px'}}>+</button>
          <p style={{padding:'10px'}}>Total: ${(item.quantity * item.product.price).toFixed(2)}</p>
          <button onClick={() => removeCompletelyFromCart(item.product.id)} style={{padding:'10px'}}>Remove</button>
        </div>
        
      ))}
      <div style={{backgroundColor: '#3d3d3d', padding: '10px'}}>
        <h2>Total: {getTotalCartPrice().toFixed(2)}</h2>
        <button className='btn btn-primary' onClick={() => emptyCartbtn()} style={{padding:'10px', width:'100%'}}>Checkout</button>
      </div>
    </div>
  );
}