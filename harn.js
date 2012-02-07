var _ = require('underscore');

// Example Char for testing
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

// Attr Funcs
function us() { return "Upper Strength"; }
function ls() { return "Lower Strength"; }
function dx() { return "Dexterity"; }
function ag() { return "Agility"; }
function sp() { return "Speed"; }
function ey() { return "EyeSight"; }
function hr() { return "Hearing"; }
function st() { return "Smell Taste"; }
function tc() { return "Touch"; }
function vo() { return "Voice"; }
function it() { return "Intelligence"; }
function au() { return "Aura"; }
function wi() { return "Will"; }
function mo() { return "Morality"; }
function me() { return "Memory"; }
function co() { return "Comeliness"; }

function make_skill(obj, skill_name, vals, oml) {
 obj[skill_name] = function()  {
  return Math.round(
      (_.reduce(vals, function(memo, num){ return memo + obj[num]; }, 0)
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

// Attribute Functor Lookup
function at(attrs_func) {
 return _.map(attrs_func.split(/_/), function(i) { return eval(i)(); });
}
// Auto Skills - Literate Style
// make_skill(cel, 'jumping', ["Lower Strength", "Speed", "Agility"], 4);
// make_skill(cel, 'stealth', ["Agility", "Touch", "Will"], 3);
// make_skill(cel, 'throwing', ["Upper Strength", "Dexterity", "EyeSight"], 4);
// make_skill(cel, 'awareness', ["EyeSight", "Hearing", "Smell Taste"], 4);
// make_skill(cel, 'combat_awareness', ["EyeSight", "Hearing", "Smell Taste"], 3);
// make_skill(cel, 'intrigue', ["Intelligence", "Memory", "Will", "Aura"], 3);
// make_skill(cel, 'language', ["Intelligence", "Memory", "Memory", "Will"], 3);
// make_skill(cel, 'oratory', ["Comeliness", "Voice", "Intelligence"], 2);
// make_skill(cel, 'rhetoric', ["Voice", "Intelligence", "Will"], 3);
// make_skill(cel, 'ritual', ["Voice", "Intelligence", "Memory", "Will"], 1);
// make_skill(cel, 'singing', ["Hearing", "Voice", "Voice"], 3);


// Automatic Skills -- short form
// make_skill(cel, 'climbing', at('us_ls_dx_ag'), 4);
// make_skill(cel, 'jumping', at('ls_sp_ag'), 4);
// make_skill(cel, 'stealth', at('ag_tc_wi'), 3);
// make_skill(cel, 'throwing', at('us_dx_ey'), 4);
// make_skill(cel, 'awareness', at('ey_hr_st'), 4);
// make_skill(cel, 'combat_awareness',at('ey_hr_st'), 3);
// make_skill(cel, 'intrigue', at('it_me_wi_au'), 3);
// make_skill(cel, 'language', at('it_me_me_wi'), 3);
// make_skill(cel, 'oratory', at('co_vo_it'), 2);
// make_skill(cel, 'rhetoric', at('vo_it_wi'), 3);
// make_skill(cel, 'ritual', at('vo_it_me_wi'), 1);
// make_skill(cel, 'singing', at('hr_vo_vo'), 3);

// Terse Style
var auto_skill_table = [
 ['climbing',        'us_ls_dx_ag', 4],
 ['jumping',         'ls_sp_ag',    4],
 ['stealth',         'ag_tc_wi',    3],
 ['throwing',        'us_dx_ey',    4],
 ['awareness',       'ey_hr_st',    4],
 ['combat_awareness','ey_hr_st',    3],
 ['intrigue',        'it_me_wi_au', 3],
 ['language',        'it_me_me_wi', 3],
 ['oratory',         'co_vo_it',    2],
 ['rhetoric',        'vo_it_wi',    3],
 ['ritual',          'vo_it_me_wi', 1],
 ['singing',         'hr_vo_vo',    3]
];

// Make the functions
_.map(auto_skill_table, function(vals) { make_skill(cel, vals[0], at(vals[1]), vals[2]); });
// Display them all
_.map(auto_skill_table, function(skill){ cel.dsbo(skill[0]) });


