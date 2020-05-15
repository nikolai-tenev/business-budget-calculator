import moment from "moment";

const currencyFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'currency',
    currency: "USD",
    // currencyDisplay: "code"
});

export const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

export const currencyFormat = (number) => {
    if (!isNumeric(number)) {
        return number;
    }

    return currencyFormatter.format(number);
};

export const dateFormat = (date) => {
    return moment(date).format("DD.MM.YYYY");
};
