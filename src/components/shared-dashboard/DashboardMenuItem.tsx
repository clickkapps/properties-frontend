import {Link} from "react-router";
import {ReactNode} from "react";

function DashboardMenuItem({ icon, title, to = "/", active = false }: { icon: ReactNode, title: string, active?: boolean, to? : string}) {
    return (
        <>
            <Link to={to}>
                <menu className={` ${active ? 'bg-[#f5f5f5]' : ''} `}>
                    <li className="py-4 flex px-6 gap-3 items-center">
                        { icon }

                        <span className="text-sm">{title}</span>
                    </li>
                </menu>
            </Link>
        </>
    )
}

export default DashboardMenuItem