import React, { useEffect } from 'react';
import { Container, Table, Spinner, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/actions/fetchCategoriesAction';
import { deleteCategory } from '../redux/actions/deleteCategoryAction';
import EditCategoryForm from './EditCategoryForm';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function EditCategories() {
    const { categories, loading, error } = useSelector(state => state.categoriesss);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch])

    return (
        <Container>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>category</th>
                        <th>Description</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {loading &&
                        <tr>
                            <td colSpan="3"><Spinner animation="border" />  loading... </td>
                        </tr>
                    }
                    {error &&
                        <tr>
                            <td colSpan="3">{error}</td>
                        </tr>
                    }
                    {categories.map(category => (
                        <tr key={category._id}>
                            <td><Link to={`/category/${category._id}`}>{category.name}</Link></td>
                            <td>{category.description}</td>
                            <td>
                                <span className='btn btn-primary mr-3'>
                                    <EditCategoryForm
                                        categoryId={category._id}
                                        categoryName={category.name}
                                        categoryDescription={category.description}
                                    />
                                </span>
                                <Button
                                    className='btn btn-danger'
                                    onClick={() => dispatch(deleteCategory(category._id))}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default EditCategories;