describe('GET /quote', () => {
  it('returns a quote with author and text', () => {
    cy.request('/quote').then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('quote').that.is.a('string');
      expect(response.body).to.have.property('author').that.is.a('string');
    });
  });
});
