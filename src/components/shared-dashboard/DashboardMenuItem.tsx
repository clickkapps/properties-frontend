import {NavLink} from "react-router";
import {ReactNode} from "react";

type Props = {
    icon: ReactNode,
    title: string,
    active?: boolean,
    to? : string,
    onMenuClicked?: (title: string, to: string) => void,
    devPhase?: "completed" | "in_progress" | "not_started"
}

function DashboardMenuItem({ icon, title, to = "/", onMenuClicked, devPhase = "not_started" }: Props ) {

    function menClickHandler() {
        if (onMenuClicked) {
            onMenuClicked(title, to)
        }
    }

    return (
            <NavLink
                to={to}
                onClick={menClickHandler}
                className={({isActive}) => {
                    const bg = ` ${isActive ? 'bg-[#f5f5f5]' : ''} `
                    return `${bg} py-4 flex px-6 gap-3 items-center `
                }}
                end={true}
            >

                { (devPhase == "not_started" || devPhase == "in_progress") &&  <span className="text-slate-400" >{icon}</span> }
                { devPhase == "completed" &&  <span>{icon}</span> }

                <span className={`text-sm`}>
                    { (devPhase == "not_started" || devPhase == "in_progress")  &&  <span className="text-slate-400" >{title}</span> }
                    { devPhase == "completed" &&  <span>{title}</span> }
                </span>
            </NavLink>
    )
}

export default DashboardMenuItem