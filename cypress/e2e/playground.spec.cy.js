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

  it('validate text after click in radio buttons', () => {
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

  it('Implements select test in cypress', () => {
    //Encontrando o select para interação
    cy.get('#selection-type').should('be.visible').select(2)

    /*     //Selecionando o elemeno standard
        cy.get('#selection-type').select(2) */

    //Validando o resultado
    cy.contains('#select-selection', 'STANDARD').should('be.visible')

    //Selecionando o basic, agora
    cy.get('#selection-type').select('Basic')
    cy.contains('#select-selection', 'BASIC').should('be.visible')
  })

  it('Select multiples options em select champs', () => {
    //Validando estado inicial
    cy.contains('[id="fruits-paragraph"]', "You haven't selected any fruit yet.").should('be.visible')

    cy.get('select[multiple]').select(['Apple', 'Banana', 'Date'])

    //Validando o resultado
    cy.contains('p', "You've selected the following fruits: apple, banana, date").should('be.visible')
  })

  it('learning to make upload in cypress application', () => {
    //Validação estado inicial
    cy.contains('[id="try-it-out"]', 'Try it out by creating a test that selects a file and make sure the correct file name is displayed.').should('be.visible')

    //Realizando o upload
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')

    //Realizando a validação
    cy.contains('[id="file"]', "The following file has been selected for upload: example.json").should('be.visible')
  })

  it('Learning cy.request method', () => {
    //Validade initial state
    cy.contains(
      '[id="try-it-out"]',
      'Try it out by creating a test that intercepts the request that is triggged after clicking the Get TODO button,',
      'but this time, simulate an network failure.',
      'Click the button and make sure to wait for the request to happen.',
      'Also, make sure a fallback element is displayed.'
    ).should('be.visible')

    //Intercepta a requisição
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1').as('getTodos')

    //Realizando a ação
    cy.contains('button', 'Get TODO').should('be.visible').click()

    //Pegando a resposta e validando
    cy.wait('@getTodos').then((returned) => {
      const response = returned.response
      expect(response.statusCode).to.eq(200)
      //expect(response.body.userId).to(true)
    })
    //Asserção e2e
    cy.contains('li', 'TODO ID: 1').should('be.visible')
  })

  it('Intercepting request and mocking the response', () => {
    //Gerando dados fakes com faker
    cy.generateFixture()

    //Interceptando a rede
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1', { fixture: 'data.json' }).as('getTodos')

    //Realizando a ação
    cy.contains('button', 'Get TODO').should('be.visible').click()

    //Capturando a resposta e validando
    cy.wait('@getTodos').then((returned) => {
      const response = returned.response
      expect(response.statusCode).to.eq(200)
      expect(response.body.hits).to.be.a('array')
      response.body.hits.forEach((i) => {
        expect(i.userId).to.be.a('number')
        expect(i.id).to.be.a('number')
        expect(i.title).to.be.a('string')
        expect(i.completed).to.be.a('boolean')
      })
    })

    //Asserção e2e
    cy.contains('li', 'TODO ID:').should('be.visible')
    cy.contains('li', 'Title:').should('be.visible')
    cy.contains('li', 'Completed:').should('be.visible')
    cy.contains('li', 'User ID:').should('be.visible')
  })

  it('Simulation error in network application', () => {
    //Interceptando a rede
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1', { statusCode: 500 }).as('serverFailure')

    //Realizando a ação
    cy.contains('button', 'Get TODO').should('be.visible').click()

    //capturando a resposta
    cy.wait('@serverFailure').then((returned) => {
      expect(returned.response.statusCode).to.eq(500)
    })

    cy.contains('.error', 'Oops, something went wrong. Refresh the page and try again.').should('be.visible')
  })

  it('Simulation error in network (connection)', () => {
    //Interceptando a rede
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1', { forceNetworkError: true }).as('networkFailure')

    //Realizando a ação
    cy.contains('button', 'Get TODO').should('be.visible').click()

    //Capturando a resposta
    cy.wait('@networkFailure').then((returned) => {
      expect(returned.error).to.be.a('Error')
    })

    cy.contains('.error', 'Oops, something went wrong. Check your internet connection, refresh the page, and try again').should('be.visible')
  })

  Cypress._.times(10, i => {
    it(`selects ${i + 1} out of 10`, () => {
      //validação estado inicial
      cy.contains('h2', '.invoke().trigger()').should('be.visible')

      //Encontrando o elemento 
      let value = 7
      cy.get('[type="range"]').should('be.visible').invoke('val', value).trigger('change')

      //Validando resultado final
      cy.contains('[id="level-paragraph"]', `You're on level: ${value}`).should('be.visible')
    })
  })

  it('selects a date and asserts the correct date has been displayead', () => {
    cy.get('#date').type('2026-03-18').blur()

    cy.contains(
      '[id="date-paragraph"]',
      "The date you've selected is: 2026-03-18"
    ).should('be.visible')
  })

  it.only('learning a protected data with cypress env', () => {
    //Interagindo com o campo de senha
    cy.get('[id="password"]').type(Cypress.env('password'))

    //Interagindo com o checkbos
    cy.get('[id="show-password-checkbox"]').check()

    cy.get('#password-input input[type="password"]').should('not.exist')
    cy.get('#password-input input[type="text"]')
      .should('be.visible')
      .and('have.value', Cypress.env('password'))
  })
})

describe.skip('API Test', () => {
  let response

  it('Create a case test for API', () => {
    cy.request({
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'GET'
    }).then((returned) => {
      expect(returned.status).to.eq(200)
    })
  })
})

