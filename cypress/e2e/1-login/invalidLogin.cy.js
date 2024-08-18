describe("Invalid Login Tests", () => {
  beforeEach(() => {
    cy.fixture("invalidlogin").as("invalidUserData");
    cy.visit("/");

    cy.contains("button", "Login").click({ force: true });
  });

  it("should not allow login with an invalid email format", () => {
    cy.get("#loginEmail").type("invalidEmail");
    cy.get("#loginPassword").type("validPassword");

    cy.get('#loginForm button[type="submit"]').click({ force: true });

    cy.get("#loginModal").should("be.visible");
  });

  it("should not allow login with an incorrect email", function () {
    cy.get("#loginEmail").type(this.invalidUserData.email);
    cy.get("#loginPassword").type("validPassword");

    cy.get('#loginForm button[type="submit"]').click({ force: true });

    cy.get("#loginModal").should("be.visible");
  });

  it("should not allow login with an incorrect password", function () {
    cy.get("#loginEmail").type("validEmail@noroff.no");
    cy.get("#loginPassword").type(this.invalidUserData.password);

    cy.get('#loginForm button[type="submit"]').click({ force: true });

    cy.get("#loginModal").should("be.visible");
  });

  it("should not allow login when both fields are empty", () => {
    cy.get('#loginForm button[type="submit"]').click({ force: true });

    cy.get("#loginModal").should("be.visible");
  });
});
