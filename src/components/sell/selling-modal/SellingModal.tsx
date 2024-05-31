import { Fragment } from 'react/jsx-runtime';
import './style.scss';
import useSellingItems from '../../../hooks/useSellingItems.zustand';

function SellingModal() {
	const newSellingItem = useSellingItems((state) => state.newSellingItem);
	const setNewSellingItem = useSellingItems((state) => state.setNewSellingItem);
   
   const handleCancel = ()=> {
      setNewSellingItem(null)
   }
	return (
		newSellingItem && (
			<Fragment>
				<div className="modal__overlay" onClick={handleCancel} />
				<article className="selling__modal">
					<span className='cancel' onClick={handleCancel}>
						<img src="/icons/cancel.svg" alt="" />
					</span>
					<img className='modal__img' src={newSellingItem.image} alt={newSellingItem.name} />
               <h2>{newSellingItem.name}</h2>
               <div className='status'>
						<img src="/icons/trade.svg" alt="" />
						<p>Tradable</p>
					</div>
               <div className='input__price'>
                  <label htmlFor="">Selling price</label>
                     <input type="number" placeholder='Type your preferred price' />
               </div>
               <div className='details'>
                  <div>
                     <span>Game Company</span>
                     <p>{newSellingItem.seller.gameCompany}</p>
                  </div>
               <div >
                  <span>Market price</span>
                  <p>${newSellingItem.price}</p>
               </div>

               </div>
               <button className='confirm__btn'>Confirm</button>
               

               
				</article>
			</Fragment>
		)
	);
}
export default SellingModal;
