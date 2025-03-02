

const messages = [
  {id: 1, title: "5-bedroom at Spintex", sender: "John", date: "Jan 25", text: "Hello, this is Ben. Could you please provide information on the price", profileImg: "../src/assets/images/messageImg.svg"},
  {id: 2, title: "5-bedroom at Spintex", sender: "", date: "Jan 25", text: "Hello, this is Ben. Could you please provide information on the price", profileImg: "../src/assets/images/messageImg.svg"},
  {id: 3, title: "5-bedroom at Spintex", sender: "", date: "Jan 25", text: "Hello, this is Ben. Could you please provide information on the price", profileImg: "../src/assets/images/messageImg.svg"},
  {id: 4, title: "5-bedroom at Spintex", sender: "", date: "Jan 25", text: "Hello, this is Ben. Could you please provide information on the price", profileImg: "../src/assets/images/messageImg.svg"},
]

const RecentMessages = () => {
  return (
    <div className="bg-white border p-6 w-full max-w-md">
      <h3 className="text-lg font-medium mb-4">Recent Messages</h3>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-center gap-4">

            {/* Profile Image */}
            <img src={msg.profileImg} alt="" className="w-10 h-10 rounded-full object-cover shrink-0"/>

            {/* Message Content*/}
            <div className="flex-1 min-w-0">
              {/* Tilte and Sender*/}
              <p className="font-semibold text-sm font-[inter]">
                {msg.title} {msg.sender && <span className="font-bold text-black">.{msg.sender}</span>}
              </p>

              <div className="flex fustify-between itemscenter">
                {/* Text */}
                <p className="text-xs text-gray-600 truncate sm:whitespace-normal ">{msg.text}</p>

                {/* Date */}
                <p className="text-xs text-gray-600 whitespace-nowrap">{msg.date}</p>
              </div>
              

            </div>
          </div>

        ))}
      </div>
    </div>
  )
}

export default RecentMessages