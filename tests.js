const funktiot = require ('./moduuli')

let palautui = funktiot.summa(1, 2)
if (palautui == 3) {
    console.log("summa funktion testi onnistui")
} else {
    console.log("summa funktion testi epäonnistui")
}