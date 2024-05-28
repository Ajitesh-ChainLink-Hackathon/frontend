import "./style.scss";

function Footer() {
   return (
     <footer className="footer__section">
       <img src="/logo.svg" alt="" />
       <div className="socials">
          <p>Facebook</p>
          <p>LinkedIn</p>
          <p>Twitter</p>
       </div>
       <p className="copyright">&copy; {new Date().getFullYear()} All rights Reserved . SkinSwap</p>
     </footer>
   )
 }
 export default Footer