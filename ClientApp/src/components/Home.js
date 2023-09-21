import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Container, Row, Col, Modal, ModalHeader, ModalBody, Card } from 'reactstrap';
import axios from 'axios';




export function Home() {
    const [categories, setCategories] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [editCategory, setEditCategory] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: 0
    });
    const [addProductModalOpen, setAddProductModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [editProductModalOpen, setEditProductModalOpen] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);



    useEffect(() => {
        loadingData();
    }, []);
        async function loadingData() {
            var response = await axios.get("https://localhost:7261/categories").then(res => {
                console.log(res.data)
                setCategories(res.data);
            });
        }


    // first model to show category
    const openModal = (category) => {
        //loadingData();
        setSelectedCategory(category);
        setModalOpen(true);

    };

    const closeModal = () => {
        setSelectedCategory(null);
        setModalOpen(false);
    };

    //open edit model
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


    // deleting modeling 
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

    //deleting models
    const openDeleteModal = (categoryId) => {
        setDeleteModalOpen(true);
        setEditCategory(categoryId);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setEditCategory(null);
    };


    // adding category 
    const handleAddCategory = async () => {
        try {
            // Perform API request to add new category
            const response = await axios.post(`https://localhost:7261/categories?name=${newCategory.name}&description=${newCategory.description}`);

            // Update categories in state after successful addition
            setCategories(prevCategories => [...prevCategories, response.data]);

            // Reset the newCategory state and close the modal
            setNewCategory({ name: '' });
            closeAddModal();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };
    //add Modal function
    const openAddModal = () => {
        setAddModalOpen(true);
    };
    // add modal closing function
    const closeAddModal = () => {
        setAddModalOpen(false);
    };

    const openAddProductModal = () => {
        document.testVariable = selectedCategory.id;
        setAddProductModalOpen(true);
    };

    const closeAddProductModal = () => {
        setAddProductModalOpen(false);
        setNewProduct({
            name: '',
            description: '',
            price: 0
        });
    };

    const handleAddProduct = async () => {
        try {
            // Perform API request to add new product
            const response = await axios.post(
                `https://localhost:7261/products?name=${newProduct.name}&description=${newProduct.description}&price=${newProduct.price}&categoryId=${selectedCategory.id}`,
                {
                    ...newProduct,
                    categoryId: selectedCategory.id, // Associate the product with the selected category
                }
            );

            // Update the selected category's products in state after successful addition
            setSelectedCategory((prevCategory) => ({
                ...prevCategory,
                products: [...prevCategory.products, response.data],
            }));

            // Update the categories state with the new product
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.id === selectedCategory.id
                        ? {
                            ...category,
                            products: [...category.products, response.data],
                        }
                        : category
                )
            );

            // Reset the newProduct state and close the modal
            setNewProduct({
                name: '',
                description: '',
                price: 0,
            });
            closeAddProductModal();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };


    const openEditProductModal = (product) => {
        setEditProduct(product);
        setEditProductModalOpen(true);
        closeModal(); // Close the "Products in {selectedCategory.name}" modal
    };

    const closeEditProductModal = () => {
        setEditProduct(null);
        setEditProductModalOpen(false);
    };

    // Open delete product modal
    const openDeleteProductModal = (product) => {
        setDeleteProduct(product);
        setDeleteProductModalOpen(true);
    };

    // Close delete product modal
    const closeDeleteProductModal = () => {
        setDeleteProduct(null);
        setDeleteProductModalOpen(false);
    };

    // Handle editing a product
    const handleEditProduct = async () => {
        try {
            // Perform API request to update product
            await axios.put(`https://localhost:7261/products/${editProduct.id}`, editProduct);

            // Update categories in state after successful edit
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.id === editProduct.categoryId
                        ? {
                            ...category,
                            products: category.products.map((product) =>
                                product.id === editProduct.id ? editProduct : product
                            ),
                        }
                        : category
                )
            );

            // Close the edit product modal
            closeEditProductModal();
        } catch (error) {
            console.error('Error editing product:', error);
        }
    }

    // Handle deleting a product
    const handleDeleteProduct = async (productId) => {
        try {
            // Perform API request to delete the product
            await axios.delete(`https://localhost:7261/products/${productId}`);

            // Update the selected category's products in state after a successful deletion
            setSelectedCategory((prevCategory) => ({
                ...prevCategory,
                products: prevCategory.products.filter((product) => product.id !== productId),
            }));

            // Update the categories state to remove the deleted product
            setCategories((prevCategories) =>
                prevCategories.map((category) => ({
                    ...category,
                    products: category.products.filter((product) => product.id !== productId),
                }))
            );

            // Close the delete product modal
            closeDeleteProductModal();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };


    //getting categories on the page
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
                        onClick={() => openDeleteModal(element.id)} // Open delete confiriming modal
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
                            <Card key={product.id} className="mb-4">
                                <div className="p-3">
                                    <h4 className="mb-2">{product.name}</h4>
                                    <p className="mb-2">{product.description}</p>
                                    <p className="mb-0">Price: ${product.price}</p>
                                </div>
                                <div className="text-center">
                                    <Button color="primary" className="mr-2" onClick={() => openEditProductModal(product)}>
                                        Edit Product
                                    </Button>
                                    <Button color="danger" onClick={() => openDeleteProductModal(product)}>
                                        Delete Product
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    <Button color="primary" onClick={openAddProductModal}>
                        Add New Product
                    </Button>
                </ModalBody>
            </Modal>

            {/* Edit Product Modal */}
            <Modal isOpen={editProductModalOpen} toggle={closeEditProductModal}>
                <ModalHeader toggle={closeEditProductModal}>Edit Product</ModalHeader>
                <ModalBody>
                    <div>
                        {/* Edit product form */}
                        {editProduct && (
                            <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={editProduct.name}
                                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                                />
                                {/* ... Other fields ... */}
                                <Button color="primary" onClick={handleEditProduct}>
                                    Save Changes
                                </Button>
                            </div>
                        )}
                    </div>
                </ModalBody>
            </Modal>

            {/* Delete Product Modal */}
            <Modal isOpen={deleteProductModalOpen} toggle={closeDeleteProductModal}>
                <ModalHeader toggle={closeDeleteProductModal}>Confirm Delete</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this product?
                    <div className="d-flex justify-content-end mt-3">
                        <Button color="secondary" onClick={closeDeleteProductModal}>
                            Cancel
                        </Button>
                        <Button
                            color="danger"
                            className="ml-2"
                            onClick={() => handleDeleteProduct(deleteProduct.id)}
                        >
                            Delete
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
            {/* Add New Product Modal */}
            <Modal isOpen={addProductModalOpen} toggle={closeAddProductModal}>
                <ModalHeader toggle={closeAddProductModal}>Add New Product</ModalHeader>
                <ModalBody>
                    <div>
                        <label style={{ marginBottom: '10px', display: 'block' }}>Name:</label>
                        <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
                        />
                        <label style={{ marginBottom: '10px', display: 'block' }}>Description:</label>
                        <input
                            type="text"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
                        />
                        <label style={{ marginBottom: '10px', display: 'block' }}>Price:</label>
                        <input
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
                        />
                        <Button color="primary" onClick={handleAddProduct} style={{ width: '100%' }}>
                            Add Product
                        </Button>
                    </div>
                </ModalBody>
            </Modal>



            {/* edit form model */}
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

            {/* Add New Category Modal */}
            <Modal isOpen={addModalOpen} toggle={closeAddModal}>
                <ModalHeader toggle={closeAddModal}>Add New Category</ModalHeader>
                <ModalBody>
                    {/* Add new category form */}
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        />
                        <Button color="primary" onClick={handleAddCategory}>
                            Add Category
                        </Button>
                    </div>
                </ModalBody>
            </Modal>

            <Button color="primary" onClick={openAddModal} style={{ marginTop: '10px', backgroundColor: 'lightgreen' }}>
                Add New Category
            </Button>

        </div>
    );
}