import { LayoutDashboard } from 'lucide-react';

function DashboardMenuItem({ title, selected = false }: { title: string, selected?: boolean}) {
    return (
        <>
            <menu className={` ${selected ? 'bg-[#f5f5f5]' : ''} `}>
                <li className="py-4 flex px-6 gap-3 items-center">
                    <LayoutDashboard size={20} />
                    <span>{ title }</span>
                </li>
            </menu>
        </>
    )
}

export default DashboardMenuItem