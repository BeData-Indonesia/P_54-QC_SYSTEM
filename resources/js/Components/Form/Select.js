import React from "react";
import { checkNotNullOrEmpty } from "@/Helper";
import classNames from "classnames";

export default function Select({
    className,
    // type = "text",
    placeholder = "Type here...",
    options,
    size = "sm",
    label,
    onChange,
    labelPosition = "vertical",
    value,
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
                    <select
                        className="select w-full max-w-xs"
                        onChange={onChange}
                        value={value}
                    >
                        {options.map((option, index) => {
                            return (
                                <option value={option.value}>
                                    {option.name}
                                </option>
                            );
                        })}
                    </select>
                }
            </label>
        </>
    );
}
