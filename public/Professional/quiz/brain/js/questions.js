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
	"What is the highest capacity provided by G-SPEED™ Shuttle with Thunderbolt™ 3 SSDs?",
	'55TB',
	'60TB',
	'72TB',
	'65TB',	
	3
);

// Question 2
var q2 = new CQuiz(
	"What are the transfer rates available in G-SPEED™ Shuttle with Thunderbolt™ 3 SSDs?",
	'500MB/s',
	'1000MB/s',
	'300MB/s',
	'600MB/s',
	2
);

// Question 3
var q3 = new CQuiz(
	"What features are available in G-SPEED™ Shuttle with Thunderbolt™ 3 SSDs?",
	'Bandwidth to support multi camera editing ',
	'Render footage with multi-layer effects',
	'Quickly export in an efficient workflow',
	'All of the above',	
	4
);

// Question 4
var q4 = new CQuiz(
	"What is the warranty period provided by G-Raid with Thunderbolt 3?",
	'5-year limited warranty',
	'4-year limited warranty',
	'3-year limited warranty',
	'2-year limited warranty',	
	1
);

// Question 5
var q5 = new CQuiz(
	"What is the highest capacity provided by G-Raid with Thunderbolt 3?",
	'Up to 36TB',
	'Up to 24TB',
	'Up to 30TB',
	'Up to 32TB',	
	1	
);

// Question 6
var q6 = new CQuiz(
	"The G-RAID with Thunderbolt 3 is a high-performance, dual Enterprise-class ___________hard drive storage system. Fill in the blank-",
	'6100 RPM',
	'6900 RPM',
	'7200 RPM',
	'7000 RPM',	
	3	
);
// Question 7
var q7 = new CQuiz(
	"What is the transfer rates of G-RAID with Thunderbolt 3?",
	'100MB/s',
	'200MB/s',
	'500MB/s',
	'300MB/s',	
	3	
);
// Question 8
var q8 = new CQuiz(
	"What is the warranty period provided by G-SPEED™ Shuttle with Thunderbolt™ 3 SSDs?",
	'5-year limited warranty',
	'1-year limited warranty',
	'2-year limited warranty',
	'3-year limited warranty',	
	1	
);
// Question 9
var q9 = new CQuiz(
	"What is ArmorLock™ Encrypted NVMe™ SSD built with?",
	'256-bit AES-XTS hardware encryption',
	'245-bit AES-XTS hardware encryption',
	'249-bit AES-XTS hardware encryption',
	'250-bit AES-XTS hardware encryption',	
	1	
);
// Question 10
var q10 = new CQuiz(
	"What is the transfer rate of ArmorLock™ Encrypted NVMe™ SSD?",
	'1000MB/s',
	'500MB/s',
	'400MB/s',
	'300MB/s',	
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
