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
	"What is the name of our new Gen4 product?",
	'WD Blue SN550 NVMe SSD',
	'WD Green Sata SSD',
	'WD Black NVMe SSD',
	'WD Blue 3D NAND SATA',	
	3
);

// Question 2
var q2 = new CQuiz(
	"Which technology allows the connection of NVMe storage over a network at local speeds?",
	'NVMeoF',
	'NVMeoD',
	'NVMeoH',
	'NVMeoC',
	1
);

// Question 3
var q3 = new CQuiz(
	"Which SSD interface provides the highest bandwidth?",
	'NVMe',
	'PCIe',
	'SAS',
	'None of the above',	
	1
);

// Question 4
var q4 = new CQuiz(
	"What does the term RDMA stand for?",	
	'Removable Direct Memory Access',
	'Remote Direct Memory Access',
	'Restore Direct Memory Access',	
	'None of the above',
	2
);

// Question 5
var q5 = new CQuiz(
	"What does the term NVMe stand for?",
	'Non-Volatile Retention Express',
	'Non-Volatile Memory Express',
	'Non-Volatile Recall Express',
	'Non-Volatile Removable Express',	
	2	
);

// Question 6
var q6 = new CQuiz(
	"Where is the headquarters of the company located?",
	'San Jose, California',
	'Seattle, Washington',
	'Cupertino, California',
	'Omaha, Nebraska',	
	1	
);
// Question 7
var q7 = new CQuiz(
	"In which year did IBM invent the first hard drive?",
	'1956',
	'1946',
	'1948',
	'1950',	
	1	
);
// Question 8
var q8 = new CQuiz(
	"Where are Western Digital's wafers manufactured?",
	'Australia',
	'Japan',
	'India',
	'United Kingdom',	
	2	
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
	"In what year did IBM & M_system develop the first USB flash drive?",
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
