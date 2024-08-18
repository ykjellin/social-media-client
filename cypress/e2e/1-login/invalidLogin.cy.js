describe("Invalid Login Tests", () => {
  beforeEach(() => {
    cy.fixture("invalidlogin").as("invalidUserData");
    cy.visit("/");

    cy.contains("button", "Login").click({ force: true });
  });

  it("should not allow login with an invalid email format", () => {
    cy.get("#loginEmail").type("invalidEmail", { force: true });
    cy.get("#loginPassword").type("validPassword", { force: true });

    cy.get('#loginForm button[type="submit"]').click({ force: true });

    cy.get("#loginModal").should("be.visible");
  });

  it("should not allow login with an incorrect email", function () {
    cy.get("#loginEmail").type(this.invalidUserData.email, { force: true });
    cy.get("#loginPassword").type("validPassword", { force: true });

    cy.get('#loginForm button[type="submit"]').click({ force: true });

    cy.get("#loginModal").should("be.visible");
  });

  it("should not allow login with an incorrect password", function () {
    cy.get("#loginEmail").type("validEmail@noroff.no", { force: true });
    cy.get("#loginPassword").type(this.invalidUserData.password, {
      force: true,
    });

    cy.get('#loginForm button[type="submit"]').click({ force: true });

    cy.get("#loginModal").should("be.visible");
  });

  it("should not allow login when both fields are empty", () => {
    cy.get('#loginForm button[type="submit"]').click({ force: true });

    cy.get("#loginModal").should("be.visible");
  });
});
