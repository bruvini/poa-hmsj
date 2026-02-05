from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    print("Navigating to Configuracoes...")
    page.goto("http://localhost:8080/configuracoes")

    print("Waiting for form...")
    page.wait_for_selector("text=Entrada de Dados - Estatística")

    print("Selecting Setor...")
    # Open the dropdown
    page.click("button[role='combobox']")

    # Wait for the options to appear and click 'UTI'
    # Use role=option to avoid hidden accessibility elements
    print("Clicking option...")
    page.get_by_role("option", name="UTI").click()

    print("Filling fields...")
    page.fill("input[name='pacientes00h']", "10")
    page.fill("input[name='internacoes']", "2")
    page.fill("input[name='altas']", "1")
    page.fill("input[name='obitos']", "1")
    page.fill("input[name='transfPara']", "1")

    print("Submitting...")
    page.click("button:has-text('Salvar Dados')")

    print("Verifying table update...")
    # Look for the row in the table
    # We expect 'UTI' and the calculated sum '3'
    expect(page.get_by_role("cell", name="UTI")).to_be_visible()
    expect(page.get_by_role("cell", name="3", exact=True)).to_be_visible()

    print("Taking screenshot...")
    page.screenshot(path="verification_config.png")

    browser.close()
    print("Done.")

with sync_playwright() as playwright:
    run(playwright)
