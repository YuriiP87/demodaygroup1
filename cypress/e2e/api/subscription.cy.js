describe('POST /subscription', () => {
  it('rejects an invalid email payload', () => {
    cy.request({
      method: 'POST',
      url: '/subscription',
      body: { email: 'not-an-email' },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.be.oneOf([400, 409, 422]);
    });
  });

  it('rejects a missing email field', () => {
    cy.request({
      method: 'POST',
      url: '/subscription',
      body: {},
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.be.oneOf([400, 422]);
    });
  });
});
