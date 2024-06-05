import queryString from "query-string";
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
