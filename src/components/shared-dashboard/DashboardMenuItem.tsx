import {NavLink} from "react-router";
import {ReactNode} from "react";
import {closeDrawer} from "@/store/ui-slice.ts";
import {useDispatch} from "react-redux";

function DashboardMenuItem({ icon, title, to = "/" }: { icon: ReactNode, title: string, active?: boolean, to? : string}) {

    const dispatch = useDispatch();

    return (
        <>
            <NavLink to={to} onClick={() => dispatch(closeDrawer())} className={ ( { isActive } ) => ` ${ isActive ? 'bg-[#f5f5f5]' : ''} ` } end={true} >
                <menu>
                    <li className="py-4 flex px-6 gap-3 items-center">
                        { icon }
                        <span className="text-sm">{title}</span>
                    </li>
                </menu>
            </NavLink>
        </>
    )
}

export default DashboardMenuItem