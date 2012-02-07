var _ = require('underscore');

var cel = {
  "Upper Strength": 17,
  "Lower Strength": 14,
  "Dexterity": 14,
  "Agility": 14,
  "Speed": 13,
  "EyeSight": 11,
  "Hearing": 11,
  "Smell Taste": 11,
  "Touch": 12,
  "Voice": 14,
  "Intelligence": 16,
  "Aura": 16,
  "Will": 16,
  "Morality": 16,
  "Memory": 16,
  "Comeliness": 16
};

console.log(cel);
console.log("Upper Strength => " + cel["Upper Strength"]);

function make_skill(obj, skill_name, vals, oml) {
 obj[skill_name] = function()  {
  return Math.round(
      (_.reduce(vals, function(memo, num){ return memo + num; }, 0)
       /vals.length));
 };
 obj[skill_name + "_oml"] = function() {
    return (obj[skill_name]() * oml);
 };
 obj['dsbo'] = function (skill) {
  console.log(skill + " Base: " + obj[skill]());
  console.log(skill + " OML: " + obj[skill + '_oml']());
};
 
}

// Automatic Skills
make_skill(cel, 'climbing', [cel["Upper Strength"], cel["Lower Strength"], cel["Dexterity"], cel["Agility"]], 4);
make_skill(cel, 'jumping', [cel["Lower Strength"], cel["Speed"], cel["Agility"]], 4);
make_skill(cel, 'stealth', [cel["Agility"], cel["Touch"], cel["Will"]], 3);
make_skill(cel, 'throwing', [cel["Upper Strength"], cel["Dexterity"], cel["EyeSight"]], 4);
make_skill(cel, 'awareness', [cel["EyeSight"], cel["Hearing"], cel["Smell Taste"]], 4);
make_skill(cel, 'combat_awareness', [cel["EyeSight"], cel["Hearing"], cel["Smell Taste"]], 3);
make_skill(cel, 'intrigue', [cel["Intelligence"], cel["Memory"], cel["Will"], cel["Aura"]], 3);
make_skill(cel, 'language', [cel["Intelligence"], cel["Memory"], cel["Memory"], cel["Will"]], 3);
make_skill(cel, 'oratory', [cel["Comeliness"], cel["Voice"], cel["Intelligence"]], 2);
make_skill(cel, 'rhetoric', [cel["Voice"], cel["Intelligence"], cel["Will"]], 3);
make_skill(cel, 'ritual', [cel["Voice"], cel["Intelligence"], cel["Memory"], cel["Will"]], 1);
make_skill(cel, 'singing', [cel["Hearing"], cel["Voice"], cel["Voice"]], 3);

// Skill Display Dump 
var autoSkills = ['climbing', 'jumping', 'stealth', 'throwing', 'awareness', 'combat_awareness',
                  'intrigue', 'language', 'oratory', 'rhetoric', 'ritual', 'singing'];
// Dump them all out
_.map(autoSkills, function(skill){ cel.dsbo(skill) });


