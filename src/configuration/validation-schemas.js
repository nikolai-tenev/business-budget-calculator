import * as Yup from "yup";

export const INCOME = Yup.object().shape({
    name: Yup.string().required("Required!"),
    value: Yup.number().positive("Cost can't be negative!").required("Required!"),
    type: Yup.string().required("Required!"),
    ongoing: Yup.boolean(),
    from: Yup.date().when("ongoing", {
        is: true,
        then: Yup.date().required()
    }),
    to: Yup.date().when("ongoing", {
        is: true,
        then: Yup.date().required()
    })
});

export const COST = Yup.object().shape({
    name: Yup.string().required("Required!"),
    value: Yup.number().positive("Cost can't be negative!").required("Required!"),
    type: Yup.string().required("Required!"),
    ongoing: Yup.boolean(),
    from: Yup.date().when("ongoing", {
        is: true,
        then: Yup.date().required()
    }),
    to: Yup.date().when("ongoing", {
        is: true,
        then: Yup.date().required()
    })
});
