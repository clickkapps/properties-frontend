import { Skeleton } from "@/components/ui/skeleton"

type Props = {
    showAvatar?: boolean
    showTitle?: boolean
    showSubTitle?: boolean
}
export function SkeletonListItem({ showAvatar = true, showTitle = true, showSubTitle = true }: Props) {
    return (
        <div className="flex items-center space-x-4">
            { showAvatar && (<Skeleton className="h-12 w-12 rounded-full" />)}
            <div className="space-y-2 w-full">
                { showTitle && (<Skeleton className="h-4 w-full" />) }
                { showSubTitle && (<Skeleton className="h-4 w-full" />) }
            </div>
        </div>
    )
}

export default SkeletonListItem;