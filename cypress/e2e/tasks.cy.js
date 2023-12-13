import {faker} from '@faker-js/faker'

describe('Tasks', () => {
    it('Must register a new task ', () => {
        cy.visit('http://localhost:8080')
        cy.get('input[placeholder="Add a new Task"]')
          .type(faker.music.songName())

        cy.contains('button', 'Create').click()
      
    })
  })