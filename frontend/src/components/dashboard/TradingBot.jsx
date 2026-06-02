import {
  Bot,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

export default function TradingBot() {

  const [open, setOpen] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        type: "ai",
        text: "Hello, I am TradeMe AI. Ask anything about stocks or investing.",
      },
    ]);

  const [input, setInput] =
    useState("");

  const handleSend = () => {

    if (!input.trim()) return;

    const userMsg = {
      type: "user",
      text: input,
    };

    let aiReply =
      "Market conditions look neutral currently.";

    if (
      input
        .toLowerCase()
        .includes("buy")
    ) {
      aiReply =
        "This stock shows positive momentum. Consider buying in small quantity.";
    }

    if (
      input
        .toLowerCase()
        .includes("risk")
    ) {
      aiReply =
        "Always diversify your portfolio to reduce market risk.";
    }

    if (
      input
        .toLowerCase()
        .includes("investment")
    ) {
      aiReply =
        "Long-term investing generally performs better than emotional trading.";
    }

    setMessages((prev) => [
      ...prev,
      userMsg,
      {
        type: "ai",
        text: aiReply,
      },
    ]);

    setInput("");
  };

  return (
    <>

      {open && (

        <div className="bot-window glass">

          <div className="bot-header">

            <span>
              TradeMe AI
            </span>

            <X
              size={18}
              onClick={() =>
                setOpen(false)
              }
            />

          </div>

          <div className="bot-messages">

            {messages.map(
              (msg, index) => (

                <div
                  key={index}
                  className={
                    msg.type === "user"
                      ? "bot-user"
                      : "bot-ai"
                  }
                >

                  {msg.text}

                </div>

              )
            )}

          </div>

          <div className="bot-input-area">

            <input
              placeholder="Ask about stocks..."
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
            />

            <button
              onClick={handleSend}
            >
              Send
            </button>

          </div>

        </div>

      )}

      <div
        className="trading-bot"
        onClick={() =>
          setOpen(!open)
        }
      >

        <Bot size={28} />

      </div>

    </>
  );
}