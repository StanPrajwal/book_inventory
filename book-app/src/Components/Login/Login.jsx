import { Form, FormikProvider, useFormik } from "formik"
import * as MUI from "@mui/material"
// import axios from "axios";
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


export default function Login() {
  const navigate = useNavigate()
  const loginSchema = Yup.object().shape({
    user_name:Yup.string().email().required("Field is required"),
    password: Yup.string().required("Field is Required")
  })
  const signUpFormik = useFormik({
    initialValues: {
      user_name: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values)
      axios
        .post("http://localhost:4000/user/login", {
          values
        }).then((res) => {
          console.log(res)
          localStorage.setItem('id',res.data.user._id)
          localStorage.setItem('token',res.data.token)
          navigate('/inventory',{state:res.data.user})
        }).catch((error) => {
          alert("Invalid Email/Password");
          // setError(true)
        });
    }
  })
  return (
    <>

    <MUI.Grid spacing={2} p={3} container mt={4} justifyContent="center">
      
      
      
      <MUI.Grid item xs={12} md={5} width="100%"  >
        <MUI.Stack width="100%" p={4}>
          <FormikProvider value={signUpFormik}>
            <Form autoComplete="off" noValidate onSubmit={signUpFormik.handleSubmit}>
              <MUI.Stack>
                <MUI.Stack mb={5}>
                  <MUI.TextField
                    fullWidth
                    required
                    id="standard-required"
                    label="Email"
                    variant="standard"
                    {...signUpFormik.getFieldProps("user_name")}
                    error={Boolean(
                      signUpFormik.touched.user_name && signUpFormik.errors.user_name
                    )}
                    helperText={
                      signUpFormik.touched.user_name && signUpFormik.errors.user_name
                    }
                  />
                </MUI.Stack>

                <MUI.Stack mb={5}>
                  <MUI.TextField
                    fullWidth
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    variant="standard"
                    autoComplete="off"
                    required
                    {...signUpFormik.getFieldProps("password")}
                    error={Boolean(signUpFormik.touched.password && signUpFormik.errors.password)}
                    helperText={
                      signUpFormik.touched.password && signUpFormik.errors.password
                    }
                  />
                </MUI.Stack>
              </MUI.Stack>
              <MUI.Stack>
                <MUI.Button variant="contained" type="submit">
                  Sing IN
                </MUI.Button>
              </MUI.Stack>

            </Form>
          </FormikProvider>
        </MUI.Stack>
      </MUI.Grid>
    </MUI.Grid>
    </>
  );
}
