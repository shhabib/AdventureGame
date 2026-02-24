from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to the app
        print("Navigating to http://localhost:5173")
        try:
            page.goto("http://localhost:5173", timeout=10000)
        except Exception as e:
            print(f"Failed to navigate: {e}")
            return

        # Check initial state
        try:
            input_locator = page.get_by_label("Email address")
            button_locator = page.get_by_role("button", name="Subscribe")

            # Type 'error' to trigger error flow
            print("Typing 'error' and submitting")
            input_locator.fill("error@example.com")
            button_locator.click()

            # Wait for error message
            print("Waiting for error message")
            error_message = page.get_by_text("Something went wrong")
            error_message.wait_for()

            # Check focus
            print("Checking focus")
            # We need to wait a tiny bit for the focus to be applied by the react effect if not immediate
            # But wait_for() on error message should correspond to the state change.
            # Let's check if input is focused.
            # Give it a tiny sleep just in case the focus happens in next tick after render
            time.sleep(0.1)
            is_focused = input_locator.evaluate("node => document.activeElement === node")
            print(f"Input focused: {is_focused}")

            if not is_focused:
                print("FAIL: Input is not focused!")
            else:
                print("PASS: Input is focused.")

            # Check ARIA describedby
            print("Checking aria-describedby")
            described_by = input_locator.get_attribute("aria-describedby")
            print(f"aria-describedby: {described_by}")

            error_id = error_message.get_attribute("id")
            print(f"Error message ID: {error_id}")

            if described_by == error_id and error_id is not None:
                 print("PASS: ARIA describedby matches error ID.")
            else:
                 print("FAIL: ARIA describedby mismatch or missing ID.")

            # Check clear on type
            print("Typing 'a' to clear error")
            input_locator.type("a")

            # Check that error styling (border color) or aria-invalid is gone
            # React updates state, so aria-invalid should be gone.
            # wait for react update
            time.sleep(0.1)
            is_invalid = input_locator.get_attribute("aria-invalid")
            print(f"aria-invalid after typing: {is_invalid}")

            if is_invalid != "true":
                print("PASS: aria-invalid cleared.")
            else:
                print("FAIL: aria-invalid still true.")

            # Take screenshot of the error state
            print("Reloading to capture error state screenshot...")
            page.reload()
            input_locator.fill("error@example.com")
            button_locator.click()
            error_message.wait_for()
            time.sleep(0.5) # Wait for focus and animations

            page.screenshot(path="verification/verification.png")
            print("Screenshot saved to verification/verification.png")

        except Exception as e:
            print(f"Test failed: {e}")
            page.screenshot(path="verification/error_state.png")

        browser.close()

if __name__ == "__main__":
    run()
