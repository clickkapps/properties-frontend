import {NavLink} from "react-router";
import {ReactNode} from "react";

function DashboardMenuItem({ icon, title, to = "/", onMenuClicked }: { icon: ReactNode, title: string, active?: boolean, to? : string, onMenuClicked?: (title: string, to: string) => void}) {

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

                {icon}
                <span className="text-sm">{title}</span>
            </NavLink>
    )
}

export default DashboardMenuItem