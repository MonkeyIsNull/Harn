var _ = require('underscore');

// Example Char for testing
var cel = {
  "Upper Strength": 17,
  "Lower Strength": 14,
  "Structural Stamina": 15,
  "Internal Endurance": 19,
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
function ss() { return "Structural Stamina"; }
function ie() { return "Internal Endurance"; }
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

var phys_skill_table = [
  ['acrobatics', 'us_ls_ag_ag', 1],
  ['dancing',    'dx_ag_ag',    2],
  ['skiiing',    'ls_dx_ag',    1],
  ['swimming',   'us_ls_dx_ag', 1]
];

// Make the functions
_.map(phys_skill_table, function(vals) { make_skill(cel, vals[0], at(vals[1]), vals[2]); });
// Display them all as if we had them all
_.map(phys_skill_table, function(skill){ cel.dsbo(skill[0]) });

// Communication
var comm_skill_table = [
  ['lovecraft', 'co_vo_tc', 3],
  ['musician',  'dx_hr_tc', 1],
  ['command',   'vo_wi_it', 2]
];
_.map(comm_skill_table, function(vals) { make_skill(cel, vals[0], at(vals[1]), vals[2]); });
_.map(comm_skill_table, function(skill){ cel.dsbo(skill[0]) });

// Naval
var naval_skill_table = [
  ['seamanship', 'us_ls_dx_ag', 1],
  ['shipwright', 'us_ls_dx_it', 1],
  ['piloting',   'ey_tc_it',    1],
  ['weatherlore','ey_st_tc',    1],
  ['cartography','it_ey_tc',    1],
  ['astronomy',  'it_ey_me',    1]
];
_.map(naval_skill_table, function(vals) { make_skill(cel, vals[0], at(vals[1]), vals[2]); });
_.map(naval_skill_table, function(skill){ cel.dsbo(skill[0]) });

// Thieving
var thieving_skill_table = [
  ['treasure_appraisal', 'ey_me_it', 2],
  ['lockcraft',          'dx_tc_wi', 1],
  ['trapsmith',          'dx_tc_wi', 1],
  ['acting',             'ag_vo_it', 1],
  ['forgery',            'dx_ey_wi', 2],
  ['legerdemain',        'dx_tc_tc', 1]
];
_.map(thieving_skill_table, function(vals) { make_skill(cel, vals[0], at(vals[1]), vals[2]); });
_.map(thieving_skill_table, function(skill){ cel.dsbo(skill[0]) });

// Survival
var survival_skill_table = [
  ['foraging_herblore', 'ag_vo_wi',    1],
  ['fishing',           'dx_tc_wi',    2],
  ['animalcraft',       'ag_vo_wi',    1],
  ['tracking',          'ey_st_it',    1],
  ['survival',          'us_ls_dx_it', 2],
  ['hideworking',       'dx_st_tc',    1],
  ['woodcarving',       'dx_tc_wi',    1],
  ['trapping',          'it_tc_wi',    1],
  ['fletching',         'dx_tc_tc',    1]
];
_.map(survival_skill_table, function(vals) { make_skill(cel, vals[0], at(vals[1]), vals[2]); });
_.map(survival_skill_table, function(skill){ cel.dsbo(skill[0]) });

// Scholarly
var scholarly_skill_table = [
  ['scholarly_knowledge', 'it_me_wi', 2],
  ['drawing_artistry',    'ey_dx_tc', 2],
  ['alchemy',             'st_it_au', 1],
  ['heraldry',            'wi_ey_tc', 1],
  ['mathematics',         'it_me_wi', 2],
  ['history',             'it_me_me', 2]
];
_.map(scholarly_skill_table, function(vals) { make_skill(cel, vals[0], at(vals[1]), vals[2]); });
_.map(scholarly_skill_table, function(skill){ cel.dsbo(skill[0]) });

// Other 
var other_skill_table = [
  ['agriculture',  'us_ls_ie_ss_wi', 2],
  ['glassworking', 'dx_dx_tc',       1], 
  ['brewing',      'st_st_tc',       1],     
  ['carpentry',    'us_dx_tc',       2],
  ['ceramics',     'dx_tc_tc',       1],
  ['cooking',      'st_st_tc',       3],
  ['emabalming',   'dx_st_tc',       1],
  ['engineering',  'dx_it_it',       1],
  ['jewelcraft',   'ey_tc_wi',       1],
  ['masonry',      'us_dx_tc',       1],
  ['metalcraft',   'us_dx_tc',       1],
  ['milling',      'us_ls_st_tc',    1],
  ['minerology',   'tc_ey_it',       1],
  ['perfumery',    'st_st_it',       1],
  ['physician',    'tc_it_dx',       2],
  ['textilecraft', 'dx_ey_tc',       2],
  ['timbercraft',  'us_ls_dx_tc',    1],
  ['weaponcraft',  'us_dx_tc',       1],
  ['armorcraft',   'us_dx_tc',       1]
];
_.map(other_skill_table, function(vals) { make_skill(cel, vals[0], at(vals[1]), vals[2]); });
_.map(other_skill_table, function(skill){ cel.dsbo(skill[0]) });

// War, Motherfucker, it's WAR!!!!
var war_skill_table = [
  ['unarmed',          'us_ls_dx_ag', 3],
  ['riding',           'dx_ag_wi',    2],
  ['claw_weapon',      'us_dx_dx',    3],
  ['buckler',          'dx_dx_us',    3],
  ['kite_shield',      'dx_us_us',    3],
  ['knight_shield',    'us_dx_dx',    3],
  ['round_shield',     'us_dx_dx',    3],
  ['tower_shield',     'us_us_dx',    3],
  ['dagger',           'dx_dx_tc',    3],
  ['knife',            'dx_dx_tc',    3],
  ['taburi',           'dx_ey_tc',    3],
  ['keltan',           'us_dx_tc',    3],
  ['longknife',        'dx_tc_us',    3],
  ['shortsword',       'us_dx_dx',    3],
  ['mankar',           'us_dx_dx',    3],
  ['falchion',         'us_dx_dx',    3],
  ['cutlass',          'us_dx_dx',    3],
  ['broadsword',       'us_dx_us',    3],
  ['mang',             'us_dx_us',    3],
  ['estoc',            'us_dx_us',    3],
  ['bastard_sword',    'us_dx_us',    3],
  ['battlesword',      'us_dx_us',    2],
  ['club_stick',       'us_dx_dx',    4],
  ['mace',             'us_dx_dx',    4],
  ['morningstar',      'us_dx_dx',    4],
  ['maul',             'us_dx_dx',    4],
  ['mounted_crossbow', 'dx_ey_tc',    3],
  ['sickle',           'dx_dx_tc',    2],
  ['shorkana',         'us_dx_ey',    2],
  ['hatchet',          'us_dx_dx',    2],
  ['handaxe',          'us_dx_dx',    2],
  ['warhammer',        'us_dx_dx',    2],
  ['battle_axe',       'us_us_dx',    2],
  ['nunchaku',         'dx_dx_tc',    1],
  ['grainflail',       'us_dx_dx',    1],
  ['ball_and_chain',   'dx_dx_tc',    1],
  ['warflail',         'us_dx_tc',    1],
  ['whip_isagara',     'dx_dx_tc',    1],
  ['net',              'dx_tc_ag',    1],
  ['javelin',          'us_dx_ey',    3],
  ['staff',            'us_dx_dx',    3],
  ['spear',            'us_dx_dx',    3],
  ['trident',          'us_dx_dx',    3],
  ['lance',            'us_us_dx',    3],
  ['glaive',           'us_dx_dx',    2],
  ['poleaxe',          'us_us_dx',    2],
  ['falcastra',        'us_dx_dx',    2],
  ['pike',             'us_ls_dx',    2],
  ['shortbow',         'dx_ey_tc',    2],
  ['longbow',          'us_dx_ey',    2],
  ['blowgun',          'ie_ey_tc',    2],
  ['sling',            'dx_dx_ey',    1],
  ['staffsling',       'dx_dx_ey',    1],
  ['hand_crossbow',    'dx_ey_tc',    3],
  ['mounted_crossbow', 'dx_ey_tc',    3],
  ['wind_gun',         'dx_ey_tc',    4],
  ['munkiri_crossbow', 'dx_us_ls_ey', 3],
  ['ballista',         'dx_ey_it',    1],
  ['mangonel',         'dx_ey_it',    1],
  ['trebuchet',        'dx_ey_it',    1],
  ['dodge',            'dx_ag_ey',    3],
  ['missile_dodge',    'dx_ey_it',    1]
];
_.map(war_skill_table, function(vals) { make_skill(cel, vals[0], at(vals[1]), vals[2]); });
_.map(war_skill_table, function(skill){ cel.dsbo(skill[0]) });





