import {Button} from "../Button.jsx";
import {connectWaka, disconnectWaka} from "../../../api/timetracking.js";

export default function WakatimeButton({connect}) {
    return connect ? (<Button onClick={connectWaka}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 340 340">
            <use href="/icons.svg#wakatime-icon"/>
        </svg>
        Connect your WakaTime account
    </Button>) : (
        <Button onClick={disconnectWaka}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 340 340">
                <use href="/icons.svg#wakatime-icon"/>
            </svg>
            Disconnect your WakaTime account
        </Button>
    )
}