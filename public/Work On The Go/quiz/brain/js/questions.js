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
	"What does the SanDisk Wireless Charger enable you to do?",
	'Remove the data',
	'Reserve the data',
	'Backup your phone and recharge it',
	'Refresh your data',	
	3
);

// Question 2
var q2 = new CQuiz(
	"What is the highest capacity provided by SanDisk® Ixpand® Wireless Charger Sync?",
	'64GB',
	'256GB',
	'126GB',
	'40GB',
	2
);

// Question 3
var q3 = new CQuiz(
	"What features does SanDisk® Ixpand® Wireless Charger Sync provide?",
	'Fast Charging',
	'Back-up in full resolution',
	'Free up space on your phone',
	'All of the above',	
	4
);

// Question 4
var q4 = new CQuiz(
	"In which year did IBM invent the first hard drive?",
	'1948',
	'1946',
	'1956',
	'1950',	
	3
);

// Question 5
var q5 = new CQuiz(
	"What is the highest capacity of SanDisk Ultra® Dual Drive Luxe USB Type-C™?",
	'64 GB',
	'1 TB',
	'128 GB',
	'512 GB',	
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
	"What is the warranty period provided by WD My Passport?",
	'5-year limited warranty',
	'1-year limited warranty',
	'2-year limited warranty',
	'3-year limited warranty',	
	1	
);
// Question 8
var q8 = new CQuiz(
	"What is the warranty period provided by SanDisk Ultra® Dual Drive Luxe USB Type-C™?",	
	'1-year limited warranty',
	'2-year limited warranty',
	'5-year limited warranty',
	'3-year limited warranty',	
	3	
);
// Question 9
var q9 = new CQuiz(
	"What is the highest capacity provided by WD My Passport?",
	'Upto 1TB',
	'Upto 2TB',
	'Upto 3TB',
	'Upto 5TB',	
	4	
);
// Question 10
var q10 = new CQuiz(
	"Where are Western Digital's wafers manufactured?",
	'Australia',
	'Japan',
	'India',
	'United Kingdom',	
	2
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
