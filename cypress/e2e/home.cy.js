describe('home', () => {
  it('WebApp must be online', () => {
    cy.visit('http://localhost:8080')
    cy.title().should('eq', 'Gerencie suas tarefas com Mark L')
  })
})