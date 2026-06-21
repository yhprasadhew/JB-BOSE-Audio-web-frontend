import './ProductCard.css';

// REMOVED the curly braces around props here
export default function ProductCard(props) {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={props.image} alt={props.title} />
      </div>

      <div className="product-info">
        <h3>{props.title}</h3>

        <p className="description">{props.description}</p>

        <div className="price-section">
          <span className="rent-price">Rs. {props.rentPrice}/day</span>
          <span className="buy-price">Rs. {props.buyPrice}</span>
        </div>

        <div className="card-footer">
          {/* Added props. to isAvailable here */}
          <span className="status">
            {props.isAvailable ? "✅ Available" : "❌ Out of Stock"}
          </span>
          <button className="book-btn" disabled={!props.isAvailable}>
            {props.isAvailable ? "Book Now" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}