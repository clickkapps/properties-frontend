import AgentTopBar from "@/components/agent-dashboard/AgentTopBar.tsx";
import AgentNavBar from "@/components/agent-dashboard/AgentNavBar.tsx";

const AgentHeader = () => {

  return (
      <div id="fixed-header">
          <AgentNavBar />
          <AgentTopBar/>
      </div>

  )
}

export default AgentHeader