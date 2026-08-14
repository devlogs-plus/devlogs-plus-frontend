import {Button} from "./Button.jsx";
import {hackclubLogin} from "../../api/auth.js";

export default function HackclubButton({login}) {
    return login ? (<Button onClick={hackclubLogin}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792">
            <use href="/icons.svg#hackclub-icon"/>
        </svg>
        Login with HackClub
    </Button>) : (
        <Button onClick={hackclubLogin}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792">
                <use href="/icons.svg#hackclub-icon"/>
            </svg>
            Register with HackClub
        </Button>
    )
}