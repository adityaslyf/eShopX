const Home = () => {
    return (
      <div className="video-container">
        <video autoPlay muted loop className="background-video">
          <source src="/shoppingvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay">
          <h1>Welcome to Our E-Commerce Platform</h1>
          <p>Find the best products at the best prices</p>
          <button>Shop Now</button>
        </div>
      </div>
    );
  };
  
  export default Home;
  