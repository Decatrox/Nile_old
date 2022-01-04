const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 'test123';
const someOtherPlaintextPassword = 'not_bacon';

//gen pass
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);

//check pass
console.log(bcrypt.compareSync(myPlaintextPassword, '$2b$10$pYdMXRjMAotcNT8TdR3UI.T/6aqszQtOZTRW.NBMk59HTl9OVP93.'));
