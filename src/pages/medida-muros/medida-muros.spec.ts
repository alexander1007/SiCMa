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
describe("test6", () => {
    var p_variable1 = 2.5;

    it("prueba para campo p_variable1, que este reciba decimales", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});

describe("test7", () => {
    var p_variable1 = 11.8;

    it("prueba para campo p_variable2, que este reciba decimales", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});

describe("test8", () => {
    var p_variable1 = 11.000;

    it("prueba para campo p_variable1, que permita ingresar decimales con ceros", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});


describe("test9", () => {
    var p_variable1 = 20.000;

    it("prueba para campo p_variable2, que permita ingresar decimales con ceros", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});

describe("test10", () => {
    var p_variable1 = 0;

    it("prueba para campo p_variable1, no puede ser cero", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});


describe("test11", () => {
    var p_variable1 = 0;

    it("prueba para campo p_variable2, no puede ser cero", () => {

        expect(isFinite(p_variable1)).toBe(true);
    });
});
describe("test12", () => {
    var p_variable1 = -4;

    it("prueba para campo p_variable1, no debe permitir numeros negativos", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});


describe("test13", () => {
    var p_variable1 = -18;

    it("prueba para campo p_variable2, no debe permitir numeros negativos", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});

describe("test14", () => {
    var p_variable1 = 12.;

    it("prueba para campo p_variable1, no debe aceptar . despues del numero", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});

describe("test15", () => {
    var p_variable1 = 180.;

    it("prueba para campo p_variable2, no debe aceptar . despues del numero", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});

describe("test16", () => {
    var p_variable1 = 1 / 2;

    it("prueba para campo p_variable1, no debe aceptar fraccionarios", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});


describe("test17", () => {
    var p_variable1 = 1 / 10;

    it("prueba para campo p_variable2, no debe aceptar fraccionarios", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});

describe("test18", () => {
    var p_variable1 = 12  22;-

    it("prueba para campo p_variable1, no debe aceptar - despues del numero", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});

describe("test19", () => {
    var p_variable1 = 18 - 33;

    it("prueba para campo p_variable2, no debe aceptar - despues del numero", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});

describe("test20", () => {
    var p_variable1 = 120 / 5;

    it("prueba para campo p_variable1, no debe aceptar / despues del numero", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});

describe("test21", () => {
    var p_variable1 = 18 / 2;

    it("prueba para campo p_variable2, no debe aceptar / despues del numero", () => {

        expect(isNaN(p_variable1)).toBe(false);
    });
});

