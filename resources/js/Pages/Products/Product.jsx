import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";

export default function Product({ product, materials, success }) {
    // console.log(materials);
    const data = product;
    const matData = materials.length ? materials : [];

    const deleteMaterial = (mat) => {
        if (!window.confirm("Are you sure you want to delete the material?")) {
            return;
        }
        router.delete(route("material.destroy", mat));
    };

    useEffect(() => {
        if (success) {
            alert(success);
        }
    }, [success]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Product Detail
                </h2>
            }
        >
            <Head title="Product Detail" />

            <div>
                <h2 style={{ marginTop: 25, textAlign: "center" }}>
                    {data.name}
                </h2>
                <div className="col-sm-1 offset-sm-10">
                    <Link
                        href={route("material.create")}
                        data={{
                            product_id: data.id,
                        }}
                    >
                        <button
                            // onClick={addMat}
                            className="btn btn-primary"
                        >
                            + Add Materials
                        </button>
                    </Link>
                </div>
                <div className="col-sm-10 offset-sm-1">
                    <br />
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <td colSpan="5">{data.id}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td colSpan="2">{data.name}</td>
                                <th>Quantity</th>
                                <td colSpan="2">{data.quantity}</td>
                            </tr>
                            <tr>
                                <th colSpan="2">Description</th>
                                <td colSpan="4">{data.description}</td>
                            </tr>

                            <tr>
                                <th colSpan="6">Product Materials</th>
                            </tr>

                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Rate</th>
                                <th>Actions</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        {matData.map((item) => (
                            <tbody key={item.id}>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.description}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.rate}</td>
                                    <td>
                                        <div>
                                            <Link
                                                href={route(
                                                    "material.edit",
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
                                                style={{
                                                    marginBottom: 5,
                                                    marginRight: 5,
                                                }}
                                                onClick={() =>
                                                    deleteMaterial(item)
                                                }
                                                variant="danger"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                    <td>{item.amount}</td>
                                </tr>
                            </tbody>
                        ))}
                        <thead>
                            <tr>
                                <th colSpan="2">Total Material Items</th>
                                <td>{data.material_items}</td>
                                <th>Material Amount</th>
                                <td colSpan="2">{data.material_cost}</td>
                            </tr>
                            <tr>
                                <th colSpan="2">Waste Percentage</th>
                                <td>{data.waste_percentage}</td>
                                <th>Waste Amount</th>
                                <td colSpan="2">{data.waste_amount}</td>
                            </tr>
                            <tr>
                                <th colSpan="2">Labour Percentage</th>
                                <td>{data.labour_percentage}</td>
                                <th>Labour Cost</th>
                                <td colSpan="2">{data.labour_amount}</td>
                            </tr>
                            <tr>
                                <th colSpan="4">Equipment Cost</th>
                                <td colSpan="2">{data.equipment_cost}</td>
                            </tr>
                            <tr>
                                <th colSpan="2">Other Percentages</th>
                                <td>{data.other_percentage}</td>
                                <th>Other Cost</th>
                                <td colSpan="2">{data.other_amount}</td>
                            </tr>
                            <tr>
                                <th colSpan="2">Margin Percentage</th>
                                <td>{data.margin_percentage}</td>
                                <th>Margin Amount</th>
                                <td colSpan="2">{data.margin_amount}</td>
                            </tr>
                            <tr>
                                <th colSpan="4">Sub Total</th>
                                <td colSpan="2">{data.sub_total}</td>
                            </tr>
                            <tr>
                                <th colSpan="4">Total</th>
                                <td colSpan="2">{data.amount}</td>
                            </tr>
                        </thead>
                    </Table>
                </div>
                <br />
                <Button
                    style={{
                        marginBottom: 25,
                        marginLeft: "50%",
                        // marginRight: "50%",
                    }}
                    onClick={() => window.history.back()}
                    variant="primary"
                >
                    Back
                </Button>
            </div>
        </AuthenticatedLayout>
    );
}
