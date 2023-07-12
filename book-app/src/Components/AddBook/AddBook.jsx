import * as MUI from "@mui/material"
import * as Yup from "yup"
import { useFormik, FormikProvider, Form } from 'formik';
import { useNavigate } from "react-router-dom";
import axios from "axios"
function AddBook() {
    const navigate = useNavigate()
    const addBookSchema = Yup.object().shape({
        book_title: Yup.string().required("Field is required"),
        book_description: Yup.string().required("Field is required"),
        author_name: Yup.string().required("Field is required")

    })
    const formik = useFormik({
        initialValues: {
            book_title: '',
            author_name: '',
            book_description: ""
        },
        validationSchema: addBookSchema,
        onSubmit: (values) => {
            console.log(values)
            axios
                .post(`http://localhost:4000/book/addbook/${localStorage.getItem("id")}`, {
                    values
                }).then((res) => {
                    console.log(res)
                    navigate('/inventory')
                    console.log("/in")
                }).catch((error) => {
                    alert("Invalid Email/Password");
                    // setError(true)
                });
        }

    });
    const { errors, touched, handleSubmit, getFieldProps } = formik;
    return <>

        <MUI.Stack sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
            mt: 3
        }}>
            <MUI.Stack sx={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                padding: 4,
                borderRadius: 2
            }}>
                <MUI.Typography variant="h5" textAlign="center" mb={2}>Add Book To Inventory</MUI.Typography>
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit}>
                        <MUI.Stack mb={3}>
                            <MUI.TextField
                                fullWidth
                                variant="outlined"
                                id="outlined-basic"
                                label="Book Title"

                                {...getFieldProps('book_title')}
                                error={Boolean(touched.book_title && errors.book_title)}
                                helperText={touched.book_title && errors.book_title}
                            />

                        </MUI.Stack>
                        <MUI.Stack mb={3}>
                            <MUI.TextField

                                rows={1}
                                maxRows={3}
                                fullWidth
                                multiline
                                variant="outlined"
                                id="outlined-basic"
                                label="Book Description"

                                {...getFieldProps('book_description')}
                                error={Boolean(touched.book_description && errors.book_description)}
                                helperText={touched.book_description && errors.book_description}
                            />

                        </MUI.Stack>

                        <MUI.Stack mb={3}>
                            <MUI.TextField
                                fullWidth
                                variant="outlined"
                                id="outlined-basic"
                                label="Author Name"

                                {...getFieldProps('author_name')}
                                error={Boolean(touched.author_name && errors.author_name)}
                                helperText={touched.author_name && errors.author_name}
                            />

                        </MUI.Stack>
                        <MUI.Button
                            fullWidth
                            type='submit'
                            variant='contained'
                        >
                            Add Book
                        </MUI.Button>

                    </Form>
                </FormikProvider>
            </MUI.Stack>
        </MUI.Stack>
    </>
}

export default AddBook