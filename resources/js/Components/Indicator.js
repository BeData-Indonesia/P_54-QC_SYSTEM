import classNames from "classnames";

export default function Indicator({ status }) {
    let color = "";
    if (status == "over") {
        color = "bg-red-500";
    }
    if (status == "equal") {
        color = "bg-green-500";
    }
    if (status == "minus") {
        color = "bg-yellow-500";
    }
    return <span className={classNames(`indicator-item badge  ${color}`)} />;
}
