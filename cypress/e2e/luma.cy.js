/// <reference types= "cypress" />

Cypress.Commands.add("SelectItem",()=>{

  let Randomitem = Math.floor(Math.random() * 4);
  let RandomSize = Math.floor(Math.random() * 2);
  let RandomColor = Math.floor(Math.random() * 1);

  cy.get(".product-items").find(".product-item").eq(Randomitem).click();

  cy.get(".stock > span")
    .invoke("text")
    .then((thetext) => {
      if (thetext == "In stock") {
        cy.get(".swatch-attribute-options")
          .find(".swatch-option")
          .eq(RandomSize)
          .click();
        cy.get(".swatch-attribute.color >.swatch-attribute-options")
          .find(".swatch-option")
          .eq(RandomColor)
          .click();
        cy.get("#product-addtocart-button").click();
        cy.get(".message-success > div")
          .invoke("text")
          .should("include", "You added");
      } else {
        alert("Not found this item Now !!!!!! ");
      }
    });

})

describe("Luma", () => {
  it("Women", () => {
    cy.visit("https://magento.softwaretestingboard.com/");
    cy.get(".nav-2 > .level-top").click();
    cy.SelectItem()
    
  });

  it("Men", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("https://magento.softwaretestingboard.com/");
    cy.get("#ui-id-5").click();
    cy.SelectItem();
  });

  it("Gear", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("https://magento.softwaretestingboard.com/");
    cy.get("#ui-id-6").click();

    let Randomitem = Math.floor(Math.random() * 4);

    cy.get(".product-items").find(".product-item").eq(Randomitem).click();

    cy.get(".stock > span")
      .invoke("text")
      .then((thetext) => {
        if (thetext == "In stock") {
          cy.get("#product-addtocart-button").click();
          cy.get(".message-success > div")
            .invoke("text")
            .should("include", "You added");
        } else {
          alert("Not found this item Now !!!!!! ");
        }
      });
  });
});

describe("Log In", () => {
  it("log in for correct userName and password", () => {
    cy.visit(
      "https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS9wdXNoLWl0LW1lc3Nlbmdlci1iYWcuaHRtbA%2C%2C/"
    );
    cy.get('#email').type("randomemail@gmail.com")
    cy.get("#pass").type("WEARETHEHEROS1234!@#$")
    cy.get("#send2").click()
  });

  it('log in for Incorrect userName or password', () => {
    cy.visit(
      "https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS9wdXNoLWl0LW1lc3Nlbmdlci1iYWcuaHRtbA%2C%2C/"
    );
    cy.get('#email').type("randomemail@gmail.com")
    cy.get("#pass").type("THEHEROS1234!@#$")
    cy.get("#send2").click()
    cy.get('.message-error > div').invoke('text').should('contain','incorrect')
  });
});
