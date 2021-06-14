
let x=[
    "Andy Dorian",
  "Colleen Crowley",
  "Greg Kwolek",
  "Jerry Kagele",
  "Jim Welsh",
  "Kristy Morris",
  "Kyle McElroy",
  "Pascal De Boer",
  "Rob Soderbery",
  "Ryan Inouye",
  "Scott Davis",
  "Siva Sivaram",
];
let final='';

mm();

function mm()
{
    for(let i=0;i<x.length;i++)
    {
        let name=x[i];
        final+='<img src="static/images/usa/'+name+'.jpg" class="imgstyle all usa" name="'+name+'" team="usa" /> ';
    }
    console.log(final);
}

