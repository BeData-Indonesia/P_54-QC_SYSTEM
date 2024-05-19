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
export const getTotalBagusBalok = (row) => {
    if (row.length < 1) {
        return 0;
    }
    const totalBagus = row.reduce((accumulator, currenrValue) => {
        return accumulator + currenrValue["jumlah_balok"];
    }, 0);
    return totalBagus;
};
export const getBeratProdukbalok = (row) => {
    if (row.length < 1) {
        return 0;
    }
    return row[0]["berat_kg"];
};
