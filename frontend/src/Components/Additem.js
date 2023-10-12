import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Form,
  Button,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import "./Additem.css";
import AuthContext from "../Assets/Context/AuthContext";

function AddItem({ itemName, apiEndpoint, fetchItems, label, setitem }) {
  const [showModal, setShowModal] = useState(false);
  const [itemValue, setItemValue] = useState("");
  const [editingItem, setEditingItem] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [allitems, setallitems] = useState([]);
  const { authTokens } = useContext(AuthContext);

  const handle_allitems = async () => {
    const data = await fetchItems();
    setallitems(data);
  };
  //console.log(allitems);
  useEffect(() => {
    handle_allitems();
  }, []);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleModalSave = async (e) => {
    e.preventDefault();
    if (editingItem) {
      try {
        const response = await fetch(`${apiEndpoint}/${editItemId}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.access}`,
          },
          body: JSON.stringify({ name: editItemName }),
        });
        if (response.status === 200) {
          alert(`${itemName} edited successfully.`);
        } else {
          alert(`Cannot edit ${itemName}, please try later.`);
        }
        handle_allitems();
        setEditItemId(null);
        setEditItemName("");
        setEditingItem(false);
      } catch (error) {
        console.error(`Error editing ${itemName}:`, error);
      }
    } else {
      try {
        const response = await fetch(`${apiEndpoint}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.access}`,
          },
          body: JSON.stringify({ name: itemValue }),
        });
        const data = await response.json();
        if (response.status === 401) {
          alert(`Error occurred. Please try later.`);
        } else {
          alert("Item Added Successfully");
        }
        //console.log(data);
        setItemValue("");
        handle_allitems();
      } catch (error) {
        alert(`Cannot add ${itemName}. Please try later.`);
      }
    }
    fetchItems();
  };

  const handleItemDelete = async (id) => {
    try {
      const response = await fetch(`${apiEndpoint}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });
      const data = response.status;
      //console.log(data);
      handle_allitems();
    } catch (error) {
      //console.log(error);
      alert("An error occurred. Please try later!");
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(true);
    setEditItemId(item.id);
    setEditItemName(item.name);
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add/Edit {itemName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Add {itemName}</Form.Label>
            <Form.Control
              type="text"
              value={editingItem ? editItemName : itemValue}
              onChange={(e) => {
                if (editingItem) {
                  setEditItemName(e.target.value);
                } else {
                  setItemValue(e.target.value);
                }
              }}
            />
            <div className="modal_form_buttons">
              {editingItem ? (
                <Button
                  variant="danger"
                  className="modal_form_close"
                  onClick={() => {
                    setEditingItem(false);
                  }}
                >
                  Cancel Edit
                </Button>
              ) : (
                <Button
                  variant="danger"
                  className="modal_form_close"
                  onClick={handleModal}
                >
                  Close
                </Button>
              )}

              <Button variant="success" onClick={(e) => handleModalSave(e)}>
                Save
              </Button>
            </div>
          </Form>
          <div className="all_items">
            <h2>Edit {itemName}</h2>

            {allitems?.map((item, index) => (
              <div className="item" key={index}>
                <p className="modal_item_name">{item.name}</p>
                <div className="item_buttons">
                  <Button
                    variant="primary"
                    className="modal_item_edit"
                    onClick={() => handleEditItem(item)}
                  >
                    Edit
                  </Button>
                  &nbsp;
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleItemDelete(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>

      <DropdownButton
        as={ButtonGroup}
        // size="lg"
        variant="secondary"
        style={{ marginTop: ".5rem" }}
        title={label}
      >
        {allitems?.map((item, index) => (
          <Dropdown.Item
            eventKey={index}
            onClick={(e) => {
              setItemValue(item.name);
              setitem(item);

              setEditItemId(item.id);
            }}
          >
            {item.name}
          </Dropdown.Item>
        ))}

        <Dropdown.Divider />
        <Dropdown.Item onClick={handleModal}>Add/Edit {itemName}</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

export default AddItem;
