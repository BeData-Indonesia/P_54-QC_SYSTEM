import React from "react";
import { checkNotNullOrEmpty } from "@/Helper";
import classNames from "classnames";

export default function Input({
    className,
    type = "text",
    placeholder = "Type here...",
    size = "sm",
    label,
    value,
    onChange,
    disabled = false,
    errors,
    labelPosition = "vertical",
    ...props
}) {
    return (
        <>
            <label
                className={classNames(
                    "form-control w-full  flex flex-row my-4 h-20 items-center"
                )}
            >
                {checkNotNullOrEmpty && (
                    <div className="label min-w-48">
                        <span className="label-text">{label}</span>
                    </div>
                )}
                <div className="w-full  relative">
                    {type == "text-area" ? (
                        <textarea
                            disabled={disabled}
                            value={value}
                            onChange={onChange}
                            cols={8}
                            type={type}
                            placeholder={placeholder}
                            className={classNames(
                                "input input-bordered w-full py-2 ",
                                `input-${size}`
                            )}
                            {...props}
                        />
                    ) : (
                        <input
                            disabled={disabled}
                            value={value}
                            onChange={onChange}
                            type={type}
                            placeholder={placeholder}
                            className={classNames(
                                "input input-bordered w-full ",
                                `input-${size}` + className
                            )}
                            {...props}
                        />
                    )}
                    {errors && (
                        <div className="px-2 mt-1 absolute text-sm text-red-600">
                            {errors}
                        </div>
                    )}
                </div>
            </label>
        </>
    );
}
