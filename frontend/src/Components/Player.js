import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Form,
  Button,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";

import AuthContext from "../Assets/Context/AuthContext";

function Player({ itemType, apiEndpoint, fetchItems, label, setitem }) {
  const [showModal, setShowModal] = useState(false);
  const [itemValue, setItemValue] = useState({ name: "", country: "" });
  const [editingItem, setEditingItem] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [allitems, setallitems] = useState([]);

  const { authTokens } = useContext(AuthContext);

  const handle_allitems = async () => {
    const data = await fetchItems();
    setallitems(data);
  };
  // console.log(allitems);
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
          body: JSON.stringify(itemValue),
        });
        if (response.status === 200) {
          alert(`${itemType} edited successfully.`);
        } else {
          alert(`Cannot edit ${itemType}, please try later.`);
        }
        handle_allitems();
        setEditItemId(null);
        setItemValue({ name: "", country: "" });
        setEditingItem(false);
      } catch (error) {
        console.error(`Error editing ${itemType}:`, error);
      }
    } else {
      try {
        const response = await fetch(`${apiEndpoint}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.access}`,
          },
          body: JSON.stringify(itemValue),
        });
        const data = await response.json();
        if (response.status === 401) {
          alert(`Error occurred. Please try later.`);
        } else {
          alert("Player added successfully");
        }

        setItemValue({ name: "", country: "" });
      } catch (error) {
        console.log(error);
        alert(`Cannot add ${itemType}. Please try later.`);
      }
    }
    handle_allitems();
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

      handle_allitems();
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try later!");
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(true);
    setEditItemId(item.id);
    setItemValue({ name: item.name, country: item.country });
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add/Edit {itemType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Add {itemType}</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={itemValue.name}
              onChange={(e) =>
                setItemValue({ ...itemValue, name: e.target.value })
              }
            />
            <Form.Control
              type="text"
              placeholder="Country"
              value={itemValue.country}
              style={{ marginTop: "1rem" }}
              onChange={(e) =>
                setItemValue({ ...itemValue, country: e.target.value })
              }
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
            <h2>Edit {itemType}</h2>

            {allitems?.map((item, index) => (
              <div className="item" key={index}>
                <p className="modal_item_name">{item.name}</p>
                <p className="modal_item_country">{item.country}</p>
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
        // size="sm"
        variant="secondary"
        title={label}
        style={{ marginTop: ".5rem" }}
      >
        {allitems?.map((item, index) => (
          <Dropdown.Item
            eventKey={index}
            onClick={(e) => {
              setItemValue({ name: item.name, country: item.country });
              setitem(item);
              setEditItemId(item.id);
            }}
          >
            {item.name} - {item.country}
          </Dropdown.Item>
        ))}

        <Dropdown.Divider />
        <Dropdown.Item onClick={handleModal}>Add/Edit {itemType}</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

export default Player;
