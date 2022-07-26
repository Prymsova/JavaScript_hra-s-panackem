// toto budeš potřebovat později
/*
if (!( panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
	// panacek a mince se prekryvaji
}
*/

/*
úkoly pro 4. lekci:
1) Vydefinuj si všechny potřebné proměnné. Budeme chtít 100% pracovat se souřadnicemi panáčka a mince, s jejich šířkou a výškou. Potřebujeme i odkaz na jejich HTML elementy.
2) Vytvoř funkci, která umístí panáčka na střed obrazovky. Budeme potřebovat znát šířku a výšku okna (využij vlastnosti - window.innerWidth a window.innerHeight)
3) Podobnou funkci vytvoř i pro minci, tu každopádně chceme umístit náhodně po mapě
4) Reaguj na kliknutí šipek a rozpohybuj panáčka - nahoru, dolu, doleva, doprava. Budeš pracovat se souřadnicemi X,Y. 
5) Vytvoř "animaci", při stisku šipky nahoru se panáček otočí nahoru (změní se obrázek), podobně u dalších šipek

Nezapomeň vše ošetřit - panáček ti nemůže zajíždět za obrazovku apod.
*/

/*odchycení objektů z html*/
let panacek = document.querySelector("#panacek"),
	mince = document.querySelector("#mince"),
	skore = document.querySelector("#score"),
	zvukMince = document.querySelector("#zvukmince"),
	zvukFanfara = document.querySelector("#zvukfanfara"),
	moucha = document.querySelector("#moucha"),
	zivoty = document.querySelector("#zivoty"),
	auvajs = document.querySelector("#auvajs")

/*zjištění rozměrů*/
let vyskaPanacek = panacek.height,
	sirkaPanacek = panacek.width,
	vyskaMince = mince.height,
	sirkaMince = mince.width,
	vyskaOkno = window.innerHeight,
	sirkaOkno = window.innerWidth,
	vyskaMoucha = moucha.height,
	sirkaMoucha = moucha.width

/*úmyslně vytvořený buffer 10px pro okno prohlížeče, ať není zobrazování herních prvků natěsno k okrajům*/
let oknoHorniOkraj = 100
let oknoDolniOkraj = vyskaOkno - 5
let oknoLevyOkraj = 5
let oknoPravyOkraj = sirkaOkno - 5

/*definování výchozích souřadnic*/
let startPanacekX = (sirkaOkno/2)-(sirkaPanacek/2),
	startPanacekY = (vyskaOkno/2)-(vyskaPanacek/2),
	panacekX = startPanacekX,
	panacekY = startPanacekY,
	minceX = 0,
	minceY = 0,
	mouchaX = 0,
	mouchaY = 0

let hodnotaSkore = 0
let pocetZivotu = 5

/*definování potřebných funkcí*/

function stredStred() {
	//přidáno do funkce přiřazení hodnot do panacekX a Y kvůli tomu, aby správně fungoval první pohyb panáčka při funkci vitez()
	panacekX = startPanacekX;
	panacekY = startPanacekY;
	panacek.style.left = startPanacekX + "px";
	panacek.style.top = startPanacekY + "px";
	panacek.src="obrazky/panacek.png";
}

function randomMince() {
	minceX = Math.floor(Math.random()*oknoPravyOkraj - sirkaMince/2);
	minceY = Math.floor(Math.random()*oknoDolniOkraj - vyskaMince/2);
	if(minceY < 100) {
		minceY = 100 + vyskaMince;
	}

	mince.style.left = minceX +"px";
	mince.style.top = minceY +"px";
}

function randomMoucha() {
	//smazáno oknoLevyOkraj + sirkaMoucha
	mouchaX = oknoLevyOkraj;
	//smazáno za vyskaMoucha/2
	mouchaY = Math.floor(Math.random()*oknoDolniOkraj - vyskaMoucha);
	if(mouchaY < 100) {
		mouchaY = 100 + vyskaMoucha;
	}

	moucha.style.left = mouchaX +"px";
	moucha.style.top = mouchaY +"px";
}

/* definování funkcí volaných v rámci funkce stisknutaSipka */
function sebralMinci() {
	if (!( panacekX + sirkaPanacek < minceX || minceX + sirkaMince < panacekX || panacekY + vyskaPanacek < minceY || minceY + vyskaMince < panacekY)) {
		hodnotaSkore = hodnotaSkore + 1;
		skore.textContent = hodnotaSkore;
		zvukMince.play();
		randomMince();
	}
}

/* definování funkcí volaných v rámci funkce stisknutaSipka */
function vitez() {
	if (hodnotaSkore === 5) {
		alert("Vyhrál jsi!");
		zvukFanfara.play();
		
		//znovuobnovení výchozího stavu pro zahájení nové hry po vítězství
		hodnotaSkore = 0;
		skore.textContent = hodnotaSkore;
		pocetZivotu = 5;
		zivoty.src = "obrazky/srdce-5.png";

		randomMince()
		stredStred();
		randomMoucha();
	}
}

function stisknutaSipka (event) {
	let stisknutaKlavesa = event.key;

	if (stisknutaKlavesa === "ArrowUp") {
		console.log("Jdu nahoru");
		panacek.src="obrazky/panacek-nahoru.png";

		/*chci, aby tam panáček měl místo pro případný jeden krok o 20px, proto chci vědět, že jeho pozice je alespoň 10px větší v ose Y od horního okraje*/
		if (panacekY > oknoHorniOkraj + 10) {
			let newPanacekY = panacekY - 20;
			panacek.style.top = newPanacekY +"px";
			panacekY = newPanacekY;
		}
		else {
			console.log("Dál nemůžeš, mimo okno nic není.")
		}
		
	} else if (stisknutaKlavesa === "ArrowDown") {
		console.log("Jdu dolů");
		panacek.src="obrazky/panacek.png";

		/*chci, aby tam panáček měl místo pro případný jeden krok o 20px, přičemž musím zároveň zajistit, aby ta jeho vzdálenost od levého horního okraje obrázku panáčka byla od dolního okraje větší o tu jeho výšku panáčka, aby byl celý vidět*/
		if (panacekY < (oknoDolniOkraj - vyskaPanacek - 10)) {
			let newPanacekY = panacekY + 20;
			panacek.style.top = newPanacekY +"px";
			panacekY = newPanacekY;
		}
		else {
			console.log("Dál nemůžeš, mimo okno nic není.")
		}

	} else if (stisknutaKlavesa === "ArrowRight") {
		console.log("Jdu doprava");
		panacek.src="obrazky/panacek-vpravo.png";

		if (panacekX < (oknoPravyOkraj - sirkaPanacek - 10)) {
			let newPanacekX = panacekX + 20;
			panacek.style.left = newPanacekX +"px";
			panacekX = newPanacekX;
		}
		else {
			console.log("Dál nemůžeš, mimo okno nic není.")
		}

	} else if (stisknutaKlavesa === "ArrowLeft") {
		console.log("Jdu doleva");
		panacek.src="obrazky/panacek-vlevo.png";

		if (panacekX > (oknoLevyOkraj + 10)) {
			let newPanacekX = panacekX - 20;
			panacek.style.left = newPanacekX +"px";
			panacekX = newPanacekX;
		}
		else {
			console.log("Dál nemůžeš, mimo okno nic není.")
		}
	} else {
		console.log("Zmáčkni šipku hňupe")
	}

	sebralMinci()
	vitez()
}

function stretSMouchou() {
	if (!( panacekX + sirkaPanacek < mouchaX || mouchaX + sirkaMoucha < panacekX || panacekY + vyskaPanacek < mouchaY || mouchaY + vyskaMoucha < panacekY)) {
		auvajs.play();
		pocetZivotu = pocetZivotu - 1;
		zivoty.src = "obrazky/srdce-" + pocetZivotu + ".png";
		randomMoucha();
	}
}

function gameOver() {
	if(pocetZivotu === 0) {
		alert("GAME OVER! Zkus to znovu!");

		pocetZivotu = 5;
		zivoty.src = "obrazky/srdce-5.png";
		hodnotaSkore = 0;
		skore.textContent = hodnotaSkore;
		
		stredStred();
		randomMince();
		randomMoucha();
	}
}

//zde taky přidán odečet o 10px pro zajištění místa pro učinění pohybu aniž by zmizela z okna
function pohybMoucha() {
	if (mouchaX < oknoPravyOkraj - sirkaMoucha - 10) {	
		mouchaX = mouchaX + 10;
		moucha.style.left = mouchaX +"px";

		stretSMouchou();
		gameOver();

	} else {
		randomMoucha();
	}
}

/*volání potřebných funkcí (při spuštění nebo přes eventListenery*/
document.addEventListener("keydown", stisknutaSipka);

stredStred();
randomMince();
randomMoucha()

setInterval(function() {
	pohybMoucha();
}, 20)
