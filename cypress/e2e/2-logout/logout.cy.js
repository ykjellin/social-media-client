describe("Logout Test", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.contains("button", "Login").click();
    cy.get("#loginEmail").type("validEmail@noroff.no");
    cy.get("#loginPassword").type("validPassword");
    cy.get('#loginForm button[type="submit"]').click();

    cy.get('[data-auth="logout"]').should("be.visible");
  });

  it("should log the user out", () => {
    cy.get('[data-auth="logout"]').click();
  });
});
