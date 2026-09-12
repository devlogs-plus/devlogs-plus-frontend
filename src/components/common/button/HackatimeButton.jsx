import {Button} from "../Button.jsx";
import {connectHacka, disconnectHacka} from "../../../api/timetracking.js";

export default function HackatimeButton({connect}) {
    return connect ? (<Button onClick={connectHacka}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792">
            <use href="/icons.svg#hackclub-icon"/>
        </svg>
        Connect your Hackatime Account
    </Button>) : (
        <Button onClick={disconnectHacka}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792">
                <use href="/icons.svg#hackclub-icon"/>
            </svg>
            Disconnect your Hackatime Account
        </Button>
    )
}