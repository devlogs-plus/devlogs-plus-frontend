import {useNavigate} from "react-router-dom";
import {Button} from "./Button.jsx";

export default function BackButton() {
    const navigate = useNavigate()

    return (
        <Button onClick={() => navigate(-1)}>&lt;-- Go back</Button>
    )
}