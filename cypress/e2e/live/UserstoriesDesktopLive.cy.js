describe("Desktop UserStories", () => {
  beforeEach(() => {
    // Viewport Desktop
    cy.viewport(1920, 1080);
    cy.visit("https://project-exam-2-andrew-hay.netlify.app/");
  });

  afterEach(() => {
    cy.wait(1000);
  });

  it("1 - A user may view a list of Venues", () => {
    cy.get("#nav-venues").click();
  });

  it("2 - A user may search for a specific Venue", () => {
    cy.get("#searchTerm").type("home");
    cy.get("#submit-search").click();
  });

  it("3 & 4 - A user may view a specific Venue page by id / A user may view a calendar with available dates for a Venue", () => {
    cy.get("#nav-venues").click();
    cy.get("#venue-items button").first().click();
  });

  it("5 & 8 - A user with a stud.noroff.no email may register as a customer / A user with a stud.noroff.no email may register as a Venue manager", () => {
    cy.get("#nav-sign-up").click();
    cy.get("#name").type("cypresstest_manager");
    cy.should("have.value", "cypresstest_manager");
    cy.get("#email").type("cypresstestmanager@noroff.no");
    cy.should("have.value", "cypresstestmanager@noroff.no");
    cy.get("#password").type("12345678");
    cy.should("have.value", "12345678");
    cy.get('#account-selector [type="radio"]').check("venueManager");
    cy.should("be.checked");
    cy.get("#submit-modal-form").click();
  });

  it("13 - A registered user may login", () => {
    cy.get("#nav-log-in").click();
    cy.get("#email").type("cypresstestmanager@noroff.no");
    cy.should("have.value", "cypresstestmanager@noroff.no");
    cy.get("#password").type("12345678");
    cy.should("have.value", "12345678");
    cy.get("#submit-modal-form").click();
  });

  it("6 - A registered customer may create a booking at a Venue", () => {
    cy.get("#nav-log-in").click();
    cy.get("#email").type("cypresstestmanager@noroff.no");
    cy.should("have.value", "cypresstestmanager@noroff.no");
    cy.get("#password").type("12345678");
    cy.should("have.value", "12345678");
    cy.get("#submit-modal-form").click();
    cy.get("#nav-venues").click();
    cy.get("#venue-items button").first().click();
    cy.get("#create-booking").click();
    cy.wait(1500);
    cy.get("#submit-booking").click();
  });

  it("7 - A registered customer may view their upcoming bookings", () => {
    cy.get("#nav-log-in").click();
    cy.get("#email").type("cypresstestmanager@noroff.no");
    cy.should("have.value", "cypresstestmanager@noroff.no");
    cy.get("#password").type("12345678");
    cy.should("have.value", "12345678");
    cy.get("#submit-modal-form").click();
    cy.get("#nav-account").click();
  });

  it("9 - A registered Venue manager may create a Venue", () => {
    cy.get("#nav-log-in").click();
    cy.get("#email").type("cypresstestmanager@noroff.no");
    cy.should("have.value", "cypresstestmanager@noroff.no");
    cy.get("#password").type("12345678");
    cy.should("have.value", "12345678");
    cy.get("#submit-modal-form").click();
    cy.get("#nav-account").click();
    cy.get("#create-venue").click();
    cy.get("#name").type("cypress_test");
    cy.get("#description").type("cypress_description");
    cy.get("#submit-venue").click();
  });

  it("10 - A registered Venue manager may update a Venue they manage", () => {
    cy.get("#nav-log-in").click();
    cy.get("#email").type("cypresstestmanager@noroff.no");
    cy.should("have.value", "cypresstestmanager@noroff.no");
    cy.get("#password").type("12345678");
    cy.should("have.value", "12345678");
    cy.get("#submit-modal-form").click();
    cy.get("#nav-account").click();
    cy.get("#users-venues button").contains("Edit Venue").first().click();
    cy.get("#name").type("cypress_test_updated");
    cy.get("#description").type("cypress_description_updated");
    cy.get("#submit-venue").click();
  });

  it("12 - A registered Venue manager may view bookings for a Venue they manage", () => {
    cy.get("#nav-log-in").click();
    cy.get("#email").type("cypresstestmanager@noroff.no");
    cy.should("have.value", "cypresstestmanager@noroff.no");
    cy.get("#password").type("12345678");
    cy.should("have.value", "12345678");
    cy.get("#submit-modal-form").click();
    cy.get("#nav-account").click();
    cy.get("#users-venues button").contains("Bookings at your Venue").first().click();
    cy.get("#venues-upcoming-bookings h2").should("have.text", "Upcoming and current bookings at your venue");
  });

  it("11 - A registered Venue manager may delete a Venue they manage", () => {
    cy.get("#nav-log-in").click();
    cy.get("#email").type("cypresstestmanager@noroff.no");
    cy.should("have.value", "cypresstestmanager@noroff.no");
    cy.get("#password").type("12345678");
    cy.should("have.value", "12345678");
    cy.get("#submit-modal-form").click();
    cy.get("#nav-account").click();
    cy.get("#users-venues button").contains("Delete").first().click();
  });

  it("14 - A registered user may update their avatar", () => {
    cy.get("#nav-log-in").click();
    cy.get("#email").type("cypresstestmanager@noroff.no");
    cy.should("have.value", "cypresstestmanager@noroff.no");
    cy.get("#password").type("12345678");
    cy.should("have.value", "12345678");
    cy.get("#submit-modal-form").click();
    cy.get("#nav-account").click();
    cy.get("#avatar").type("https://www.freesignprinter.com/images/printable-testing-in-progress-sign.png");
    cy.get("#submit-avatar").click();
  });

  it("15 - A registered user may logout", () => {
    cy.get("#nav-log-in").click();
    cy.get("#email").type("cypresstestmanager@noroff.no");
    cy.should("have.value", "cypresstestmanager@noroff.no");
    cy.get("#password").type("12345678");
    cy.should("have.value", "12345678");
    cy.get("#submit-modal-form").click();
    cy.get("#nav-log-out").click();
  });
});
