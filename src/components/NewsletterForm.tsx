import { useState, useId, useRef, useEffect } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const errorId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    // Simulate API call
    setTimeout(() => {
      if (email.toLowerCase().includes("error")) {
        setStatus("error");
        setMessage("Invalid email address. Please try again.");
      } else {
        setStatus("success");
        setMessage("Successfully subscribed! Check your inbox.");
        setEmail("");
      }
    }, 1500);
  };

  useEffect(() => {
    if (status === "error" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [status]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}
      aria-labelledby="newsletter-title"
    >
      <h3 id="newsletter-title">Subscribe to our newsletter</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "1rem",
        }}
      >
        <label
          htmlFor="email-input"
          style={{ fontSize: "0.9rem", fontWeight: 500 }}
        >
          Email address{" "}
          <span aria-hidden="true" style={{ color: "#d32f2f" }}>
            *
          </span>
        </label>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            id="email-input"
            ref={inputRef}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={handleEmailChange}
            required
            autoComplete="email"
            spellCheck={false}
            disabled={status === "loading"}
            aria-invalid={status === "error"}
            aria-describedby={status === "error" ? errorId : undefined}
            style={{
              padding: "0.5rem",
              flex: 1,
              borderColor: status === "error" ? "#d32f2f" : undefined,
              outlineColor: status === "error" ? "#d32f2f" : undefined,
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            aria-busy={status === "loading"}
            style={{ minWidth: "100px" }}
          >
            {status === "loading" ? "Joining..." : "Subscribe"}
          </button>
        </div>
      </div>

      {/* Live region for feedback */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ marginTop: "0.5rem", minHeight: "1.5em" }}
      >
        {message && (
          <p
            id={status === "error" ? errorId : undefined}
            style={{
              color: status === "success" ? "#4caf50" : "#d32f2f",
              margin: 0,
              fontSize: "0.875rem",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
