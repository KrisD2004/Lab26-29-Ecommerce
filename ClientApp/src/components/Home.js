import React, { Component, useEffect } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import { ButtonToolbar } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Card } from 'reactstrap';




export function Home() {
    const [categories, setCategories] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [editCategory, setEditCategory] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        async function loadingData() {
            var response = await axios.get("https://localhost:7261/categories").then(res => {
                console.log(res.data)
                setCategories(res.data);
            });
        }
        loadingData();
    }, []);

    const openModal = (category) => {
        setSelectedCategory(category);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCategory(null);
        setModalOpen(false);
    };

    const openEditModal = (category) => {
        console.log(category)
        setEditCategory(category);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditCategory(null);
        setEditModalOpen(false);
    };

    const handleEditCategory = async () => {
        try {
            // Perform API request to update category
            await axios.put(`https://localhost:7261/Categories/${editCategory.id}`, editCategory);

            // Update categories in state after successful edit
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.id === editCategory.id ? editCategory : category
                )
            );

            // Close the modal
            closeEditModal();
        } catch (error) {
            console.error('Error editing category:', error);
        }
    };


    const handleDeleteCategory = async (categoryId) => {
        try {
            // Perform API request to delete the category
            await axios.delete(`https://localhost:7261/Categories/${categoryId}`);

            // Update categories in state after successful deletion
            setCategories((prevCategories) =>
                prevCategories.filter((category) => category.id !== categoryId)
            );

            // Close the delete confirmation modal
            closeDeleteModal();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const openDeleteModal = (categoryId) => {
        setDeleteModalOpen(true);
        setEditCategory(categoryId);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setEditCategory(null);
    };


    const categoriesHTML = categories.map((element) => (
        <Row key={element.id}>
            <Col>
                <div className="d-flex align-items-center">
                    <Button
                        style={{ marginRight: '3px', marginBottom: '3px' }}
                        onClick={() => openModal(element)}
                    >
                        {element.name}
                    </Button>
                    <Button
                        style={{ marginBottom: '3px' }}
                        color="primary"
                        onClick={() => openEditModal(element)} // Open modal for category edit
                    >
                        Edit a Category 
                    </Button>

                    <Button
                        color="danger"
                        onClick={() => openDeleteModal(element.id)} // Open delete confirmation modal
                    >
                        Delete Category
                    </Button>
                </div>
            </Col>
        </Row>
    ));

    return (
        <div className="firstDiv">
            <h1>Welcome to Kris Sto</h1>
            <p>Welcome to your new favorite store!</p>

            <div className="secDivv">
                <Container>
                    {categoriesHTML}
                </Container>
            </div>

            <Modal isOpen={modalOpen} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>
                    Products in {selectedCategory && selectedCategory.name}
                </ModalHeader>
                <ModalBody>
                    {selectedCategory &&
                        selectedCategory.products.map((product) => (
                            <Card key={product.id}>
                                <h4>{product.name}</h4>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                            </Card>
                        ))}
                </ModalBody>
            </Modal>

            <Modal isOpen={editModalOpen} toggle={closeEditModal}>
                <ModalHeader toggle={closeEditModal}>
                    Edit {editCategory && editCategory.name}
                </ModalHeader>
                <ModalBody>
                    {/* Edit form */}
                    {editCategory && (
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={editCategory.name}
                                onChange={(e) =>
                                    setEditCategory({
                                        ...editCategory,
                                        name: e.target.value
                                        

                                    })
                                }
                            />
                            <Button color="primary" onClick={handleEditCategory}>
                                Save Changes
                            </Button>
                        </div>
                    )}
                </ModalBody>
            </Modal>


            {/* Delete Confirmation Modal */}
            <Modal isOpen={deleteModalOpen} toggle={closeDeleteModal}>
                <ModalHeader toggle={closeDeleteModal}>
                    Confirm Delete
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this category?
                    <div className="d-flex justify-content-end mt-3">
                        <Button color="secondary" onClick={closeDeleteModal}>
                            Cancel
                        </Button>
                        <Button
                            color="danger"
                            className="ml-2"
                            onClick={() => handleDeleteCategory(editCategory)}
                        >
                            Delete
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}