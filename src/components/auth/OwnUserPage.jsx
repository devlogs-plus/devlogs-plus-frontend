import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {Link, Navigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {Button} from "../common/Button.jsx";
import AvatarImg from "../common/AvatarImg.jsx";
import usePageTitle from "../../hooks/other/usePageTitle.js";
import {
    doesHackaExist,
    doesWakaExist
} from "../../api/timetracking.js";
import {useEffect, useState} from "react";
import WakatimeButton from "../common/button/WakatimeButton.jsx";
import HackatimeButton from "../common/button/HackatimeButton.jsx";
import ViewOwnProjects from "./ViewOwnProjects.jsx";

export function OwnUserPage() {
    const {user, isLoading} = useAuth()
    const [wakaExists, setWakaExists] = useState(false)
    const [isCheckingWaka, setIsCheckingWaka] = useState(true)
    const [hackaExists, setHackaExists] = useState(false)
    const [isCheckingHacka, setIsCheckingHacka] = useState(true)
    usePageTitle("You")

    useEffect(() => {
        if (!user) return
        
        async function checkWaka() {
            try {
                const exists = await doesWakaExist()
                setWakaExists(exists)
            } finally {
                setIsCheckingWaka(false)
            }
        }
        async function checkHacka() {
            try {
                const exists = await doesHackaExist()
                setHackaExists(exists)
            } finally {
                setIsCheckingHacka(false)
            }
        }

        checkHacka()
        checkWaka()
    }, [user]);

    if (isLoading || isCheckingHacka || isCheckingWaka) return <LoadingSpinner/>
    if (!user) return <Navigate to="/login" replace/>

    return (
        <div>
            <h3>{user.display_name}</h3>
            <AvatarImg user={user}/>
            <p>Email: {user.email}</p>
            <p>User Id: {user.id}</p>
            {wakaExists ? (
                <WakatimeButton connect={false}/>
            ) : (
                <WakatimeButton connect={true}/>
            )}
            {hackaExists ? (
                <HackatimeButton connect={false}/>
            ) : (
                <HackatimeButton connect={true}/>
            )}
            <Link to="/me/edit"><Button>Edit</Button></Link>
            <Link to="/me/delete"><Button>Delete Account</Button></Link>
            <Link to="/me/changepassword"><Button>Change Password</Button></Link>
            <h3>Your Projects</h3>
            <ViewOwnProjects/>
        </div>
    )
}

export default OwnUserPage