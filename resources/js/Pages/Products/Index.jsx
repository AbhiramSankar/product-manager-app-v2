import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";

export default function Index({ products, queryParams = null, success }) {
    const data = products.length ? products : [];

    function getSum(data) {
        let total = 0;
        data.forEach((item) => {
            total += item.amount;
        });
        return total;
    }
    useEffect(() => {
        if (success) {
            alert(success);
        }
    }, [success]);

    const deleteProduct = (product) => {
        if (!window.confirm("Are you sure you want to delete the product?")) {
            return;
        }
        router.delete(route("product.destroy", product));
    };

    const searchFieldChanged = (name, value) => {
        // console.log(name, value);
        if (value) {
            queryParams = {};
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("product.index"), queryParams);
    };
    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
    
        searchFieldChanged(name, e.target.value);
      };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Products
                </h2>
            }
        >
            <Head title="Products" />

            <div>
                <h2
                    className="justify-center items-center"
                    style={{ marginTop: 25, textAlign: "center" }}
                >
                    Bill of Quantity
                </h2>
                <div className="flex justify-between items-center col-sm-10 offset-sm-1">
                    <div>
                        <InputLabel htmlFor="search" value="Search" />

                        <TextInput
                            id="search"
                            type="text"
                            name="search"
                            defaultValue={queryParams?.name ? queryParams?.name : ''}
                            placeholder="Search..."
                            className="mt-1 block w-full"
                            autoComplete="current-search"
                            onBlur={(e) =>
                                searchFieldChanged("name", e.target.value)
                            }
                            onKeyPress={(e) => onKeyPress("name", e)}
                        />
                    </div>
                    <Link href={route("product.create")}>
                        <button
                            //   onClick={addProd}
                            className="btn btn-primary"
                        >
                            + Add Product
                        </button>
                    </Link>
                </div>
                <br />
                <div className="col-sm-10 offset-sm-1">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Prouduct Cost</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead>
                        {data.map((item) => (
                            <tbody key={item.id}>
                                <>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.sub_total}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            <div>
                                                <Link
                                                    href={route(
                                                        "product.show",
                                                        item.id
                                                    )}
                                                    style={{
                                                        marginBottom: 5,
                                                        marginRight: 5,
                                                    }}
                                                >
                                                    <Button
                                                        // onClick={() => material(item.id)}
                                                        variant="primary"
                                                    >
                                                        View
                                                    </Button>
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "product.edit",
                                                        item.id
                                                    )}
                                                    style={{
                                                        marginBottom: 5,
                                                        marginRight: 5,
                                                    }}
                                                >
                                                    <Button
                                                        // onClick={() => updateOp(item.id)}
                                                        variant="warning"
                                                    >
                                                        Edit
                                                    </Button>
                                                </Link>

                                                <Button
                                                    onClick={() =>
                                                        deleteProduct(item)
                                                    }
                                                    variant="danger"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                        <td>{item.amount}</td>
                                    </tr>
                                </>
                            </tbody>
                        ))}
                        <thead>
                            <tr>
                                <th colSpan="6">Total</th>
                                <th colSpan="1">{getSum(data)}</th>
                            </tr>
                        </thead>
                    </Table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
