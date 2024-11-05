import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircleIcon, XIcon, CheckIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const useTestUsers = () => {
  const user = useQuery(api.functions.user.get);
  if (!user) {
    return [];
  }
  return [user, user, user, user, user];
};

export function PendingFriendsList() {
  const users = useTestUsers();

  return (
    <div className="flex flex-col divide-y">
      <h2 className="text-sm text-muted-foreground p-2.5">Pending Friends</h2>
      {users.map((user, index) => (
        <FriendItem key={index} username={user.username} image={user.image}>
          <Button
            className="rounded-full bg-green-100"
            variant="outline"
            size="icon"
          >
            <CheckIcon />
            <span className="sr-only">Accept</span>
          </Button>
          <Button
            className="rounded-full bg-red-100"
            variant="outline"
            size="icon"
          >
            <XIcon />
            <span className="sr-only">Reject</span>
          </Button>
          <IconButton
            title="Accept"
            icon={<CheckIcon />}
            className="bg-green-100"
          />
          <IconButton title="Reject" icon={<XIcon />} className="bg-red-100" />
        </FriendItem>
      ))}
    </div>
  );
}

function FriendsListEmpty({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 bg-muted/50 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}

export function AcceptedFriendsList() {
  const users = useTestUsers();

  return (
    <div className="flex flex-col divide-y">
      <h2 className="text-sm text-muted-foreground p-2.5 ">Accepted Friends</h2>
      {users.map((user, index) => (
        <FriendItem key={index} username={user.username} image={user.image}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="rounded-full" variant="outline" size="icon">
                <MessageCircleIcon />
                <span className="sr-only">Start DM</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Start DM</TooltipContent>
          </Tooltip>
          <Button
            className="rounded-full bg-red-100"
            variant="outline"
            size="icon"
          >
            <XIcon />
            <span className="sr-only">Remove Friend</span>
          </Button>
        </FriendItem>
      ))}
    </div>
  );
}

function IconButton({
  title,
  className,
  icon,
}: {
  title: string;
  className?: string;
  icon: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn("rounded-full", className)}
          variant="outline"
          size="icon"
        >
          {icon}
          <span className="sr-only">{title}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
}

function FriendItem({
  username,
  image,
  children,
}: {
  username: string;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-2.5 gap-2.5">
      <div className="flex items-center gap-2.5">
        <Avatar className="size-9 border">
          <AvatarImage src={image} />
          <AvatarFallback />
        </Avatar>
        <p className="text-sm font-medium">{username}</p>
      </div>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  );
}
