import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Table } from "react-bootstrap";

export default function Create({material}) {
    const { data, setData, put, processing, errors, reset } = useForm({
        product_id: material.product_id,
        description: material.description ? material.description : '',
        quantity: material.quantity ? material.quantity : 1,
        rate: material.rate ? material.rate : 0,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('material.update', material));
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Material
                </h2>
            }
        >
            <Head title="Edit Material" />

            <div>
                <div className="col-sm-6 offset-sm-3">
                <form onSubmit={submit}>
                        

                        <div className="mt-9">
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
                                htmlFor="rate"
                                value="Rate"
                            />

                            <TextInput
                                id="rate"
                                type="number"
                                name="rate"
                                value={data.rate}
                                className="mt-1 block w-full"
                                autoComplete="current-rate"
                                onChange={(e) =>
                                    setData("rate", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.rate}
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
