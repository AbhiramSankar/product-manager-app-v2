import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Table } from "react-bootstrap";

export default function Create({product}) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: product.name ? product.name : "",
        description: product.description ? product.description : "",
        quantity: product.quantity ? product.quantity : 1,
        waste_percentage: product.waste_percentage ? product.waste_percentage : 0,
        labour_percentage: product.labour_percentage ? product.labour_percentage : 0,
        equipment_cost: product.equipment_cost ? product.equipment_cost : 0,
        other_percentage: product.other_percentage ? product.other_percentage : 0,
        margin_percentage: product.margin_percentage ? product.margin_percentage : 0,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('product.update', product));
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Product
                </h2>
            }
        >
            <Head title="Edit Product" />

            <div>
                <div className="col-sm-6 offset-sm-3">
                    <form onSubmit={submit}>
                        <div className="mt-9">
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />

                            <TextInput
                                id="description"
                                type="text"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                autoComplete="current-description"
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="quantity" value="Quantity" />

                            <TextInput
                                id="quantity"
                                type="number"
                                name="quantity"
                                value={data.quantity}
                                className="mt-1 block w-full"
                                autoComplete="current-quantity"
                                onChange={(e) =>
                                    setData("quantity", e.target.value)
                                }
                                onBlur={(e) =>
                                    setData(
                                        "quantity",
                                        e.target.value == 0 ? 1 : e.target.value
                                    )
                                }
                            />

                            <InputError
                                message={errors.quantity}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="waste_percentage"
                                value="Waste Percentage"
                            />

                            <TextInput
                                id="waste_percentage"
                                type="number"
                                name="waste_percentage"
                                value={data.waste_percentage}
                                className="mt-1 block w-full"
                                autoComplete="current-waste_percentage"
                                onChange={(e) =>
                                    setData("waste_percentage", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.waste_percentage}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="labour_percentage"
                                value="Labour Percentage"
                            />

                            <TextInput
                                id="labour_percentage"
                                type="number"
                                name="labour_percentage"
                                value={data.labour_percentage}
                                className="mt-1 block w-full"
                                autoComplete="current-labour_percentage"
                                onChange={(e) =>
                                    setData("labour_percentage", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.labour_percentage}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="equipment_cost"
                                value="Equipment Cost"
                            />

                            <TextInput
                                id="equipment_cost"
                                type="number"
                                name="equipment_cost"
                                value={data.equipment_cost}
                                className="mt-1 block w-full"
                                autoComplete="current-equipment_cost"
                                onChange={(e) =>
                                    setData("equipment_cost", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.equipment_cost}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="other_percentage"
                                value="Other Percentages"
                            />

                            <TextInput
                                id="other_percentage"
                                type="number"
                                name="other_percentage"
                                value={data.other_percentage}
                                className="mt-1 block w-full"
                                autoComplete="current-other_percentage"
                                onChange={(e) =>
                                    setData("other_percentage", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.other_percentage}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="margin_percentage"
                                value="Margin Percentage"
                            />

                            <TextInput
                                id="margin_percentage"
                                type="number"
                                name="margin_percentage"
                                value={data.margin_percentage}
                                className="mt-1 block w-full"
                                autoComplete="current-margin_percentage"
                                onChange={(e) =>
                                    setData("margin_percentage", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.margin_percentage}
                                className="mt-2"
                            />
                        </div>

                        <br />
                        <button
                            style={{ marginBottom: 15 }}
                            // onClick={add_prod}
                            className="btn btn-primary"
                        >
                            Update Product
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
