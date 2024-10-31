"use client";

import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  // Query from convex database
  const messages = useQuery(api.functions.message.list);
  // create message using a mutation
  const createMessage = useMutation(api.functions.message.create);
  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMessage({ sender: "Alice", content: input });
    //setMessages([...messages, {sender: "Alice", content: input }]);
    setInput("");
  };

  return (
    <>
      <Authenticated>
        <div>
          {messages?.map((message, index) => (
            // question mark '?' makes the property optional
            <div key={index}>
              <strong>{message.sender}</strong>: {message.content}
            </div>
          ))}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="message"
              id="message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </>
  );
}
