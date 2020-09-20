const URL_SITE = 'localhost:3000';
describe('Open the site with a search query in the url', () => {
  const QUERY = 'chiave';

  before(() => {
    const urlRegex = new RegExp(`\/search\/photos\?.*&query=${QUERY}&.*`);
    cy.server();
    cy.route({
      method: 'GET',
      url: urlRegex,
    }).as('search_request');
  });

  it('should visit the site and have the correct api request', () => {
    cy.visit(`${URL_SITE}/search=${QUERY}`);
    cy.wait('@search_request').then(xhr => {
      console.log('correct request');
    });
  });

  it(`should have the input search with value '${QUERY}'`, () => {
    cy.get('.MuiInputBase-input').invoke('val').should('eq', QUERY);
  });
});

describe('Full run: visit homepage -> search -> open detail -> close detail -> homepage', () => {
  const TYPED_SEARCH = 'bologna portici';

  beforeEach(() => {
    const query = TYPED_SEARCH.replace(' ', ',');
    const urlRegex = new RegExp(`\/search\/photos\?.*&query=${query}&.*`);
    cy.server();
    cy.route({
      method: 'GET',
      url: urlRegex,
    }).as('search_request');
  });

  it('should visit homepage', () => {
    cy.visit(`${URL_SITE}`);
  });

  it(`should search type in the search input the value '${TYPED_SEARCH}'`, () => {
    cy.get('.MuiInputBase-input').type(TYPED_SEARCH).invoke('val').should('eq', TYPED_SEARCH);
  });

  it(`search images related to '${TYPED_SEARCH}'`, () => {
    cy.get('.MuiButton-label').click();
    cy.wait('@search_request').then(xhr => {
      console.log('correct request');
    });
  });

  it(`should open and close popup of an image`, () => {
    cy.get('img:first').click();
    cy.get('.MuiIconButton-label > .MuiSvgIcon-root').click();
  });

  it(`should reset search and go to homepage (no search query)`, () => {
    cy.get('.MuiInputBase-input').clear().invoke('val').should('eq', '');
    cy.get('.MuiButton-label').click();
  });
});
