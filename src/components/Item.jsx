import PropTypes from "prop-types";

const Item = ({ item, onDelete, onToggleStatus }) => {
  return (
    <li>
      <strong>{item.name}</strong> - Status: <span>{item.status}</span>
      <button onClick={() => onToggleStatus(item)}>
        {item.status === "open" ? "Close" : "Open"}
      </button>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </li>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired,
};

export default Item;
