
//prueba donde se muestra que el mail tiene los caracteres necesarios
describe("test2", () => {
    var validar;
    var email = 'Alex@s.com'
    var patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    it("prueba para campo email sea email", () => {
        if (email.search(patron) == 0) {
            validar = true;
        } else {
            validar = false;
        }
        expect(validar).toBe(true);
    });
});

//prueba de la cantidad de caracteres de la contraseña
describe("test3", () => {
    var password = '123456'
    it("prueba para campo contraseña sea minimo 6 caracteres", () => {
        expect(password.length >= 6).toBeTruthy();
    });
});