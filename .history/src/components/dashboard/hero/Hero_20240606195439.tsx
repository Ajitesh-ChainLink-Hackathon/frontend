import useSellingItems from "../../../hooks/useSellingItems.zustand"
import "./style.scss"

function Hero() {
  const setNewSellingItem = useSellingItems(state => state.setNewSellingItem)

  const handleClick =()=> {
    setNewSellingItem({
      "idx": "6",
      "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734240/knife/n2hrhsy3gzu5ktrxa1ix.avif",
      "name": "Valkyrie",
      "player_name":"",
      "game":"Default",
      "game_price":30,
      "category": "knife"     
  })
  }
  return (
    <div className="hero__section" id="home">
      <img className="hero__img" src="/images/hero-bg.jpg" alt="" />
      <div>
        <h1>Convert Your Skins to <br />Real-World Profits</h1>
        <p>Skinswap is the most secure and easiest way to get paid for selling your skins. Our platform offers a seamless and hassle-free experience for gamers looking to monetize their in-game cosmetic items. </p>
        <button onClick={handleClick}>Sell Your Skins</button>
      </div>
    </div>
  )
}
export default Hero