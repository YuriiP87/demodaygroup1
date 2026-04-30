describe('GET /exercises', () => {
  it('returns a paginated exercises list', () => {
    cy.request({ url: '/exercises', qs: { page: 1, limit: 10 } }).then(
      response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('results').that.is.an('array');
        expect(response.body).to.have.property('page');
        expect(response.body).to.have.property('totalPages');
      }
    );
  });

  it('returns a single exercise by id', () => {
    cy.request({ url: '/exercises', qs: { page: 1, limit: 1 } }).then(list => {
      expect(list.status).to.eq(200);
      const first = list.body.results?.[0];
      if (!first) return;

      cy.request(`/exercises/${first._id}`).then(detail => {
        expect(detail.status).to.eq(200);
        expect(detail.body).to.have.property('_id', first._id);
        expect(detail.body).to.have.property('name');
        expect(detail.body).to.have.property('bodyPart');
        expect(detail.body).to.have.property('target');
      });
    });
  });

  it('returns 404 for an unknown exercise id', () => {
    cy.request({
      url: '/exercises/000000000000000000000000',
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.be.oneOf([400, 404]);
    });
  });
});
