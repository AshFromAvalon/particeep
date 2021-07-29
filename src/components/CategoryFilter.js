import { useDispatch } from "react-redux";

const CategoryFilter = ({ categories }) => {
  const dispatch = useDispatch();

  return (
    <div className="row--col">
      <h2 className="mb-2">Categories</h2>
      <p
        className="nav-category-item mb-1"
        onClick={() => dispatch({ type: "clearFilters" })}
      >
        X Clear filters
      </p>
      {categories.map((category) => {
        return (
          <div
            className={
              category.isSelected
                ? "row nav-category-item nav-category-item--active"
                : "row nav-category-item"
            }
          >
            <p onClick={() => dispatch({ type: "filter", payload: category })}>
              {category.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
