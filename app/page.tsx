

import Chat from './(app)/chat/_components/chat';
import NotLoggedInAlert from './(app)/chat/_components/not-logged-in-alert';


const Graph = () => {
    return (
        <div className="flex-1 h-0 overflow-y-hidden w-full">
        <Chat />
        <NotLoggedInAlert />
      </div>
    )
}

export default Graph;