


describe("test6", () => {
    var valorTotal = 1000;

    it("prueba para campo valorTotal, que este sea númerico", () => {

        expect(isNaN(valorTotal)).toBe(false);
    });
});
