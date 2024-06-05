import React from "react";
import { checkNotNullOrEmpty } from "@/Helper";
import classNames from "classnames";
import Select from "react-select";

export default function SelectInput({
    className,
    placeholder = "Type here",
    options,
    size = "sm",
    label,
    onChange,
    labelPosition = "vertical",
    value,
    defaultValue,
    errors,
    ...props
}) {
    return (
        <>
            <label
                className={classNames(
                    "form-control w-full  flex flex-row my-4 "
                )}
            >
                {checkNotNullOrEmpty && (
                    <div className="label min-w-48">
                        <span className="label-text">{label}</span>
                    </div>
                )}
                <div className="w-full  relative">
                    {
                        <Select
                            className=" w-full max-w-xs"
                            options={options}
                            onChange={onChange}
                            defaultValue={defaultValue}
                            placeholder={placeholder || "Choose option"}
                            {...props}
                        />
                    }
                    {errors && (
                        <div className=" px-2 mt-1 absolute text-sm text-red-600">
                            {errors}
                        </div>
                    )}
                </div>
            </label>
        </>
    );
}
