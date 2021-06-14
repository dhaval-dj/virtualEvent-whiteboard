// Quiz Creator;
function CQuiz(que, o1, o2,o3,o4, ans, d) {
	this.question = que;
	this.opt1 = o1;
	this.opt2 = o2;
	this.opt3 = o3;
	this.opt4 = o4;
	this.answer = ans;
	this.asked = d;
	
}

// Question 1
var q1 = new CQuiz(
	"What does the abreviation SSD stand for?",
	'Sun State Drive',
	'Solid State drive',
	'Soft State Drive',
	'Silk State Drive',	
	2
);

// Question 2
var q2 = new CQuiz(
	"What colour in the WD Rainbow represents smart video?",
	'Blue',
	'Purple',
	'Red',
	'Black',
	2
);

// Question 3
var q3 = new CQuiz(
	"What colour in the WD Rainbow represents Gaming?",
	'Black',
	'Blue',
	'Red',
	'White',	
	1
);

// Question 4
var q4 = new CQuiz(
	"What is the highest capacity available in WD Black™ SN750 NVMe™ SSD?",
	'2TB',
	'1TB',
	'64 GB',
	'212 GB',	
	1
);

// Question 5
var q5 = new CQuiz(
	"WD BLACK™ SN750 NVMe™ drive cuts down on your wait time to get back into action and gets you ahead of the game.",
	'True',
	'False',
	'',
	'',	
	1	
);

// Question 6
var q6 = new CQuiz(
	"What is the highest capacity available in WD Blue™ SN550 NVMe™ SSD?",
	'400 GB',
	'200 GB',
	'1 TB',
	'300 GB',	
	3	
);
// Question 7
var q7 = new CQuiz(
	"What is the sequential read-speed of WD Blue™ SN550 NVMe™ SSD 1TB model ?",
	'2400 MB/s',
	'2100 MB/s',
	' 2200 MB/s',
	'2300 MB/s',	
	1	
);
// Question 8
var q8 = new CQuiz(
	"WD Blue™ SN550 NVMe™ SSD enables a low power draw while maintaining significantly higher performance over our SATA SSD.",
	'True',
	'False',
	'',
	'',	
	1	
);
// Question 9
var q9 = new CQuiz(
	"Which gas causes the least friction inside an HDD?",
	'Neon',
	'Helium',
	'Chlorine',
	'Argon',	
	2	
);
// Question 10
var q10 = new CQuiz(
	"In what year did IBM invent the first hard drive?",
	'1956',
	'1946',
	'1948',
	'1950',	
	1
);


// Question 10
// var q10 = new CQuiz(
// 	'Are you happy with your last decision ?',
// 	'Yes',
// 	'No',
	
// 	1,
// 	0
// );

// total question...
var totQ = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
