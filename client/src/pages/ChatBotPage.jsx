import { useState, useEffect, useRef} from "react";
import Button from "../components/Button.jsx";



export default function ChatBotPage() {
  const [messages, setMessages] = useState([
    { text: "Hi! I am a basic chatbot 🤖", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const getBotReply = (msg) => {
    msg = msg.toLowerCase();
    if (msg.includes("hi") || msg.includes("hello")) return "Hello! How can I help you?";
    if (msg.includes("name")) return "I am a React chatbot.";
    if (msg.includes("bye")) return "Goodbye! 👋";
    return "Sorry, I don't understand that.";
  };

  const UserMessage = ({senderMSG})=>{
    return (
      <div className="ml-auto flex max-w-[70%] gap-3 flex-row-reverse">
        <img
          src="/images/profile-image.jpg"
          className="h-9 w-9 rounded-full"
        />

        <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 
          px-4 py-2 text-white
          break-words whitespace-pre-wrap overflow-wrap-anywhere">
          <p>
            {senderMSG}
          </p>
          <span className="mt-1 block text-xs opacity-70">12:30 PM</span>
        </div>
      </div>
    )
  };

  const BotMessage = ({botMSG}) =>{
    return (
      <div className="flex max-w-[70%] gap-3">
        <img
          src="/images/philos_logo.png"
          className="h-9 w-9 rounded-full"
        />

        <div className="rounded-2xl bg-gray-200 dark:bg-gray-800 
                        px-4 py-2
                        break-words whitespace-pre-wrap overflow-wrap-anywhere">
          <p>
            {botMSG}
          </p>
          <span className="mt-1 block text-xs text-gray-500">12:31 PM</span>
        </div>
      </div>
    )};

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const botMessage = { text: getBotReply(input), sender: "bot" };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  const renderChats = () =>{
    return (
      <div className="flex-1 min-h-0 overflow-y-auto px-2 py-2">
      <div className="text-xs text-center text-gray-500 mb-2">Your chats</div>

      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="px-2 py-1 rounded cursor-pointer
          hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          Chat {i + 1}
        </div>
      ))}
    </div>
    )
  }

  const createSideBar = () =>{
    return (
    <aside className="fixed left-0 top-14 flex flex-col w-60 h-[calc(100vh-3.5rem)]
 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 border-r
 border-gray-300 dark:border-gray-700">

  {/* HEADER */}
  <header className="px-3 py-3 border-b border-gray-300 dark:border-gray-700">
    <div className="flex items-center my-1">
      <button className="px-1 py-2 rounded-full text-left font-medium  hover:bg-gray-200 dark:hover:bg-gray-700">
        <img src="/images/philos_logo.png" className="w-9 h-9" />
      </button>
      <span className="ml-auto font-medium">Philos</span>
      <button className="ml-auto px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">…</button>
    </div>
  </header>

  {/* ACTION BUTTONS */}
  <div className="px-2 py-2 space-y-1 border-b border-gray-300 dark:border-gray-700">
    <Button src="/images/chat_logo.png" name="New Chat" />
    <Button src="/images/search_logo.png" name="Search Chats" />
    <Button src="/images/project_logo.png" name="Create Project" />
    <Button src="/images/image_logo.png" name="Generate Image" />
    <Button src="/images/video_logo.png" name="Generate Video" />
  </div>

  {/* SCROLLABLE CHAT LIST */}
  {renderChats()}

  {/* FOOTER */}
  <footer className="px-3 py-3 border-t border-gray-300 dark:border-gray-700">
    <div className="flex items-center gap-2">
      <img src="/images/user_logo.png" className="w-6 h-6" />
      <div className="text-sm">
        <div>User_Name</div>
        <div className="text-xs text-gray-500">Free credits: 2</div>
      </div>
      <button className="ml-auto text-xs px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
        Upgrade
      </button>
    </div>

    <Button src="/images/setting_logo.png" name="Settings" />
  </footer>

</aside>

    );
  }

const chatRef = useRef(null);

useEffect(() => {
  if (chatRef.current) {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }
}, [messages]);


  const createChatArea = () => {
  return (
    <main className="flex flex-col h-full bg-gray-50 dark:bg-gray-950">

      {/* CHAT HEADER */}
      <div className="h-14 shrink-0 flex items-center justify-between border-b bg-white dark:bg-gray-900 px-6 sticky top-14 z-10">
        <h2 className="text-lg font-semibold text-blue-500">Philos</h2>
        <div className="flex items-center gap-2 text-xs">
          <Button src="/images/share_logo.png" name="Share" />
          <Button src="/images/addFriend_logo.png" name="Add people" />
        </div>
      </div>

      {/* MESSAGES (ONLY SCROLL AREA) */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
      >
        {/* Welcome */}
        <div className="text-center py-12">
          <img src="/images/philos_logo.png" className="mx-auto mb-4 h-20 w-20" />
          <h2 className="mb-2 text-2xl font-semibold text-blue-500">
            Hello Vansh! 👋
          </h2>
          <p className="text-gray-500">
            I'm Philos, your AI wellness companion.
          </p>
        </div>

        {messages.map((msg, index) =>
          msg.sender === "user"
            ? <UserMessage key={index} senderMSG={msg.text} />
            : <BotMessage key={index} botMSG={msg.text} />
        )}
      </div>

      {/* CHAT INPUT */}
      <div className="shrink-0 border-t bg-white dark:bg-gray-900 px-4 py-3 sticky bottom-0">
        <div className="flex items-center gap-3">
          <button className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200">📎</button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 rounded-full border px-4 py-2 text-sm"
          />

          <button className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200">🎤</button>

          <button
            onClick={sendMessage}
            className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
          >
            ➤
          </button>
        </div>
      </div>

    </main>
  );
};

  
  return (
    <>
      {createSideBar()}
      <div className="ml-60 mt-15 h-[calc(100vh-3.5rem)]">
        {createChatArea()}
      </div>
    </>
  );

}
