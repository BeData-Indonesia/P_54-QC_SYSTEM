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
    labelPosition = "vertical",
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
                {type == "text-area" ? (
                    <textarea
                        disabled={disabled}
                        value={value}
                        onChange={onChange}
                        cols={8}
                        type={type}
                        placeholder={placeholder}
                        className={classNames(
                            "input input-bordered w-full ",
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
                            `input-${size}`
                        )}
                        {...props}
                    />
                )}
            </label>
        </>
    );
}
