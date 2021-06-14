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
	"Which storage products are offered as a part of the Western Digital Smart Video product portfolio?",
	'HDDs & Micro SD cards',
	'SSDs & MicroSD cards',
	'NVMe SSDs & MicroSD cards',
	'None of the above',	
	1
);

// Question 2
var q2 = new CQuiz(
	"What colour/brand name represents the Smart Video Segment?",
	'WD Purple Surveillance Drives',
	'WD Gold Enterprise Class Sata HDDs',
	'WD Blue NVMe SSDs',
	'None of the above',
	1
);

// Question 3
var q3 = new CQuiz(
	"What is the highest capacity point WDC offers in terms of WD Purple Surveillance Drives?",
	'11TB',
	'18TB',
	'10TB',
	'13TB',	
	2
);

// Question 4
var q4 = new CQuiz(
	"What is the highest capacity point WDC offers in terms of WD Purple microSD cards?",
	'64GB',
	'1TB',
	'212 GB',
	'500 GB',	
	2
);

// Question 5
var q5 = new CQuiz(
	"WD Purple™ SC QD101 microSD™ card uses_________ advanced technology. Fill in the blank-",
	'45-layer 3D NAND technology',
	'55-layer 3D NAND technology',
	'75-layer 3D NAND technology',
	'96-layer 3D NAND technology',	
	4	
);

// Question 6
var q6 = new CQuiz(
	"WD Purple™ SC QD101 microSD™ provides:",
	'Weather-resistant',
	'Humidity resistant',
	'Withstands temperature',
	'All of the above',	
	4	
);
// Question 7
var q7 = new CQuiz(
	"WD Purple™ SC QD101 microSD™ is optimized for video surveillance cameras that operate 24/7.",
	'True',
	'False',
	'',
	'',	
	1	
);
// Question 8
var q8 = new CQuiz(
	"WD Purple microSD card has an operating temperature range of___________. Fill in the blank-",
	'25°C to 85°C',
	'12°C to 85°C',
	'13°C to 85°C',
	'20°C to 85°C',	
	1	
);
// Question 9
var q9 = new CQuiz(
	"In which year did IBM invent the first hard drive?",
	'1946',
	'1956',
	'1948',
	'1950',	
	2	
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
