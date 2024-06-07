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
    const InputType = ({
        className,
        type,
        placeholder = "Type here...",
        size = "sm",
        label,
        value,
        onChange,
        disabled = false,
        errors,
        labelPosition = "vertical",
        ...props
    }) => {
        if (type == "text-area") {
            return (
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
            );
        }
        if (type == "file") {
            return (
                <>
                    <input
                        type={type}
                        className={classNames(
                            className,
                            "file-input p-0 w-full max-w-xs"
                        )}
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        value={value}
                        onChange={onChange}
                        {...props}
                    />
                </>
            );
        }
        return (
            <>
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
            </>
        );
    };
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
                    <InputType
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
