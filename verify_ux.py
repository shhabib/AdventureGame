from playwright.sync_api import sync_playwright, expect

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

        # Verify error message is visible
        error_message = page.get_by_text("Something went wrong. Please try again.")
        if error_message.is_visible():
            print("✅ Error message is visible")
        else:
            print("❌ Error message is NOT visible")

        # 2. Verify Focus using expect().to_be_focused()
        print("Checking if input is focused...")
        try:
             expect(email_input).to_be_focused()
             print("✅ Input IS focused")
        except AssertionError:
             print("❌ Input is NOT focused")

        # 3. Verify Error Clearing on Type
        print("Typing 'a' to clear error...")
        email_input.type("a")

        # Check if error message is gone immediately
        if not error_message.is_visible():
            print("✅ Error message CLEARED immediately")
        else:
             print("❌ Error message did NOT clear immediately")

        browser.close()

if __name__ == "__main__":
    run()
