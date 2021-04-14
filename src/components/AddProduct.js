import React, {Component} from "react";
import CategoriesService from "../services/CategoriesService";

class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        this.retriveCategories()
    }

    retriveCategories() {
        CategoriesService.getAll()
            .then(response => {
                this.setState({
                    categories: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {categories} = this.state;
        return (
            <div className="container">
                <div className="container">
                    <h5>Add new Product</h5>
                    <div className="container">
                        <select className="custom-select" defaultValue={0} name="category"><option value="0" disabled>Chose Category</option>
                        {categories &&
                        categories.map((category, index) => (
                                category.parentCategoryId === 0 ? (
                                        <>
                                            <option name="category" value={category.id} key={index} disabled>{category.categoryName}</option>
                                            {categories &&
                                            categories.map((subcategory, indx) => (
                                               subcategory.parentCategoryId === category.id ? (
                                                        <option key={indx} name="category" value={subcategory.id}>{subcategory.categoryName}</option>

                                                       ) : (null)
                                            ))}
                                        </>
                                ) : (null)
                        ))}
                        </select>
                    </div>
                </div>
            </div>
         )
    }
}
export default AddProduct