import { useState } from 'react';
import { getProducts } from '../products/products';
import { preloadModule } from 'react-dom';
import { Link } from 'react-router-dom';
import './Home.css'
import ProductCard from '../components/ProductCard';

export default function Home() {


  return (
    <>
  <div>
    <h1>MaketPlace</h1>
    <h2>Your one-stop shop for all your needs</h2>
    <h3 style={{ textAlign: 'left', padding: '1rem' }}>Our Products</h3>
  </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', padding: '1rem', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
        {getProducts().map(product => (
          <ProductCard product={product} key={product.id}/> 
        ))}
      </div>
    </>
  );
}
