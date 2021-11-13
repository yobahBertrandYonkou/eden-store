import './css/category.css'
var CategoryCard = ( { name, photoURL })=>{
    return (
        <div style={{ boxShadow: "none"}} className="category-container">
            <div className="category-image">
                <img width="100%" src={ photoURL } alt= { name } />
            </div>
            <div className="category-title">{ name }</div>
        </div>
    );
}

export default CategoryCard;