import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function BookCard({ state }) {
    const navigate = useNavigate()
    const [books, setBooks] = React.useState([])
    React.useEffect(() => {
        axios
            .get(`http://localhost:4000/book/fetch/${localStorage.getItem("id")}`)
            .then((res) => {
                console.log(res)
                setBooks(res.data.books)
            }).catch((error) => {
                alert("Invalid Email/Password");
                // setError(true)
            });
    }, [])
    const removeBook =(book)=>{
        axios
        .post(`http://localhost:4000/book/remove/${localStorage.getItem("id")}`,{book})
        .then((res) => {
            console.log(res)
            setBooks(res.data.books)
        }).catch((error) => {
            alert("Invalid Email/Password");
            // setError(true)
        });
    }

    console.log(books)
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3
        }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            {books.length ?
                <Grid container justifyContent="center"
                    alignItems="center" alignContent="center" gap={2} spacing={{ xs: 2, md: 3 }} >
                    {books.map(book => <Grid item xs={12} sm={3} md={2.5}>
                        <Card sx={{ maxWidth: 345 }}>

                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image="https://www.incimages.com/uploaded_files/image/1920x1080/getty_655998316_2000149920009280219_363765.jpg"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {book.book_title}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {book.author_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {book.book_description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{pt:2,pb:3}}>
                                <Button  
                                size="small" variant="outlined" 
                                color="error" onClick={()=>removeBook(book)}>Remove Book</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    )
                    }</Grid> :
                <Typography variant="h6" color="text.secondary">Books Not Available</Typography>
            }

        </Stack>

    );
}