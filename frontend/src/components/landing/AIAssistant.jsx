export default function AIAssistant() {
  return (
    <div className="ai-wrapper">

      <div className="ai-left glass">

        <h2>AI Trading Assistant</h2>

        <p className="ai-desc">
          TradeMe AI Assistant helps
          beginners understand stock
          market movements, trading
          strategies, portfolio risk,
          technical indicators and
          market psychology using
          intelligent real-time guidance.
        </p>

        <div className="ai-features">

          <div className="ai-feature-card">
            Real-time stock analysis
          </div>

          <div className="ai-feature-card">
            Beginner-friendly guidance
          </div>

          <div className="ai-feature-card">
            Portfolio suggestions
          </div>

          <div className="ai-feature-card">
            Market sentiment insights
          </div>

        </div>
      </div>

      <div className="ai-chat glass">

        <div className="chat-header">
          TradeMe AI
        </div>

        <div className="chat-body">

          <div className="message user">
            Should I buy RELIANCE now?
          </div>

          <div className="message ai">
            RELIANCE is currently showing
            positive momentum with
            +1.25% movement today.
            Watch resistance near ₹2,900.
          </div>

          <div className="message user">
            What sectors are performing well?
          </div>

          <div className="message ai">
            Banking and IT sectors are
            currently leading today's
            market performance.
          </div>

        </div>

        <div className="chat-input">
          Ask AI about stocks...
        </div>

      </div>

    </div>
  );
}