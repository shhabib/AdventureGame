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

  it("focuses input on error", async () => {
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

  it("clears error on input change", async () => {
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

    // Type to clear error
    fireEvent.change(input, { target: { value: "fixed@example.com" } });

    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-invalid", "true");
  });
});
