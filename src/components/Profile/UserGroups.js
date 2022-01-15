import { useGlobalState } from "../../config/store";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { capitalise } from "../../utils/helperFunctions";

function UserGroups() {
  const { store } = useGlobalState();

  const groupArray = store.profileData[2].concat(store.profileData[3]);

  const groupsList = groupArray.map((group) => {
    return (
      <ListGroup.Item key={group._id}>
        <Link to={`/group/${group._id}`}>{capitalise(group.groupName)}</Link>
      </ListGroup.Item>
    );
  });

  const groups = () => {
    if (groupArray.length >= 1) {
      return <ListGroup>{groupsList}</ListGroup>;
    } else {
      return <p>You have not joined any groups, amigo</p>;
    }
  };

  return <div>{groups()}</div>;
}

export default UserGroups;
