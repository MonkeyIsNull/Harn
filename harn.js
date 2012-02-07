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

function oml_calc(func, hchar, oml) {
  return(func(hchar)*oml);
};

function skill_base4(vals) {
  return Math.round(
      (_.reduce([vals[0], vals[1], vals[2], vals[3]], function(memo, num){ return memo + num; }, 0)
       /4));
};

function skill_base3(vals) {
  return Math.round(
      (_.reduce([vals[0], vals[1], vals[2]], function(memo, num){ return memo + num; }, 0)
       /3));
};

// ---- Climbing ---- 
function climbing(hchar) {
  return skill_base4([hchar["Upper Strength"], 
                      hchar["Lower Strength"],
                      hchar["Dexterity"],
                      hchar["Agility"]
                      ]);
};

function climbing_oml(hchar) {
  return oml_calc(climbing, hchar, 4);
};

// ---- Jumping ----
function jumping(hchar) {
  return skill_base3([hchar["Lower Strength"],
                      hchar["Speed"],
                      hchar["Agility"]
                      ]);
};

function jumping_oml(hchar) {
  return oml_calc(jumping, hchar, 3);
};

function make_skill(obj, skill_name, vals, baseNum) {
 obj[skill_name] = function()  {
  return Math.round(
      (_.reduce(vals, function(memo, num){ return memo + num; }, 0)
       /baseNum));
 };
 obj[skill_name + "_oml"] = function() {
    return (obj[skill_name]() * baseNum);
 };
}


console.log("Climbing Skill Base: " + climbing(cel));
console.log("Climbing Oml: " + climbing_oml(cel));
console.log("Jumping Skill Base: " + jumping(cel));
console.log("Jumping OML: " + jumping_oml(cel));

make_skill(cel, 'jumping', [cel["Lower Strength"], cel["Speed"], cel["Agility"]], 3);
console.log("MetaSkillBaseJump => " + cel.jumping());
console.log("MetaSkillOmlJump => " + cel.jumping_oml());
