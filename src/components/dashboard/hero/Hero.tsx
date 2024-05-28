import "./style.scss"

function Hero() {
  return (
    <div className="hero__section" id="home">
      <img className="hero__img" src="/images/hero-bg.jpg" alt="" />
      <div>
        <h1>Convert Your Skins to <br />Real-World Profits</h1>
        <p>Skinswap is the most secure and easiest way to get paid for selling your skins. Our platform offers a seamless and hassle-free experience for gamers looking to monetize their in-game cosmetic items. </p>
        <button>Sell Your Skins</button>
      </div>
    </div>
  )
}
export default Hero