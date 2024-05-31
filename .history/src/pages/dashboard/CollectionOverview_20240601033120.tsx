import "./style.scss";
import Collection from '../../components/dashboard/collection/Collection';
import skinProducts from '../../utils/skins.products.json';


function CollectionOverview() {
	const skinCategories = Object.keys(skinProducts);
	

	return (
		<div className='collection__overview'>
			<h1>Skin Collections</h1>
			{skinCategories.map((categories, index) => (
				<Collection
               link={`/dashboard/${categories}`}
					icon={`/icons/${categories}.svg`}
					title={categories}
					skins={skinProducts[categories as keyof typeof skinProducts]}
					key={index}
				/>
			))}
		</div>
	);
}
export default CollectionOverview;
