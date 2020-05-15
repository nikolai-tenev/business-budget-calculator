import * as Yup from "yup";
import moment from "moment";

export const INCOME = Yup.object().shape({
    name: Yup.string().required("Required!"),
    value: Yup.number().positive("Value must be greater than 0!").required("Required!"),
    type: Yup.string().required("Required!"),
    ongoing: Yup.boolean(),
    from: Yup.mixed()
        .when("ongoing", (ongoing, schema) => {
            if (ongoing !== false) {
                return schema;
            }

            return Yup.date()
                .typeError("From must be a valid date!")
                .required("Required!");
        }),
    to: Yup.mixed()
        .when(["ongoing", "from"], (ongoing, from, schema) => {
            if (ongoing !== false || !moment(from).isValid()) {
                return schema;
            }

            return Yup.date()
                .typeError("To must be a valid date!")
                .min(from, "The To date must be after the From date");
        })
});

export const COST = INCOME;
