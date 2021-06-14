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
	"What do JBOD and JBOF stand for?",
	'Just a bunch of Doctors/Family',
	'Just a bunch of discs/flash',
	'Just a bunch of Daughters/Fast',
	'All of the above',	
	2
);

// Question 2
var q2 = new CQuiz(
	"What was the Capacity of World`s 1st HDD – IBM RAMAC 350?",
	'5mb',
	'1mb',
	'2mb',
	'3mb',
	1
);

// Question 3
var q3 = new CQuiz(
	"Please name the two-zoned Cooling system that is used in JBOD Western Digital Ultrastar Data60/Data102 JBODs?",
	'ArticFlow',
	'Turbulent Flow',
	'Steady Flow',
	'Compressible Flow',	
	1
);

// Question 4
var q4 = new CQuiz(
	"How many platters are there in the new 18TB HDD Western Digital HC550 HDD?",
	'5',
	'6',
	'7',
	'9',	
	4
);

// Question 5
var q5 = new CQuiz(
	"What is the warranty for Ultrastar Data60 HDD and Data102 JBOD?",
	'1 Year ',
	'5 years',
	'2 years',
	'3years',	
	2	
);

// Question 6
var q6 = new CQuiz(
	"Which of these is not a Western Digital enterprise product brand?",
	'Ultrasound',
	'Ultrastar',
	'OpenFlex',
	'None of the above',	
	1	
);
// Question 7
var q7 = new CQuiz(
	"Which year was Western Digital founded in?",
	'1960',
	'1945',
	'1950',
	'1970',	
	4	
);
// Question 8
var q8 = new CQuiz(
	"Where is the headquarters of the company located?",
	'San Jose, California',
	'Seattle, Washington',
	'Cupertino, California',
	'Omaha, Nebraska',	
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
	"In which year did IBM & M_system develop the first USB flash drive?",
	'1500',
	'1600',
	'2000',
	'1000',	
	3
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
