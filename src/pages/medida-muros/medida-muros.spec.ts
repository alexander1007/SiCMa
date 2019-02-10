describe("test4", () => {
    var p_variable1 = 4;

    it("prueba para campo p_variable1, que este sea númerico", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});


describe("test5", () => {
    var p_variable1 = 18;

    it("prueba para campo p_variable2, que este sea númerico", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});
