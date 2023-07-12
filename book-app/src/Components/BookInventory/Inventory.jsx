import { Button, Stack } from "@mui/material";
import BookCard from "./Card";
import { useLocation, useNavigate } from "react-router-dom";

function Inventory(){
    const navigate = useNavigate()
    const {state} = useLocation()
    return <>
    <Stack alignItems="flex-end" mt={2}>
        <Button onClick={()=>navigate("/addbook")}>Add Book</Button>
    </Stack>
    <BookCard state={state}/>
    </>
}
export default Inventory