import UserAdvertisements from "@/components/shared-dashboard/UserAdvertisements.tsx";
import {useAppSelector} from "@/hooks";

function AgentAdvertisementsPage() {

    const { userInfo: currentUser } = useAppSelector(state => state.auth)

    return (
        <UserAdvertisements userId={currentUser?.id}  />
    )
}

export default AgentAdvertisementsPage