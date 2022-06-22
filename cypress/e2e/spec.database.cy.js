describe('Example to Demonstrate SQL Database Testing in Cypress', () => {

    it('should create a Table', function () {
        cy.task('queryDb', "CREATE TABLE Persons (PersonID int, FirstName varchar(255), Address varchar(255), City varchar(255))")
    })

    it('should input Entries into the table', function () {
        cy.task('queryDb', `INSERT INTO Persons (PersonID, FirstName, Address, City) VALUES
        (001, "John", "House No. 01", "Helsinki"),
        (002, "Pam", "House No. 02", "Espoo"),
        (003, "Dwight", "House No. 03", "Lapland"),
        (004, "Michael", "House No. 04", "Vantaa");`).then((result) => {
            expect(result.affectedRows).to.equal(4)
        })
    })

    it('should update an Entry into the table and verify', function () {
        cy.task('queryDb', `UPDATE Persons SET FirstName = "Kevin" WHERE City="Vantaa"`).then((result) => {
            expect(result.changedRows).to.equal(1)
        })
        cy.task('queryDb', `SELECT FirstName FROM Persons WHERE City="Vantaa"`).then((result) => {
            expect(result[0].FirstName).to.equal('Kevin')
        })
    })

    it('should verify that there is only one row where the city is Espoo', function () {
        cy.task('queryDb', `SELECT COUNT(*) as "rowCount" FROM Persons WHERE City="Espoo"`).then((result) => {

            expect(result[0].rowCount).to.equal(1)
        })
    })

    it('should delete a Table and Verify', function () {
        cy.task('queryDb', `DROP TABLE Persons`).then((result) => {
            cy.log(result)
        })
    })
})