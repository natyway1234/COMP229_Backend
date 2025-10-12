// Reusable list component that renders multiple row components
import RowComponent from "./rowComponent";

function ListComponent( {items} ){
    return(
        <div className="projects-grid">
            {/* Map through items array and render each as a RowComponent */}
            {items.map((itemList, index) => (
                <RowComponent key={index} item={itemList}/>
            ))}
        </div>
    );
}

export default ListComponent;