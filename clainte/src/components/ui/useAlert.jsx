import { Alert, Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const useAlert = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let messageTimeouts = [];
    messages.forEach((message) => {
      messageTimeouts.push(
        setTimeout(() => {
          setMessages((prev) => prev.filter((mess) => mess.id !== message.id));
        }, 5000)
      );
    });
    return () => {
      messageTimeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [messages]);

  const CustomAlert = () => {
    return messages.map((message, index) => (
      <Box key={index} className="w-full ">
        <Alert
          severity={message?.variant}
          onClose={() =>
            setMessages((prev) => prev.filter((mess) => mess.id !== message.id))
          }
        >
          {message?.id} =&gt; {message?.description}
        </Alert>
      </Box>
    ));
  };

  return [CustomAlert, setMessages];
};

export default useAlert;
