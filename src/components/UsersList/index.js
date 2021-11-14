import "./index.css";

const UsersList = (props) => {
  const { userDetails, onDeleteUser } = props;
  const { name, email, role, id } = userDetails;
  const onDelete = () => {
    onDeleteUser(id);
  };

  return (
    <div>
      <li className="user-card-container">
        <input type="checkbox" />
        <p className="user-details">{name}</p>
        <p className="user-details">{email}</p>
        <p className="user-details">{role}</p>

        <button
          type="button"
          className="delete-button"
          onClick={onDelete}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/delete-img.png "
            alt="delete"
            className="delete-img"
          />
        </button>
      </li>
      <hr />
    </div>
  );
};
export default UsersList;
