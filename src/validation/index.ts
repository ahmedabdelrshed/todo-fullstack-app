import * as yup from "yup";

export const registerSchema = yup.object({
    username: yup.string().required("Username is required").min(5, "Username should be at least 5 characters."),
    email: yup.string().required("Email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please Enter a valid Email."),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
})

export const loginSchema = yup.object({
    identifier: yup.string().required("Email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please Enter a valid Email."),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
})