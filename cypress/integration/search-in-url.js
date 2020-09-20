describe('Open the site with a search query in the url', () => {
  const QUERY = 'chiave';

  it('should visit the site and have the correct api request', () => {
    const urlRegex = new RegExp(`\/search\/photos\?.*&query=${QUERY}&.*`);
    cy.server();
    cy.route({
      method: 'GET',
      url: urlRegex,
    }).as('search_request');

    cy.visit(`localhost:3000/search=${QUERY}`);
    cy.wait('@search_request').then(xhr => {
      console.log('correct request');
    });
  });

  it(`should have the input search with value '${QUERY}'`, () => {
    cy.get('.MuiInputBase-input').invoke('val').should('eq', QUERY);
  });
});
