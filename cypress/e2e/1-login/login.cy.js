describe("Login Tests", () => {
  beforeEach(() => {
    cy.fixture("login").as("userData");
    cy.visit("/");

    cy.contains("button", "Login").click({ force: true });
  });

  it("should display the login form", () => {
    cy.get("#loginModal").should("be.visible");
    cy.get("#loginForm").should("be.visible");
  });

  it("should allow a user to log in with valid credentials", function () {
    cy.get("#loginEmail").type(this.userData.email);
    cy.get("#loginPassword").type(this.userData.password);

    cy.get('#loginForm button[type="submit"]').click({ force: true });

    cy.get('[data-auth="logout"]').should("be.visible");
  });

  it("should show validation errors for empty fields", () => {
    cy.get('#loginForm button[type="submit"]').click({ force: true });

    cy.get("#loginEmail:invalid").should("exist");
    cy.get("#loginPassword:invalid").should("exist");
  });
});
