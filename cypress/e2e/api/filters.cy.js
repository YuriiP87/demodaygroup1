describe('GET /filters', () => {
  it('returns the default Muscles filter list', () => {
    cy.request({
      url: '/filters',
      qs: { filter: 'Muscles', page: 1, limit: 12 },
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('results').that.is.an('array');
      expect(response.body).to.have.property('totalPages');
      if (response.body.results.length) {
        const item = response.body.results[0];
        expect(item).to.have.property('name');
        expect(item).to.have.property('filter');
        expect(item).to.have.property('imgURL');
      }
    });
  });

  it('supports the Body parts and Equipment filters', () => {
    ['Body parts', 'Equipment'].forEach(filter => {
      cy.request({ url: '/filters', qs: { filter, page: 1, limit: 6 } }).then(
        response => {
          expect(response.status).to.eq(200);
          expect(response.body.results).to.be.an('array');
        }
      );
    });
  });

  it('respects pagination limits', () => {
    cy.request({
      url: '/filters',
      qs: { filter: 'Muscles', page: 1, limit: 3 },
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.results.length).to.be.at.most(3);
    });
  });
});
