export const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
};

export const getLabelFromValue = (options, value) => {
    let label = "";
    options.forEach((option) => {
        if (option.value === value) {
            label = option.label;
        }
    });

    return label;
};
