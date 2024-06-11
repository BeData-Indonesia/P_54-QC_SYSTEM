import queryString from "query-string";
import { optionsBulan } from "@/Const";
import { toNumber } from "lodash";

export const getStatus = (maximal, current) => {
    if (maximal > current) {
        return "minus";
    }
    if (maximal == current) {
        return "equal";
    }
    if (maximal < current) {
        return "over";
    }
};

export function checkNotNullOrEmpty(value) {
    return value !== null && value !== undefined && value !== "";
}

export const getTotalBeratBalokFormExpander = (row) => {
    if (row.length < 1) {
        return 0;
    }
    const totalBagus = row.reduce((accumulator, currenrValue) => {
        return (
            accumulator +
            currenrValue["berat_kg"] * currenrValue["jumlah_balok"]
        );
    }, 0);
    return totalBagus;
};
export const getTotalBeratInjectFormExpander = (row) => {
    if (row.length < 1) {
        return 0;
    }
    const totalBagus = row.reduce((accumulator, currenrValue) => {
        return (
            accumulator + currenrValue["berat_kering"] * currenrValue["bagus"]
        );
    }, 0);
    return totalBagus;
};
export const getTotalBagusBalok = (row) => {
    if (row.length < 1) {
        return 0;
    }
    const totalBagus = row.reduce((accumulator, currenrValue) => {
        return accumulator + currenrValue["jumlah_balok"];
    }, 0);
    return totalBagus;
};

export const getTotalBagusinject = (row) => {
    if (row.length < 1) {
        return 0;
    }
    const totalBagus = row.reduce((accumulator, currenrValue) => {
        return accumulator + currenrValue["bagus"];
    }, 0);
    return totalBagus;
};

export const getTotalRusakinject = (row) => {
    if (row.length < 1) {
        return 0;
    }
    const totalBagus = row.reduce((accumulator, currenrValue) => {
        return accumulator + currenrValue["rusak"];
    }, 0);
    return totalBagus;
};

export const getBeratProdukbalok = (row) => {
    if (row.length < 1) {
        return 0;
    }
    return row[0]["berat_kg"];
};

export const setUrl = (key, value, get) => {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.set(key, value);
    url.search = params.toString();
    get(
        "/" + params.toString() && "?" + params.toString(),
        {},
        { preserveState: true, queryString: params.toString() }
    );
};

export const getParamsbyKey = (key) => {
    let params = queryString.parse(location.search);
    return params[key];
};

export const generateValueLabel = (keyValue, keyLabel, objects) => {
    return objects?.map((object) => {
        return {
            value: object[keyValue],
            label: object[keyLabel],
        };
    });
};

export const getDefaultValueBulan = (value) => {
    if (!value) {
        return undefined;
    }
    let label = "";
    optionsBulan.forEach((option) => {
        if (option.value == toNumber(value)) {
            label = option.label;
        }
    });
    return { label: label, value: value };
    // getDefaultValueBulan(2);
    // Output: { label: 'February', value: 2 }
};

export const getDefaultValueTahun = (value) => {
    if (!value) {
        return undefined;
    }
    return { label: value, value: value };
    // getDefaultValueTahun("2024");
    // { label: '2024', value: '2024' }
};
