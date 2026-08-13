import {Button} from "./Button.jsx";
import {githubLogin} from "../../api/auth.js";

export default function GithubButton({login}) {
    return login ? (<Button onClick={githubLogin}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792">
                <use href="/icons.svg#github-icon"/>
            </svg>
            Login with Github
        </Button>) : (
            <Button onClick={githubLogin}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792">
                    <use href="/icons.svg#github-icon"/>
                </svg>
                Register with Github
            </Button>
        )

}