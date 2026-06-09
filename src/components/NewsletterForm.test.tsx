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

  it('shows error state and manages focus correctly', async () => {
    render(<NewsletterForm />)
    const input = screen.getByLabelText(/email address/i)
    const button = screen.getByRole('button', { name: /subscribe/i })

    fireEvent.change(input, { target: { value: 'error@example.com' } })
    fireEvent.click(button)

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    const errorMessage = screen.getByText(/invalid email address/i)
    expect(errorMessage).toBeInTheDocument()

    // Check accessibility link
    expect(input).toHaveAttribute('aria-describedby', errorMessage.id)
    expect(input).toHaveAttribute('aria-invalid', 'true')

    // Verify focus management
    expect(input).toHaveFocus()
  })

  it('clears error state when user starts typing', async () => {
    render(<NewsletterForm />)
    const input = screen.getByLabelText(/email address/i)
    const button = screen.getByRole('button', { name: /subscribe/i })

    fireEvent.change(input, { target: { value: 'error@example.com' } })
    fireEvent.click(button)

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()

    // Start typing
    fireEvent.change(input, { target: { value: 'correct@example.com' } })

    // Error should be gone immediately
    expect(screen.queryByText(/invalid email address/i)).not.toBeInTheDocument()
    expect(input).not.toHaveAttribute('aria-invalid', 'true')
    expect(input).not.toHaveAttribute('aria-describedby')
  })
});
