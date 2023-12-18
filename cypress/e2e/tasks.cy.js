describe('Tasks', () => { 

    context ('Task Registry', () => {
      it('Should create a task', () => {
        const j = 1;
        for (let i = 1; i <= j; i++) {
          const randomNumber = Math.floor(Math.random() * 100) + 1;
          var task = `Task number ${randomNumber}`;
          cy.log(task);
        } 
        cy.createTask(task);
        
        cy.request('GET', Cypress.env('apiURL') + '/tasks')
        .then((response) => {
            expect(response.status).to.eq(200); 
            expect(task).to.exist; 
            expect(task).to.be.equal(task); 
            cy.log('API Response:', response.body);
          })
      });
      it('Should not let it create a duplicated task ', () => {
        //cy.request({
        //url: Cypress.env('apiURL') + '/helper/tasks',
        //method: 'DELETE',
        //body: { name: 'Task' }
      //}).then(response => {
          //expect(response.status).to.eq(204)
      //})
  
        cy.visit('/')
          cy.get('input[placeholder="Add a new Task"]')
            .type('Task 2')
          cy.contains('button', 'Create').click()
          cy.get('input[placeholder="Add a new Task"]')
          .type('Task 2')
          cy.contains('button', 'Create').click()
  
          cy.get('.swal2-html-container')
            .should('have.text', 'Task already exists!')
          cy.get('.swal2-confirm').click()
  
      });
      it('Should show error message when task field is empty', () => {
        cy.createTask();
        cy.isRequired('This is a required field');
      })
    })

    context ('Task Update', () => {
      it('Should mark a task as done', () => {
        const j = 1;
        for (let i = 1; i <= j; i++) {
          const randomNumber = Math.floor(Math.random() * 100) + 1;
          var task = `Task number ${randomNumber}`;
          cy.log(task);
        } 
        cy.createTask(task);
        
        cy.contains('p', task)
          .parent() // //p[contains(text(), "Treinar")]/.. as a XPATH command
          .find('button[class*=ItemToggle]') 
          .click() 

        // (//p[contains(text(), "Treinar")]/..//button)[1] -> to find the task and click on the check button [XPATH]

        cy.contains('p', task)
          .should('have.css', 'text-decoration-line', 'line-through') //verify done task
      });

      it('Should delete a task', () => {
        const j = 1;
        for (let i = 1; i <= j; i++) {
          const randomNumber = Math.floor(Math.random() * 100) + 1;
          var task = `Task number ${randomNumber}`;
          cy.log(task);
        } 
        cy.createTask(task);
        
        cy.contains('p', task)
          .parent() // //p[contains(text(), "TaskName")]/.. as a XPATH command
          .find('button[class*=ItemDelete]') 
          .click() 

        // (//p[contains(text(), "TaskName")]/..//button)[1] -> to find the task and click on the check button [XPATH]
      });

    })

    
  });