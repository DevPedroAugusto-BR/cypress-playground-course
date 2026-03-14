describe('Cypress Playground', () => {
  
  beforeEach(() => {
    cy.visit('https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html');
  })

  it('shows a promotional banner', () => {
    //Implementação do caso de teste
    cy.get('#promotional-banner').should('be.visible')
  })

  it('create a subscribe button', () => {
    cy.contains('[type="submit"]', 'Subscribe').should('be.visible').click()

    cy.contains(
      '#success',
      "You've been successfully subscribed to our newsletter."
    ).should('be.visible')
  })

  it('enter a type text in the first "Sign Here"', () => {
    
    cy.get('[placeholder="Joe Doe"]')
    .scrollIntoView()
    .should('be.visible')
    .type('Pedro')

    cy.contains('#signature', 'Pedro').should('be.visible')
  })

  it('check and uncheck the checkbox', () => {
    cy.get('[placeholder="Jane Doe"]')
    .scrollIntoView()
    .should('be.visible')
    .type('Pedro Augusto Mendes')

    cy.get('[type="checkbox"]').check().should('be.checked')

    cy.contains('[id="signature-triggered-by-check"]', 'Pedro Augusto Mendes').should('be.visible')
  })
})