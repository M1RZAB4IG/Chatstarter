"use client";

import { useQuery } from "convex/react";
import { use } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Avatar } from "@/components/ui/avatar";

export default function MessagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const user = useQuery(api.functions.user.get);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col divide-y max-h-screen">
      <header className="flex items-center gap-2 p-4">
        <Avatar className="size-8 border">
          <AvatarImage src={user.image} />
          <AvatarFallback />
        </Avatar>
      </header>
    </div>
  );
}

function MessageItem() {
  return <div className="flex items-center px-4 gap-2"></div>;
}
