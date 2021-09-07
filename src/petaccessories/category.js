import './css/category.css'
import CategoryPhoto from './images/product1.jpg'
var CategoryCard = ()=>{
    return (
        <div style={{ boxShadow: "none"}} className="category-container">
            <div className="category-image">
                <img width="100%" src={CategoryPhoto} alt="" />
            </div>
            <div className="category-title">Cats</div>
        </div>
    );
}

export default CategoryCard;