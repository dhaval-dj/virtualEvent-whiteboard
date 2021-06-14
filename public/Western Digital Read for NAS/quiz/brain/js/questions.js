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
	"What are the names of the 3 products in the new WD Red HDD portfolio?",
	'WD Black, WD Black Plus, WD Black PRO',
	'WD Blue, WD Blue Plus, WD Blue Red PRO',
	'WD Red, WD Red Plus, WD Red PRO',
	'WD Green, WD Green Plus, WD Green PRO',	
	3
);

// Question 2
var q2 = new CQuiz(
	"What is the highest capacity available in WD Red Pro drive?",
	'18TB',
	'10TB',
	'11TB',
	'12TB',
	1
);

// Question 3
var q3 = new CQuiz(
	"Does Western Digital offer WD Red SSD solutions?",
	'Yes, up to 4 TB',
	'Yes, up to 1TB',
	'Yes, up to 2TB',
	'Yes, up to 3TB',	
	1
);

// Question 4
var q4 = new CQuiz(
	"What colour/brand name represents the NAS segment?",
	'WD Blue',
	'WD Red',
	'WD Black',
	'WD Green',	
	2
);

// Question 5
var q5 = new CQuiz(
	"In which form factors are WD Red SSDs available in?",
	'WD Red SSDs are available in 1.5” and M.2 form factors and capacities from 500GB up to 4TB1 (2.5” only)',
	'WD Red SSDs are available in 2.5” and M.2 form factors and capacities from 500GB up to 4TB1 (2.5” only)',
	'WD Red SSDs are available in 1.6” and M.2 form factors and capacities from 500GB up to 4TB1 (2.5” only)',
	'WD Red SSDs are available in 1.7” and M.2 form factors and capacities from 500GB up to 4TB1 (2.5” only)',	
	2	
);

// Question 6
var q6 = new CQuiz(
	"What are the 3 advantages of WD Red SSDs?",
	'Speed',
	'Endurance',
	'Flexibility',
	'All of the above',	
	4	
);
// Question 7
var q7 = new CQuiz(
	"What are the 3 advantages of WD Red HDDs?",
	'Compatibility',
	'Reliability',
	'Capacity',
	'All of the above',	
	4	
);
// Question 8
var q8 = new CQuiz(
	"What advantages does WD Red Pro offer compared to the rest of the WD Red drives?",
	'Higher capacity, Longer warranty, faster RPM',
	'Shorter capacity, Longer warranty, faster RPM',
	'Longer capacity, faster warranty ,Higher RPM',
	'None of the above',	
	1	
);
// Question 9
var q9 = new CQuiz(
	"In which year was Western Digital founded?",
	'1945',
	'1970',
	'1950',
	'1960',	
	2	
);
// Question 10
var q10 = new CQuiz(
	"Who is the Western Digital's CEO?",
	'David Golf',
	'Danniel Pinto',
	'David Goeckeler',
	'Darris Andrew',	
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
