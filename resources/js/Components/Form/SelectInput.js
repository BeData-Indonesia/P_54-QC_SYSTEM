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

                {
                    <Select
                        className=" w-full max-w-xs"
                        options={options}
                        onChange={onChange}
                        defaultValue={defaultValue}
                        {...props}
                    />
                }
            </label>
        </>
    );
}
