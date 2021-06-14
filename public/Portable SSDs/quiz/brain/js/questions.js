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
	"Which SSD interface have we integrated in our latest Portable SSD products?",
	'NVMe',
	'CVMe',
	'DVMe',
	'HVMe',	
	1
);

// Question 2
var q2 = new CQuiz(
	"How fast are our new SanDisk and WD Portable SSD solutions?",
	'Nearly 2x faster than our previous generation',
	'Nearly 1x faster than our previous generation',
	'Nearly 1.2x faster than our previous generation',
	'Nearly 1.5x faster than our previous generation',
	1
);

// Question 3
var q3 = new CQuiz(
	"What's the highest capacity available during the launch for SanDisk Exteme PRO Portable SSD?",
	'1TB',
	'2TB',
	'64 GB',
	'212 GB',	
	2
);

// Question 4
var q4 = new CQuiz(
	"What's the highest transfer speed you can reach with SanDisk Portable SSDs?",
	'1000MB/s in both write/read with SanDisk Extreme Pro Portable SSD',
	'2000MB/s in both write/read with SanDisk Extreme Pro Portable SSD',
	'800MB/s in both write/read with SanDisk Extreme Pro Portable SSD',
	'600MB/s in both write/read with SanDisk Extreme Pro Portable SSD',	
	2
);

// Question 5
var q5 = new CQuiz(
	"What security features are implemented in SanDisk and WD Portable SSDs to keep consumers data safe?",
	'You can keep your content private with the included password protection featuring 249‐bit AES hardware encryption.',
	'You can keep your content private with the included password protection featuring 250‐bit AES hardware encryption.',
	'You can keep your content private with the included password protection featuring 256‐bit AES hardware encryption.',
	'You can keep your content private with the included password protection featuring 252‐bit AES hardware encryption.',	
	3	
);

// Question 6
var q6 = new CQuiz(
	"How durable are the SanDisk Extreme Portable SSDs?",
	'Both new Extreme and Extreme PRO Portable SSDs features up to two-meter drop protection and IP45 water and dust resistance.',
	'Both new Extreme and Extreme PRO Portable SSDs features up to two-meter drop protection and IP55 water and dust resistance',
	'Both new Extreme and Extreme PRO Portable SSDs features up to two-meter drop protection and IP35 water and dust resistance.',
	'Both new Extreme and Extreme PRO Portable SSDs features up to two-meter drop protection and IP25 water and dust resistance.',	
	2	
);
// Question 7
var q7 = new CQuiz(
	"What's the warranty for both new SanDisk Extreme/Extreme PRO Portable SSDs and My Passport SSDs?",
	'1-year limited warranty',
	'2-year limited warranty',
	'3-year limited warranty',
	'5-year limited warranty',	
	4	
);
// Question 8
var q8 = new CQuiz(
	"What's the USB generation of SanDisk Extreme PRO Portable SSD?",
	'USB 1.2 Gen 2x2 which allows speeds up to 20GBPS ',
	'USB 2.2 Gen 2x2 which allows speeds up to 20GBPS ',
	'USB 3.2 Gen 2x2 which allows speeds up to 20GBPS',
	'USB 3.2 Gen 2x2 which allows speeds up to 20GBPS',	
	3	
);
// Question 9
var q9 = new CQuiz(
	"Where is the headquarters of the company located?",
	'San Jose, California',
	'Seattle, Washington',
	'Cupertino, California',
	'Omaha, Nebraska',	
	1	
);
// Question 10
var q10 = new CQuiz(
	"In which year was Western Digital founded?",
	'1945',
	'1950',
	'1960',
	'1970',	
	4
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
