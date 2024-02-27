function AdatTabla(vizsgaltTomb) {
    let table = document.querySelector("#f0");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    for (let i = vizsgaltTomb.length - 1; i >= 0; i--) {
        let sor = table.insertRow(1);
        let cella0 = sor.insertCell(0);
        let cella1 = sor.insertCell(1);
        let cella2 = sor.insertCell(2);
        let cella3 = sor.insertCell(3);

        cella0.innerHTML = vizsgaltTomb[i].korzet;
        cella1.innerHTML = vizsgaltTomb[i].szavazat;
        cella2.innerHTML = vizsgaltTomb[i].nev;
        cella3.innerHTML = vizsgaltTomb[i].part;
    }
}
AdatTabla(szavazatok);



function KepviselokSzama(vizsgaltTomb) {
    return vizsgaltTomb.length;
}

function KepviselokSzamaKiirato() {
    document.querySelector("#f1").innerHTML = (`A helyhatósági választáson ${KepviselokSzama(szavazatok)} képviselőjelölt indult.`);
}

let f1EventGomb = document.querySelector("#f1gomb");
f1EventGomb.addEventListener("click", KepviselokSzamaKiirato);



function PartLista(vizsgaltTomb) {
    let partokListaja = [];
    for (let i = 0; i < vizsgaltTomb.length; i++) {
        let szerepelE = false;
        for (let j = 0; j < partokListaja.length; j++) {
            if (vizsgaltTomb[i].part == partokListaja[j]) {
                szerepelE = true;
            }
        }
        if (szerepelE == false) {
            partokListaja.push(vizsgaltTomb[i].part);
        }
    }
    return partokListaja;
}

function KepviseloSzamlalo(vizsgaltTomb) {
    let partLista = PartLista(szavazatok);
    let kepviselokSzamaLista = [];

    for (let i = 0; i < partLista.length; i++) {
        kepviselokSzamaLista.push(0);
    }

    for (let i = 0; i < vizsgaltTomb.length; i++) {
        for (let j = 0; j < partLista.length; j++) {
            if (vizsgaltTomb[i].part == partLista[j]) {
                kepviselokSzamaLista[j]++;
            }
        }
    }
    return kepviselokSzamaLista;
}

function PartKepviselokKiirato() {
    let partok = PartLista(szavazatok);
    let jeloltekSzama = KepviseloSzamlalo(szavazatok);
    let valaszthatoPartok = document.querySelector("#f2menu");

    for (let i = 0; i < partok.length; i++) {
        if (valaszthatoPartok.value == partok[i]) {
            document.querySelector("#f2").innerHTML = jeloltekSzama[i];
        }
    }
}
let f2EventGomb = document.querySelector("#f2gomb");
f2EventGomb.addEventListener("click", PartKepviselokKiirato);



function AdottKepviseloNeve(vizsgaltTomb) {
    let kepviseloNeve = document.querySelector("#megadottNev").value.replace(/\s/g, '');

    for (let i = 0; i < vizsgaltTomb.length; i++) {
        if (kepviseloNeve == vizsgaltTomb[i].nev.replace(/\s/g, '')) {
            return kepviseloNeve;
        }
    }
    return false;
}

function AdottKepviseloIndexe(vizsgaltTomb) {
    let adottKepviselo = AdottKepviseloNeve(szavazatok);
    let adottKepviseloIndexe = 0;
    for (let i = 0; i < vizsgaltTomb.length; i++) {
        if (adottKepviselo == vizsgaltTomb[i].nev.replace(/\s/g, '')) {
            adottKepviseloIndexe = i;
        }
    }
    return adottKepviseloIndexe;
}

function KepviseloInfoKiirato() {
    let kepviselo = AdottKepviseloNeve(szavazatok);
    let kepviseloIndexe = AdottKepviseloIndexe(szavazatok);
    if (kepviselo != false) {
        document.querySelector("#f3").innerHTML = szavazatok[kepviseloIndexe].nev + ", " + szavazatok[kepviseloIndexe].szavazat + "szavazat.";
    }
    else {
        document.querySelector("#f3").innerHTML = "Ilyen nevű képviselőjelölt nem szerepel a nyilvántartásban!"
    }
}

let f3EventGomb = document.querySelector("#f3gomb");
f3EventGomb.addEventListener("click", KepviseloInfoKiirato);




function SzavazatokSzama(vizsgaltTomb) {
    let szavazatokSzama = 0;

    for (let i = 0; i < vizsgaltTomb.length; i++) {
        szavazatokSzama += vizsgaltTomb[i].szavazat;
    }
    return szavazatokSzama;
}

function SzavazatokAranya(szavazatSzam) {
    let szavazatokSzama = SzavazatokSzama(szavazatok);
    let jogosultakSzama = 12345;
    let szavazatokAranya = szavazatokSzama / jogosultakSzama;

    return szavazatokAranya;
}

function SzavazatokAranyaKiirato() {
    let szavazatSzam = SzavazatokSzama(szavazatok);
    let arany = SzavazatokAranya(SzavazatokSzama(szavazatok));

    document.querySelector("#f4").innerHTML = `A választáson ${szavazatSzam} állampolgár, a jogosultak ${(arany * 100).toFixed(2)}%-a vett részt.`;
}

let f4EventGomb = document.querySelector("#f4gomb");
f4EventGomb.addEventListener("click", SzavazatokAranyaKiirato);



function SzavazatokMennyisege(vizsgaltTomb) {
    let partokListaja = [];
    for (let i = 0; i < vizsgaltTomb.length; i++) {
        let szerepelE = false;
        for (let j = 0; j < partokListaja.length; j++) {
            if (vizsgaltTomb[i].part == partokListaja[j]) {
                szerepelE = true;
            }
        }
        if (szerepelE == false) {
            partokListaja.push(vizsgaltTomb[i].part);
        }
    }
    return partokListaja;
}

function SzavazatSzamlalo(vizsgaltTomb) {
    let partLista = SzavazatokMennyisege(szavazatok);
    let szavazatLista = [];

    for (let i = 0; i < partLista.length; i++) {
        szavazatLista.push(0);
    }

    for (let i = 0; i < vizsgaltTomb.length; i++) {
        for (let j = 0; j < partLista.length; j++) {
            if (vizsgaltTomb[i].part == partLista[j]) {
                szavazatLista[j] += vizsgaltTomb[i].szavazat;
            }
        }
    }
    return szavazatLista;
}

function SzavazatokMennyisegeKiirato() {
    let partok = SzavazatokMennyisege(szavazatok);
    let szavazatSzamok = SzavazatSzamlalo(szavazatok);
    let table = document.querySelector("#f5");

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    for (let i = 0; i < partok.length; i++) {
        let sor = table.insertRow(1);
        let cella1 = sor.insertCell(0);
        let cella2 = sor.insertCell(1);
        if (partok[i] == "-") {
            cella1.innerHTML = "Függetlenek";
        }
        else {
            cella1.innerHTML = partok[i];
        }
        cella2.innerHTML = szavazatSzamok[i];
    }

}

let f5EventGomb = document.querySelector("#f5gomb");
f5EventGomb.addEventListener("click", SzavazatokMennyisegeKiirato);



function LegtobbSzavazat(vizsgaltTomb) {
    let legNagyobbSzavazat = 0;

    for (let i = 0; i < vizsgaltTomb.length; i++) {
        if (vizsgaltTomb[i].szavazat > legNagyobbSzavazat) {
            legNagyobbSzavazat = vizsgaltTomb[i].szavazat;
        }
    }
    return legNagyobbSzavazat;
}

function LegtobbSzavazatKereso(vizsgaltTomb) {
    let legNagyobbErtek = LegtobbSzavazat(szavazatok);
    let legTobbSzavazatotKaptak = [];

    for (let i = 0; i < vizsgaltTomb.length; i++) {
        if (vizsgaltTomb[i].szavazat == legNagyobbErtek) {
            legTobbSzavazatotKaptak.push(vizsgaltTomb[i].nev);
        }
    }
    return legTobbSzavazatotKaptak;
}

function LegtobbSzavazatotKapottPartja(vizsgaltTomb) {
    let legtobbetKaptak = LegtobbSzavazatKereso(szavazatok);
    let legtobbetKaptakPartjai = [];

    for (let i = 0; i < vizsgaltTomb.length; i++) {
        for (let j = 0; j < legtobbetKaptak.length; j++) {
            if (vizsgaltTomb[i].nev == legtobbetKaptak[j]) {
                legtobbetKaptakPartjai.push(vizsgaltTomb[i].part);
            }
        }
    }
    return legtobbetKaptakPartjai;
}

function LegtobbSzavazatKiirato() {
    let legNagyobbSzam = LegtobbSzavazat(szavazatok);
    let legtobbSzavazatotKapott = LegtobbSzavazatKereso(szavazatok);
    let table = document.querySelector("#f6");
    let legtobbSzavazatotKapottPartja = LegtobbSzavazatotKapottPartja(szavazatok);

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    for (let i = 0; i < legtobbSzavazatotKapott.length; i++) {
        let sor = table.insertRow(1);
        let cella1 = sor.insertCell(0);
        let cella2 = sor.insertCell(1);
        let cella3 = sor.insertCell(2);
        if (legtobbSzavazatotKapottPartja == "-") {
            cella1.innerHTML = "Függetlenek";
        }
        else {
            cella1.innerHTML = legtobbSzavazatotKapott[i];
        }
        cella2.innerHTML = legtobbSzavazatotKapottPartja[i];
        cella3.innerHTML = legNagyobbSzam;
    }
}

let f6EventGomb = document.querySelector("#f6gomb");
f6EventGomb.addEventListener("click", LegtobbSzavazatKiirato);



function Korzetek(vizsgaltTomb) {
    let korzetek = [];

    for (let i = 0; i < vizsgaltTomb.length; i++) {
        let szerepelE = false;
        for (let j = 0; j < korzetek.length; j++) {
            if (vizsgaltTomb[i].korzet == korzetek[j]) {
                szerepelE = true;
            }
        }
        if (szerepelE == false) {
            korzetek.push(vizsgaltTomb[i].korzet);
        }
    }
    let korzetekSorrendben = korzetek.sort((a, b) => (a - b));
    return korzetekSorrendben;
}

function NyertesekKepviselok(vizsgaltTomb) {
    let valasztoKorzetek = Korzetek(szavazatok);
    let kepviselok = [];

    for (let i = 0; i < valasztoKorzetek.length; i++) {
        let adottKorzetLegnagyobbSzavazata = 0;
        for (let j = 0; j < vizsgaltTomb.length; j++) {
            if (vizsgaltTomb[j].korzet == valasztoKorzetek[i] && vizsgaltTomb[j].szavazat > adottKorzetLegnagyobbSzavazata) {
                adottKorzetLegnagyobbSzavazata = vizsgaltTomb[j].szavazat;

            }
        }
        for (let j = 0; j < vizsgaltTomb.length; j++) {
            if (adottKorzetLegnagyobbSzavazata == vizsgaltTomb[j].szavazat && vizsgaltTomb[j].korzet == valasztoKorzetek[i]) {
                kepviselok.push(vizsgaltTomb[j].nev);
            }
        }

    }
    return kepviselok;
}

function NyertesekSzavazatainakSzama(vizsgaltTomb) {
    let nyertesJeloltek = NyertesekKepviselok(szavazatok);
    let nyertesekSzavazatai = [];
    for (let i = 0; i < nyertesJeloltek.length; i++) {
        for (let j = 0; j < vizsgaltTomb.length; j++) {
            if (vizsgaltTomb[j].nev == nyertesJeloltek[i]) {
                nyertesekSzavazatai.push(vizsgaltTomb[j].szavazat);
            }
        }
    }
    return nyertesekSzavazatai;
}

function NyertesekPartjai(vizsgaltTomb) {
    let nyeroJeloltek = NyertesekKepviselok(szavazatok);
    let nyertesPartok = [];
    for (let i = 0; i < nyeroJeloltek.length; i++) {
        for (let j = 0; j < vizsgaltTomb.length; j++) {
            if (vizsgaltTomb[j].nev == nyeroJeloltek[i]) {
                nyertesPartok.push(vizsgaltTomb[j].part);
            }
        }
    }
    return nyertesPartok;
}

function NyertesekKiirato() {
    let valasztoKeruletek = Korzetek(szavazatok);
    let kepviseloJeloltek = NyertesekKepviselok(szavazatok);
    let kepviseloJeloltekSzavazatai = NyertesekSzavazatainakSzama(szavazatok);
    let kepviseloJelotekPartjai = NyertesekPartjai(szavazatok);

    let tabla = document.querySelector("#f7table");
    let table = document.querySelector("#f7");

    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }

    for (let i = kepviseloJeloltek.length - 1; i >= 0; i--) {
        let sor = table.insertRow(0);
        let cella0 = sor.insertCell(0);
        let cella1 = sor.insertCell(1);
        let cella2 = sor.insertCell(2);
        let cella3 = sor.insertCell(3);
        cella0.innerHTML = valasztoKeruletek[i];
        cella1.innerHTML = kepviseloJeloltek[i];
        if (kepviseloJelotekPartjai[i] == "-") {
            cella2.innerHTML = "Függetlenek";
        }
        else {
            cella2.innerHTML = kepviseloJelotekPartjai[i];
        }
        cella3.innerHTML = kepviseloJeloltekSzavazatai[i];
    }
}

let f7EventGomb = document.querySelector("#f7gomb");
f7EventGomb.addEventListener("click", NyertesekKiirato);



function BlokkokMegjelenitese(blokkAzonosito) {
    for (let i = 0; i <= 7; i++) {
        if (i != blokkAzonosito) {
            document.querySelector(`#Blokk${i}`).style.display = "none";
        }
        else {
            document.querySelector(`#Blokk${i}`).style.display = "block";
        }
    }
}

function TablaMegjelenites() {
    BlokkokMegjelenitese(0);
}
let m0Megjelenito = document.querySelector("#m0");
m0Megjelenito.addEventListener("click", TablaMegjelenites);


function ElsoFeladatMegjelenites() {
    BlokkokMegjelenitese(1);
}
let m1Megjelenito = document.querySelector("#m1");
m1Megjelenito.addEventListener("click", ElsoFeladatMegjelenites);


function MasodikFeladatMegjelenites() {
    BlokkokMegjelenitese(2);
}
let m2Megjelenito = document.querySelector("#m2");
m2Megjelenito.addEventListener("click", MasodikFeladatMegjelenites);


function HarmadikFeladatMegjelenites() {
    BlokkokMegjelenitese(3);
}
let m3Megjelenito = document.querySelector("#m3");
m3Megjelenito.addEventListener("click", HarmadikFeladatMegjelenites);


function NegyedikFeladatMegjelenites() {
    BlokkokMegjelenitese(4);
}
let m4Megjelenito = document.querySelector("#m4");
m4Megjelenito.addEventListener("click", NegyedikFeladatMegjelenites);


function OtodikFeladatMegjelenites() {
    BlokkokMegjelenitese(5);
}
let m5Megjelenito = document.querySelector("#m5");
m5Megjelenito.addEventListener("click", OtodikFeladatMegjelenites);


function HatodikFeladatMegjelenites() {
    BlokkokMegjelenitese(6);
}
let m6Megjelenito = document.querySelector("#m6");
m6Megjelenito.addEventListener("click", HatodikFeladatMegjelenites);


function HetedikFeladatMegjelenites() {
    BlokkokMegjelenitese(7);
}
let m7Megjelenito = document.querySelector("#m7");
m7Megjelenito.addEventListener("click", HetedikFeladatMegjelenites);