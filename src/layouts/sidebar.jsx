import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CircleUser, Menu, Plus } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { navItems } from "../App";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[80px_240px_1fr_240px]">
      <Sidebar collapsed={isSidebarCollapsed} setCollapsed={setIsSidebarCollapsed} />
      <ChannelSidebar />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold"># general</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Input className="w-64" placeholder="Search..." />
            <UserDropdown />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
        <footer className="border-t bg-gray-100/40 p-4">
          <div className="flex items-center gap-2">
            <Input className="flex-1" placeholder="Type a message..." />
            <Button>Send</Button>
          </div>
        </footer>
      </div>
      <UserList />
    </div>
  );
};

const Sidebar = ({ collapsed, setCollapsed }) => (
  <div className={cn("flex flex-col items-center border-r bg-gray-100/40 py-4", collapsed ? "w-20" : "w-80")}>
    <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="mb-4">
      <Menu className="h-6 w-6" />
    </Button>
    <ScrollArea className="flex-1 w-full">
      <div className="flex flex-col items-center space-y-4 px-2">
        <ServerIcon />
        <ServerIcon />
        <ServerIcon />
        <Button variant="ghost" size="icon" className="rounded-full">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </ScrollArea>
    <Separator className="my-4" />
    <UserProfile collapsed={collapsed} />
  </div>
);

const ServerIcon = () => (
  <Avatar className="h-12 w-12 cursor-pointer transition-all hover:rounded-2xl">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
);

const UserProfile = ({ collapsed }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="w-full flex items-center gap-2 px-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {!collapsed && <span className="text-sm font-medium">John Doe</span>}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const ChannelSidebar = () => (
  <div className="flex flex-col border-r bg-gray-100/40">
    <div className="flex h-14 items-center border-b px-4">
      <h2 className="font-semibold">Server Name</h2>
    </div>
    <nav className="flex-1 overflow-auto py-4">
      <div className="px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                isActive && "bg-gray-200 text-gray-900"
              )
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  </div>
);

const UserList = () => (
  <div className="border-l bg-gray-100/40 py-4">
    <h3 className="mb-4 px-4 text-sm font-semibold">Online Users</h3>
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="space-y-2 px-4">
        <UserListItem name="Alice" status="online" />
        <UserListItem name="Bob" status="idle" />
        <UserListItem name="Charlie" status="dnd" />
        {/* Add more users as needed */}
      </div>
    </ScrollArea>
  </div>
);

const UserListItem = ({ name, status }) => (
  <div className="flex items-center gap-2">
    <Avatar className="h-8 w-8">
      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
    <div>
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-gray-500">{status}</p>
    </div>
  </div>
);

const UserDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default Layout;