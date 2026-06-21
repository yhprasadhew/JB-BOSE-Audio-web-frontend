import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", flexWrap: "wrap" }}>
      {/* Product 1: Your original JBL Speaker */}
      <ProductCard 
        title="JBL PartyBox Encore Essential"
        image="https://xmobile.lk/wp-content/uploads/2023/10/JBL-PartyBox-Encore-Essential-Portable-Bluetooth-Speaker-1.png"
        description="Portable Bluetooth speaker with powerful bass and up to 6 hours of battery life."
        rentPrice="3,500"
        buyPrice="145,000"
        isAvailable={true}
      />

      {/* Product 2: Example of another product using the same template! */}
      <ProductCard 
        title="Sony WH-1000XM5 Headphones"
        image="https://images.sony.com/is/image/sony/WH-1000XM5_Black_01?$PNG$" 
        description="Industry-leading noise-canceling wireless headphones with exceptional sound clarity."
        rentPrice="1,200"
        buyPrice="95,000"
        isAvailable={false} 
      />
    </div>
  );
}

export default App;