import React from "react";
import { getParamsbyKey, setUrl } from "../../Helper";
import { useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Form/Input";
import Button from "@/Components/Button";
export default function Search() {
    const { setData, data, get } = useForm({
        search: getParamsbyKey("search"),
    });
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        setUrl("search", data.search, get);
    };
    return (
        <form onSubmit={handleSubmitSearch}>
            <div className=" flex gap-2 items-center">
                <Input
                    onChange={(e) => setData("search", e.target.value)}
                    className="w-24"
                    placeholder={"Search here"}
                    step="0.01"
                    type="text"
                    size="md"
                    value={data.search}
                />
                <Button type="submit">Search</Button>
            </div>
        </form>
    );
}
