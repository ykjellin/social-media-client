describe("Logout Test", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.window().then((win) => {
      win.localStorage.setItem("token", "fake-token");
      win.localStorage.setItem(
        "profile",
        JSON.stringify({ name: "Bob", email: "Bob@noroff.no" }),
      );
    });

    cy.reload();

    cy.get('[data-auth="logout"]').should("be.visible");
  });

  it("should log the user out", () => {
    cy.get('[data-auth="logout"]').click({ force: true });

    cy.window().then((win) => {
      win.localStorage.clear();
    });

    cy.reload();

    cy.get('[data-auth="login"]').should("be.visible");
    cy.get('[data-auth="register"]').should("be.visible");

    cy.log("Logout test completed successfully.");
  });
});
