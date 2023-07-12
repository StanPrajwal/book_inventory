import { useState } from "react";
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik"
import * as MUI from "@mui/material"
import axios from "axios"


export default function Register(props) {
    const [showPassword, setShowPassword] = useState(false)




    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const navigate = useNavigate();

    const registerSchema = Yup.object().shape({
        name: Yup.string().required("Field is required"),
        email: Yup.string().email("Invalid Email ID").required("Field is required"),
        password: Yup.string().required("Field is required"),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),

    })

    const registerFormik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",

        },
        validationSchema: registerSchema,
        onSubmit: (values) => {

            console.log(values, "hai")
              axios
                .post("http://localhost:4000/user/register", {
                  values
                }).then((res) => {
                  navigate(`/`)
                }).catch((error) => {

                  console.log(error)
                  // setError(true)
                });
        }
    })
    const { handleSubmit, touched, getFieldProps, errors, setFieldValue } = registerFormik
    return (
        <MUI.Grid spacing={2} p={3} container mt={4} justifyContent="center">
           
            <MUI.Grid item xs={12} md={7} width="100%"  >
                <MUI.Stack width="100%">
                    <FormikProvider value={registerFormik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <MUI.Stack width="100%" >
                                <MUI.Typography variant="h4" textAlign="center" color="#5861ae">Register</MUI.Typography>
                                <MUI.Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 4 }} mb={3}>
                                    <MUI.Stack width="100%">
                                        <MUI.TextField
                                            fullWidth
                                            required
                                            id="standard-required"
                                            label="Name"
                                            variant="standard"
                                            {...getFieldProps("name")}
                                            error={Boolean(
                                                touched.name && errors.name
                                            )}
                                            helperText={
                                                touched.name && errors.name
                                            }
                                        />
                                    </MUI.Stack>
                                    <MUI.Stack width="100%">
                                        <MUI.TextField
                                            fullWidth
                                            required
                                            id="standard-required"
                                            label="Email"
                                            variant="standard"
                                            {...getFieldProps("email")}
                                            error={Boolean(
                                                touched.email && errors.email
                                            )}
                                            helperText={
                                                touched.email && errors.email
                                            }
                                        />
                                    </MUI.Stack>

                                </MUI.Stack>





                                <MUI.Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 4 }} mb={3}>
                                    <MUI.Stack width="100%">
                                        <MUI.TextField
                                            fullWidth
                                            id="standard-password-input"
                                            label="Password"
                                            type="password"
                                            variant="standard"
                                            autoComplete="off"
                                            required
                                            {...getFieldProps("password")}
                                            error={Boolean(touched.password && errors.password)}
                                            helperText={
                                                touched.password && errors.password
                                            }
                                        />
                                    </MUI.Stack>
                                    <MUI.Stack width="100%">
                                        <MUI.FormControl variant="standard">
                                            <MUI.InputLabel htmlFor="standard-adornment-password">Confirm Password</MUI.InputLabel>
                                            <MUI.Input
                                                id="standard-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                required
                                                {...getFieldProps("confirm_password")}
                                                error={Boolean(touched.confirm_password && errors.confirm_password)}
                                                helperText={
                                                    touched.confirm_password && errors.confirm_password
                                                }

                                                endAdornment={
                                                    <MUI.InputAdornment position="end">
                                                        <span

                                                            onClick={handleClickShowPassword}
                                                        >
                                                            {showPassword ? "HIDE" : "SHOW"}
                                                        </span>
                                                    </MUI.InputAdornment>
                                                }
                                            />
                                        </MUI.FormControl>
                                    </MUI.Stack>
                                </MUI.Stack>


                                <MUI.Stack>
                                    <MUI.Button variant="contained" type="submit">
                                        Register
                                    </MUI.Button>
                                </MUI.Stack>
                            </MUI.Stack>
                        </Form>
                    </FormikProvider>
                </MUI.Stack>
            </MUI.Grid>
        </MUI.Grid >
    );
}
