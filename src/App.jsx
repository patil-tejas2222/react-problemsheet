import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const api = "https://dummyjson.com";// 👈 already correct
   console.log(import.meta.env.VITE_API_URL);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');

  const fetchMensWear = async () => {
    setStatus('loading');
    try {
      // 👇 CHANGE: base URL .env se liya
      const shirts = await axios.get(`${api}/products/category/mens-shirts`);
      const shoes = await axios.get(`${api}/products/category/mens-shoes`);
      
      const combined = [...shirts.data.products, ...shoes.data.products].slice(0, 8);
      setProducts(combined);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchMensWear();
  }, []);

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">AURELIUS <span>MEN</span></div>
          <div className="nav-links">
            <span>New Arrivals</span>
            <span>Collections</span>
          </div>
          <button className="refresh-btn" onClick={fetchMensWear}>Update Catalog</button>
        </div>
      </nav>

      <header className="hero">
        <h1>Essential Men's Wear</h1>
        <p>Curated English classics for the modern gentleman.</p>
      </header>

      <main className="shop-floor">
        {status === 'loading' && (
          <div className="product-grid">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="skeleton-item">
                <div className="skeleton-box shimmer"></div>
                <div className="skeleton-line shimmer short"></div>
                <div className="skeleton-line shimmer"></div>
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="error-state">
            <h2>Connection Interrupted</h2>
            <p>We couldn't load the collection. Please check your network.</p>
            <button className="retry-btn" onClick={fetchMensWear}>Retry Connection</button>
          </div>
        )}

        {status === 'success' && (
          <div className="product-grid">
            {products.map((item) => (
              <div key={item.id} className="clothing-card">
                <div className="image-holder">
                  <img src={item.thumbnail} alt={item.title} />
                  {item.discountPercentage > 15 && <span className="tag">Limited Edition</span>}
                </div>
                <div className="details">
                  <span className="brand">Essentials</span>
                  <h3>{item.title}</h3>
                  <div className="price-row">
                    <span className="price">${item.price}</span>
                    <button className="add-icon">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <footer className="footer">
        © 2024 Aurelius Men's Boutique | London • New York • Dubai
      </footer>
    </div>
  );
}

export default App;
