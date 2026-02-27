from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to the app
        print("Navigating to http://localhost:5173/")
        page.goto("http://localhost:5173/")

        # Locate elements
        email_input = page.get_by_label("Email address")
        subscribe_button = page.get_by_role("button", name="Subscribe")

        # 1. Trigger error
        print("Submitting 'fail@example.com' to trigger error...")
        email_input.fill("fail@example.com")
        subscribe_button.click()

        # Wait for error state
        print("Waiting for error state...")
        page.wait_for_timeout(2000)

        # Take screenshot of error state with focus
        page.screenshot(path="verification_error_focus.png")
        print("Captured verification_error_focus.png")

        # 2. Type to clear error
        print("Typing 'a' to clear error...")
        email_input.type("a")

        # Take screenshot of cleared error state
        page.screenshot(path="verification_error_cleared.png")
        print("Captured verification_error_cleared.png")

        browser.close()

if __name__ == "__main__":
    run()
