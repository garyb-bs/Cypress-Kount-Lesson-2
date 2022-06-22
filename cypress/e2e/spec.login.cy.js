describe('A simple login test', () => {
  it('should login successfully', () => {
    cy.visit('https://stealmylogin.com/demo.html');

    cy.get("[name=username]")
      .type('fake@email.com');

    cy.get("[name=password]")
      .type('aPassword');

    cy.get("[type=submit]")
      .click();
  }),

  it('should land on the correct page', () => {
    // Should be on a new URL which includes 'example.com
    cy.url().should('include', 'example.com')
  })
})