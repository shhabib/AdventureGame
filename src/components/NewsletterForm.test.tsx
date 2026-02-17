import { render, screen, fireEvent, act } from "@testing-library/react";
import { NewsletterForm } from "./NewsletterForm";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";

describe("NewsletterForm", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders correctly", () => {
    render(<NewsletterForm />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /subscribe/i }),
    ).toBeInTheDocument();
  });

  it("shows loading state on submit", async () => {
    render(<NewsletterForm />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    expect(screen.getByRole("button")).toHaveTextContent(/joining/i);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(input).toBeDisabled();
  });

  it("shows success message after submission", async () => {
    render(<NewsletterForm />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText(/successfully subscribed/i)).toBeInTheDocument();

    // Check if input is cleared
    expect(input).toHaveValue("");
    // Check if button is back to normal
    expect(screen.getByRole("button")).toHaveTextContent(/subscribe/i);
  });

  it("shows error state on failure", async () => {
    render(<NewsletterForm />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "fail@example.com" } });
    fireEvent.click(button);

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("shifts focus to input on error", async () => {
    render(<NewsletterForm />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "fail@example.com" } });
    fireEvent.click(button);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(input).toHaveFocus();
  });

  it("clears error state when user types", async () => {
    render(<NewsletterForm />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    // Trigger error
    fireEvent.change(input, { target: { value: "fail@example.com" } });
    fireEvent.click(button);
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");

    // Type to clear error
    fireEvent.change(input, { target: { value: "fail@example.com2" } });

    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("associates input with error message via aria-describedby", async () => {
    render(<NewsletterForm />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "fail@example.com" } });
    fireEvent.click(button);
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    const errorMessage = screen.getByText(/something went wrong/i);
    expect(errorMessage).toHaveAttribute("id");
    const messageId = errorMessage.getAttribute("id");

    expect(input).toHaveAttribute("aria-describedby", messageId);
  });
});
