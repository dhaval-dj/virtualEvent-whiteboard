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
	"What is the name of our personal cloud family of solutions?",
	'My Cloud Home',
	'My Ground Home',
	'My Earth Home',
	'None of the above',	
	1
);

// Question 2
var q2 = new CQuiz(
	"What does My Cloud Home enable you to do?",
	'Centralise',
	'Organize',
	'Share your content',
	'All of the above',
	4
);

// Question 3
var q3 = new CQuiz(
	"Which SanDisk products work with Chromebook?",
	'SanDisk Ultra microSD cards',
	'My Passbook',
	'My Portable',
	'None of the above',	
	1
);

// Question 4
var q4 = new CQuiz(
	"Which WD products work with Chromebook?",
	'My Passport',
	'My Passbook',
	'My Portable ',
	'None of the above',	
	1
);

// Question 5
var q5 = new CQuiz(
	"In which year did Western Digital deliver the first triple digit 112-layer 3D NAND?",
	'2010',
	'2020',
	'2012',
	'2009',	
	2	
);

// Question 6
var q6 = new CQuiz(
	"In which year did HGST deliver the first helium HDD?",
	'2013',
	'2011',
	'2012',
	'2010',	
	1	
);
// Question 7
var q7 = new CQuiz(
	"Where are Western Digital's wafers manufactured?",
	'Australia',
	'Japan',
	'India',
	'United Kingdom',	
	2
);
// Question 8
var q8 = new CQuiz(
	"In which year did IBM & M_system develop the first USB flash drive?",
	'1500',
	'1600',
	'2000',
	'1000',	
	3	
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
	"In which year did IBM invent the first hard drive?",
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
