import './ProductCard.css';

export default function ProductCard() {
  return (
    <div className="product-card">
      <div className="image-container">
        <img
          src="https://xmobile.lk/wp-content/uploads/2023/10/JBL-PartyBox-Encore-Essential-Portable-Bluetooth-Speaker-1.png"
          alt="JBL PartyBox Encore Essential"
        />
      </div>

      <div className="product-info">
        <h3>JBL PartyBox Encore Essential</h3>

        <p className="description">
          Portable Bluetooth speaker with powerful bass and up to 6 hours of
          battery life.
        </p>

        <div className="price-section">
          <span className="rent-price">Rs. 3,500/day</span>
          <span className="buy-price">Rs. 145,000</span>
        </div>

        <div className="card-footer">
          <span className="status">✅ Available</span>
          <button className="book-btn">Book Now</button>
        </div>
      </div>
    </div>
  );
}