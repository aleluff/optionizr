var list = [];
var ctry = ["fr", "en", "es", "it"];
var cur = ["EUR", "USD", "GBP"];
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

for (var i = 0; i < 50; i++){

    var text = "";

    for (var y = 0; y < 5; y++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    list.push({
        bid: text,
        name: "Super Appart",
        picture: "http://cdn1-elle.ladmedia.fr/var/plain_site/storage/images/deco/reportages/city-guide/location-appartement-paris/appartement-renove-a-paris/83614169-1-fre-FR/Appartement-renove-a-Paris.jpg",
        price: 1200000.0,
        country: ctry[Math.floor(Math.random()*ctry.length)],
        currency: cur[Math.floor(Math.random()*ctry.length)],
        stock: Math.floor(Math.random() * 1000 + 1000),
        sale: 0
    });
}

console.log(JSON.stringify(list));