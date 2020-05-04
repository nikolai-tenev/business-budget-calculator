import * as Yup from "yup";

export const INCOME_CREATE = Yup.object().shape({
    name: Yup.string()
        .required("Required!")
});

export const INCOME_EDIT = Yup.object().shape({
    name: Yup.string()
        .required("Required!"),
});

export const COST_CREATE = Yup.object().shape({
    name: Yup.string()
        .required("Required!")
});

export const COST_EDIT = Yup.object().shape({
    name: Yup.string()
        .required("Required!"),
});
