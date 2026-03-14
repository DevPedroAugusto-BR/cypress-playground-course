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

  it.only('validate text after click in radio buttons', () => {
    //Validando que o on está marcado como padrão
    cy.contains('#on-off', 'ON').should('be.visible')

    //Setando para off
    cy.get('#off').should('be.visible').check()
    //Validando que o valor foi setado
    cy.contains('#on-off', 'OFF').should('be.visible')
    cy.contains('#on-off', 'ON').should('not.exist')

    //Setando para On
    cy.get('#on').should('be.visible').check()
    
    //Validando que o valor foi setado
    cy.contains('#on-off', 'ON').should('be.visible')
    cy.contains('#on-off', 'OFF').should('not.exist')
  })
})

