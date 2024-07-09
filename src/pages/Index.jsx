import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Index = () => {
  return (
    <ScrollArea className="h-[calc(100vh-10rem)]">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
      </div>
    </ScrollArea>
  );
};

const ChatMessage = ({ user, content, timestamp }) => (
  <div className="flex items-start gap-4">
    <Avatar>
      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user}`} />
      <AvatarFallback>{user[0]}</AvatarFallback>
    </Avatar>
    <div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">{user}</span>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>
      <p className="mt-1">{content}</p>
    </div>
  </div>
);

const messages = [
  {
    user: "Alice",
    content: "Hey everyone! How's it going?",
    timestamp: "Today at 2:30 PM",
  },
  {
    user: "Bob",
    content: "Hi Alice! Everything's good here. How about you?",
    timestamp: "Today at 2:32 PM",
  },
  {
    user: "Charlie",
    content: "Hello folks! I just joined this server. Excited to be here!",
    timestamp: "Today at 2:35 PM",
  },
  {
    user: "Alice",
    content: "Welcome Charlie! Glad to have you here. Feel free to ask any questions!",
    timestamp: "Today at 2:36 PM",
  },
  {
    user: "Bob",
    content: "Yeah, welcome aboard Charlie! This is a great community.",
    timestamp: "Today at 2:37 PM",
  },
  // Add more messages as needed
];

export default Index;