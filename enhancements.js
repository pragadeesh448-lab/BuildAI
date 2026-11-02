
function normalizeSupplierId(id){
  if(!id) return "lakshmi";
  const map = {
    "DEMO-SUP-001": "lakshmi",
    "DEMO-SUP-002": "pandian-ply",
    "DEMO-SUP-003": "babu",
    "DEMO-SUP-004": "geetha",
    "DEMO-SUP-005": "dk-paints"
  };
  return map[id] || id;
}
window.normalizeSupplierId = normalizeSupplierId;
/* BuildAI local-first guide, supplier-shop catalogues and explainable procurement planning. */
(function(){
"use strict";
const $=id=>document.getElementById(id);
const money=n=>"₹"+Math.round(Number(n)||0).toLocaleString("en-IN");
const safe=v=>String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const getProducts=()=>typeof products!=="undefined"?products:[];
const getSuppliers=()=>typeof suppliers!=="undefined"?suppliers:[];
const assortment={"lakshmi": ["bb_cem_001", "bb_cem_006", "bb_ewc_005", "bb_ewc_010", "bb_lam_004", "bb_lam_009", "bb_lvt_003", "bb_lvt_008", "bb_mcp_002", "bb_mcp_007", "bb_ply_001", "bb_ply_006", "bb_san_005", "bb_san_010", "bb_skb_004", "bb_skb_009", "bb_spc_003", "bb_spc_008", "bb_stn_002", "bb_stn_007", "bb_til_001", "bb_til_006", "bb_ven_005", "bb_ven_010", "bb_tmt_001", "bb_tmt_002", "bb_tmt_003", "bb_tmt_004", "bb_tmt_007", "bb_tmt_008", "bb_tmt_010", "bb_snd_001", "bb_snd_002", "bb_snd_004", "bb_snd_005", "bb_snd_007", "bb_snd_009", "bb_brk_001", "bb_brk_005", "bb_brk_006", "bb_brk_007", "bb_brk_009", "bb_chm_004", "bb_chm_010", "bb_rof_001", "bb_rof_005", "bb_rof_006", "bb_rof_010", "bb_cem_002", "bb_cem_003", "bb_cem_004", "bb_cem_005", "bb_cem_007", "bb_cem_008", "bb_cem_009", "bb_cem_010", "bb_ewc_001", "bb_ewc_002", "bb_ewc_003", "bb_ewc_004", "bb_ewc_006", "bb_ewc_007", "bb_ewc_008", "bb_ewc_009", "bb_stn_001", "bb_stn_003", "bb_stn_004", "bb_stn_005", "bb_stn_006", "bb_stn_008", "bb_stn_009", "bb_stn_010", "paint_soft_ivory", "paint_morning_dew", "paint_cotton_wool", "paint_pearl_white", "paint_crisp_linen", "paint_vanilla_frost", "paint_chalk_white", "paint_almond_crush", "paint_warm_greige", "paint_urban_taupe", "paint_desert_dune", "paint_raw_jute", "paint_stone_path", "paint_cashmere_mist", "paint_driftwood_grey", "paint_italian_latte", "paint_sage_serenity", "paint_olive_grove", "paint_forest_emerald", "paint_eucalyptus_mint", "paint_moss_velvet", "paint_celadon_mist", "paint_cypress_green", "paint_avocado_cream", "paint_coastal_slate", "paint_royal_navy", "paint_midnight_ocean", "paint_breeze_aqua", "paint_monsoon_sky", "paint_arctic_ice", "paint_indigo_ink", "paint_duck_egg_blue", "paint_tuscan_terracotta", "paint_burnt_sienna", "paint_cinnamon_bark", "paint_rust_amber", "paint_crimson_sunset", "paint_moroccan_clay", "paint_paprika_warmth", "paint_copper_glow", "paint_dusty_rose", "paint_blush_quartz", "paint_sunbaked_coral", "paint_velvet_petal", "paint_vintage_mauve", "paint_apricot_nectar", "paint_charcoal_noir", "paint_graphite_slate", "paint_smoky_quartz", "paint_espresso_dark", "paint_pure_obsidian", "paint_storm_cloud", "bb_tmt_005", "bb_tmt_006", "bb_tmt_009", "bb_snd_003", "bb_snd_006", "bb_snd_008", "bb_snd_010", "bb_brk_002", "bb_brk_003", "bb_brk_004", "bb_brk_008", "bb_brk_010", "bb_chm_001", "bb_chm_002", "bb_chm_003", "bb_chm_005", "bb_chm_006", "bb_chm_007", "bb_chm_008", "bb_chm_009", "bb_rof_002", "bb_rof_003", "bb_rof_004", "bb_rof_007", "bb_rof_008", "bb_rof_009"], "pandian-ply": ["bb_cem_002", "bb_cem_007", "bb_ewc_001", "bb_ewc_006", "bb_lam_005", "bb_lam_010", "bb_lvt_004", "bb_lvt_009", "bb_mcp_003", "bb_mcp_008", "bb_ply_002", "bb_ply_007", "bb_san_001", "bb_san_006", "bb_skb_005", "bb_skb_010", "bb_spc_004", "bb_spc_009", "bb_stn_003", "bb_stn_008", "bb_til_002", "bb_til_007", "bb_ven_001", "bb_ven_006", "bb_rof_002", "bb_rof_003", "bb_rof_004", "bb_rof_007", "bb_rof_009", "bb_lam_001", "bb_lam_002", "bb_lam_003", "bb_lam_004", "bb_lam_006", "bb_lam_007", "bb_lam_008", "bb_lam_009", "bb_lvt_001", "bb_lvt_002", "bb_lvt_003", "bb_lvt_005", "bb_lvt_006", "bb_lvt_007", "bb_lvt_008", "bb_lvt_010", "bb_ply_001", "bb_ply_003", "bb_ply_004", "bb_ply_005", "bb_ply_006", "bb_ply_008", "bb_ply_009", "bb_ply_010", "bb_skb_001", "bb_skb_002", "bb_skb_003", "bb_skb_004", "bb_skb_006", "bb_skb_007", "bb_skb_008", "bb_skb_009", "bb_spc_001", "bb_spc_002", "bb_spc_003", "bb_spc_005", "bb_spc_006", "bb_spc_007", "bb_spc_008", "bb_spc_010", "bb_ven_002", "bb_ven_003", "bb_ven_004", "bb_ven_005", "bb_ven_007", "bb_ven_008", "bb_ven_009", "bb_ven_010", "paint_soft_ivory", "paint_morning_dew", "paint_cotton_wool", "paint_pearl_white", "paint_crisp_linen", "paint_vanilla_frost", "paint_chalk_white", "paint_almond_crush", "paint_warm_greige", "paint_urban_taupe", "paint_desert_dune", "paint_raw_jute", "paint_stone_path", "paint_cashmere_mist", "paint_driftwood_grey", "paint_italian_latte", "paint_sage_serenity", "paint_olive_grove", "paint_forest_emerald", "paint_eucalyptus_mint", "paint_moss_velvet", "paint_celadon_mist", "paint_cypress_green", "paint_avocado_cream", "paint_coastal_slate", "paint_royal_navy", "paint_midnight_ocean", "paint_breeze_aqua", "paint_monsoon_sky", "paint_arctic_ice", "paint_indigo_ink", "paint_duck_egg_blue", "paint_tuscan_terracotta", "paint_burnt_sienna", "paint_cinnamon_bark", "paint_rust_amber", "paint_crimson_sunset", "paint_moroccan_clay", "paint_paprika_warmth", "paint_copper_glow", "paint_dusty_rose", "paint_blush_quartz", "paint_sunbaked_coral", "paint_velvet_petal", "paint_vintage_mauve", "paint_apricot_nectar", "paint_charcoal_noir", "paint_graphite_slate", "paint_smoky_quartz", "paint_espresso_dark", "paint_pure_obsidian", "paint_storm_cloud", "bb_rof_001", "bb_rof_005", "bb_rof_006", "bb_rof_008", "bb_rof_010"], "babu": ["bb_cem_003", "bb_cem_008", "bb_ewc_002", "bb_ewc_007", "bb_lam_001", "bb_lam_006", "bb_lvt_005", "bb_lvt_010", "bb_mcp_004", "bb_mcp_009", "bb_ply_003", "bb_ply_008", "bb_san_002", "bb_san_007", "bb_skb_001", "bb_skb_006", "bb_spc_005", "bb_spc_010", "bb_stn_004", "bb_stn_009", "bb_til_003", "bb_til_008", "bb_ven_002", "bb_ven_007", "bb_tmt_005", "bb_tmt_006", "bb_tmt_009", "bb_snd_003", "bb_snd_006", "bb_snd_008", "bb_snd_010", "bb_brk_002", "bb_brk_003", "bb_brk_004", "bb_brk_008", "bb_brk_010", "bb_pip_001", "bb_pip_002", "bb_pip_003", "bb_pip_004", "bb_pip_005", "bb_pip_006", "bb_pip_007", "bb_pip_009", "bb_pip_010", "bb_chm_003", "bb_chm_008", "bb_rof_008", "bb_cem_001", "bb_cem_002", "bb_cem_004", "bb_cem_005", "bb_cem_006", "bb_cem_007", "bb_cem_009", "bb_cem_010", "bb_ewc_001", "bb_ewc_003", "bb_ewc_004", "bb_ewc_005", "bb_ewc_006", "bb_ewc_008", "bb_ewc_009", "bb_ewc_010", "bb_lvt_001", "bb_lvt_002", "bb_lvt_003", "bb_lvt_004", "bb_lvt_006", "bb_lvt_007", "bb_lvt_008", "bb_lvt_009", "bb_san_001", "bb_san_003", "bb_san_004", "bb_san_005", "bb_san_006", "bb_san_008", "bb_san_009", "bb_san_010", "bb_stn_001", "bb_stn_002", "bb_stn_003", "bb_stn_005", "bb_stn_006", "bb_stn_007", "bb_stn_008", "bb_stn_010", "bb_til_001", "bb_til_002", "bb_til_004", "bb_til_005", "bb_til_006", "bb_til_007", "bb_til_009", "bb_til_010", "paint_soft_ivory", "paint_morning_dew", "paint_cotton_wool", "paint_pearl_white", "paint_crisp_linen", "paint_vanilla_frost", "paint_chalk_white", "paint_almond_crush", "paint_warm_greige", "paint_urban_taupe", "paint_desert_dune", "paint_raw_jute", "paint_stone_path", "paint_cashmere_mist", "paint_driftwood_grey", "paint_italian_latte", "paint_sage_serenity", "paint_olive_grove", "paint_forest_emerald", "paint_eucalyptus_mint", "paint_moss_velvet", "paint_celadon_mist", "paint_cypress_green", "paint_avocado_cream", "paint_coastal_slate", "paint_royal_navy", "paint_midnight_ocean", "paint_breeze_aqua", "paint_monsoon_sky", "paint_arctic_ice", "paint_indigo_ink", "paint_duck_egg_blue", "paint_tuscan_terracotta", "paint_burnt_sienna", "paint_cinnamon_bark", "paint_rust_amber", "paint_crimson_sunset", "paint_moroccan_clay", "paint_paprika_warmth", "paint_copper_glow", "paint_dusty_rose", "paint_blush_quartz", "paint_sunbaked_coral", "paint_velvet_petal", "paint_vintage_mauve", "paint_apricot_nectar", "paint_charcoal_noir", "paint_graphite_slate", "paint_smoky_quartz", "paint_espresso_dark", "paint_pure_obsidian", "paint_storm_cloud", "bb_tmt_001", "bb_tmt_002", "bb_tmt_003", "bb_tmt_004", "bb_tmt_007", "bb_tmt_008", "bb_tmt_010", "bb_snd_001", "bb_snd_002", "bb_snd_004", "bb_snd_005", "bb_snd_007", "bb_snd_009", "bb_brk_001", "bb_brk_005", "bb_brk_006", "bb_brk_007", "bb_brk_009", "bb_pip_008", "bb_chm_001", "bb_chm_002", "bb_chm_004", "bb_chm_005", "bb_chm_006", "bb_chm_007", "bb_chm_009", "bb_chm_010", "bb_rof_001", "bb_rof_002", "bb_rof_003", "bb_rof_004", "bb_rof_005", "bb_rof_006", "bb_rof_007", "bb_rof_009", "bb_rof_010"], "geetha": ["bb_cem_004", "bb_cem_009", "bb_ewc_003", "bb_ewc_008", "bb_lam_002", "bb_lam_007", "bb_lvt_001", "bb_lvt_006", "bb_mcp_005", "bb_mcp_010", "bb_ply_004", "bb_ply_009", "bb_san_003", "bb_san_008", "bb_skb_002", "bb_skb_007", "bb_spc_001", "bb_spc_006", "bb_stn_005", "bb_stn_010", "bb_til_004", "bb_til_009", "bb_ven_003", "bb_ven_008", "bb_lam_001", "bb_lam_003", "bb_lam_004", "bb_lam_005", "bb_lam_006", "bb_lam_008", "bb_lam_009", "bb_lam_010", "bb_lvt_002", "bb_lvt_003", "bb_lvt_004", "bb_lvt_005", "bb_lvt_007", "bb_lvt_008", "bb_lvt_009", "bb_lvt_010", "bb_mcp_001", "bb_mcp_002", "bb_mcp_003", "bb_mcp_004", "bb_mcp_006", "bb_mcp_007", "bb_mcp_008", "bb_mcp_009", "bb_ply_001", "bb_ply_002", "bb_ply_003", "bb_ply_005", "bb_ply_006", "bb_ply_007", "bb_ply_008", "bb_ply_010", "bb_skb_001", "bb_skb_003", "bb_skb_004", "bb_skb_005", "bb_skb_006", "bb_skb_008", "bb_skb_009", "bb_skb_010", "bb_spc_002", "bb_spc_003", "bb_spc_004", "bb_spc_005", "bb_spc_007", "bb_spc_008", "bb_spc_009", "bb_spc_010", "bb_til_001", "bb_til_002", "bb_til_003", "bb_til_005", "bb_til_006", "bb_til_007", "bb_til_008", "bb_til_010", "bb_ven_001", "bb_ven_002", "bb_ven_004", "bb_ven_005", "bb_ven_006", "bb_ven_007", "bb_ven_009", "bb_ven_010", "paint_soft_ivory", "paint_morning_dew", "paint_cotton_wool", "paint_pearl_white", "paint_crisp_linen", "paint_vanilla_frost", "paint_chalk_white", "paint_almond_crush", "paint_warm_greige", "paint_urban_taupe", "paint_desert_dune", "paint_raw_jute", "paint_stone_path", "paint_cashmere_mist", "paint_driftwood_grey", "paint_italian_latte", "paint_sage_serenity", "paint_olive_grove", "paint_forest_emerald", "paint_eucalyptus_mint", "paint_moss_velvet", "paint_celadon_mist", "paint_cypress_green", "paint_avocado_cream", "paint_coastal_slate", "paint_royal_navy", "paint_midnight_ocean", "paint_breeze_aqua", "paint_monsoon_sky", "paint_arctic_ice", "paint_indigo_ink", "paint_duck_egg_blue", "paint_tuscan_terracotta", "paint_burnt_sienna", "paint_cinnamon_bark", "paint_rust_amber", "paint_crimson_sunset", "paint_moroccan_clay", "paint_paprika_warmth", "paint_copper_glow", "paint_dusty_rose", "paint_blush_quartz", "paint_sunbaked_coral", "paint_velvet_petal", "paint_vintage_mauve", "paint_apricot_nectar", "paint_charcoal_noir", "paint_graphite_slate", "paint_smoky_quartz", "paint_espresso_dark", "paint_pure_obsidian", "paint_storm_cloud"], "dk-paints": ["bb_cem_005", "bb_cem_010", "bb_ewc_004", "bb_ewc_009", "bb_lam_003", "bb_lam_008", "bb_lvt_002", "bb_lvt_007", "bb_mcp_001", "bb_mcp_006", "bb_ply_005", "bb_ply_010", "bb_san_004", "bb_san_009", "bb_skb_003", "bb_skb_008", "bb_spc_002", "bb_spc_007", "bb_stn_001", "bb_stn_006", "bb_til_005", "bb_til_010", "bb_ven_004", "bb_ven_009", "paint_soft_ivory", "paint_morning_dew", "paint_cotton_wool", "paint_pearl_white", "paint_crisp_linen", "paint_vanilla_frost", "paint_chalk_white", "paint_almond_crush", "paint_warm_greige", "paint_urban_taupe", "paint_desert_dune", "paint_raw_jute", "paint_stone_path", "paint_cashmere_mist", "paint_driftwood_grey", "paint_italian_latte", "paint_sage_serenity", "paint_olive_grove", "paint_forest_emerald", "paint_eucalyptus_mint", "paint_moss_velvet", "paint_celadon_mist", "paint_cypress_green", "paint_avocado_cream", "paint_coastal_slate", "paint_royal_navy", "paint_midnight_ocean", "paint_breeze_aqua", "paint_monsoon_sky", "paint_arctic_ice", "paint_indigo_ink", "paint_duck_egg_blue", "paint_tuscan_terracotta", "paint_burnt_sienna", "paint_cinnamon_bark", "paint_rust_amber", "paint_crimson_sunset", "paint_moroccan_clay", "paint_paprika_warmth", "paint_copper_glow", "paint_dusty_rose", "paint_blush_quartz", "paint_sunbaked_coral", "paint_velvet_petal", "paint_vintage_mauve", "paint_apricot_nectar", "paint_charcoal_noir", "paint_graphite_slate", "paint_smoky_quartz", "paint_espresso_dark", "paint_pure_obsidian", "paint_storm_cloud", "bb_pip_008", "bb_chm_001", "bb_chm_002", "bb_chm_005", "bb_chm_006", "bb_chm_007", "bb_chm_009", "bb_ewc_001", "bb_ewc_002", "bb_ewc_003", "bb_ewc_005", "bb_ewc_006", "bb_ewc_007", "bb_ewc_008", "bb_ewc_010", "bb_lam_001", "bb_lam_002", "bb_lam_004", "bb_lam_005", "bb_lam_006", "bb_lam_007", "bb_lam_009", "bb_lam_010", "bb_san_001", "bb_san_002", "bb_san_003", "bb_san_005", "bb_san_006", "bb_san_007", "bb_san_008", "bb_san_010", "bb_skb_001", "bb_skb_002", "bb_skb_004", "bb_skb_005", "bb_skb_006", "bb_skb_007", "bb_skb_009", "bb_skb_010", "bb_til_001", "bb_til_002", "bb_til_003", "bb_til_004", "bb_til_006", "bb_til_007", "bb_til_008", "bb_til_009", "bb_pip_001", "bb_pip_002", "bb_pip_003", "bb_pip_004", "bb_pip_005", "bb_pip_006", "bb_pip_007", "bb_pip_009", "bb_pip_010", "bb_chm_003", "bb_chm_004", "bb_chm_008", "bb_chm_010"]};
window.buildaiAssortment=assortment;
const metrics={"lakshmi": {"score": 4.5, "days": 2, "fee": 550, "tag": "Primary structural steel, cement & aggregates hub"}, "pandian-ply": {"score": 4.6, "days": 3, "fee": 450, "tag": "Plywood, doors, veneers & architectural wood specialist"}, "babu": {"score": 4.4, "days": 1, "fee": 750, "tag": "Express 24h multi-category contractor superstore"}, "geetha": {"score": 4.3, "days": 2, "fee": 500, "tag": "Architectural flooring, acoustic planks & interior finishes"}, "dk-paints": {"score": 4.5, "days": 1, "fee": 650, "tag": "Asian Paints authorized studio & waterproofing centre"}};
window.supplierMetrics=metrics;
const supplierReviews={lakshmi:[{author:"Ramesh Kumar",rating:5,comment:"Excellent quality steel bars, TMT rods were exactly as specified. Delivery was prompt.",date:"2026-09-14"},{author:"Priya Venkat",rating:4,comment:"Good service and competitive prices for cement. Would recommend for structural materials.",date:"2026-08-22"},{author:"Arjun S",rating:4,comment:"Reliable supplier. Roofing sheets were good quality. Slight delay in delivery but overall positive.",date:"2026-07-30"}],"pandian-ply":[{author:"Meena R",rating:5,comment:"Best quality BWP plywood in Vellore. The doors were perfectly finished.",date:"2026-09-20"},{author:"Karthik B",rating:4,comment:"Good range of interior wood products. Staff is helpful and knowledgeable.",date:"2026-08-15"},{author:"Sundar P",rating:5,comment:"Pandian Ply is my go-to for all woodwork. Gypsum boards were perfect.",date:"2026-07-10"}],babu:[{author:"Lakshmi N",rating:4,comment:"Very broad range of materials. Got everything from cement to electrical in one place.",date:"2026-09-18"},{author:"Venkat R",rating:3,comment:"Decent prices but sometimes stock is limited. Good for multi-category requirements.",date:"2026-08-30"},{author:"Geetha M",rating:4,comment:"Fast delivery, especially for paints and tiles. Reliable for bulk orders.",date:"2026-07-25"}],geetha:[{author:"Suresh K",rating:5,comment:"Outstanding timber quality. The teak and oak selections are premium grade.",date:"2026-09-10"},{author:"Divya S",rating:4,comment:"Great range of flooring tiles and granite. Very helpful in selection.",date:"2026-08-20"},{author:"Mani P",rating:4,comment:"Wood panels and doors are top quality. Delivery was within promised time.",date:"2026-07-15"}],"dk-paints": ["wire_copper_25", "wire_copper_15", "sanitary_basin", "sanitary_closet", "lam_oak", "lam_walnut", "skirting_board", "tile_marble_vitrified", "stone_copper_breccia", "stone_desert_veil", "stone_emerald_green", "stone_emperador_crystal", "stone_emperador_linear", "stone_giallo_siena", "paint_soft_ivory", "paint_morning_dew", "paint_cotton_wool", "paint_pearl_white", "paint_crisp_linen", "paint_vanilla_frost", "paint_chalk_white", "paint_almond_crush", "paint_warm_greige", "paint_urban_taupe", "paint_desert_dune", "paint_raw_jute", "paint_stone_path", "paint_cashmere_mist", "paint_driftwood_grey", "paint_italian_latte", "paint_sage_serenity", "paint_olive_grove", "paint_forest_emerald", "paint_eucalyptus_mint", "paint_moss_velvet", "paint_celadon_mist", "paint_cypress_green", "paint_avocado_cream", "paint_coastal_slate", "paint_royal_navy", "paint_midnight_ocean", "paint_breeze_aqua", "paint_monsoon_sky", "paint_arctic_ice", "paint_indigo_ink", "paint_duck_egg_blue", "paint_tuscan_terracotta", "paint_burnt_sienna", "paint_cinnamon_bark", "paint_rust_amber", "paint_crimson_sunset", "paint_moroccan_clay", "paint_paprika_warmth", "paint_copper_glow", "paint_dusty_rose", "paint_blush_quartz", "paint_sunbaked_coral", "paint_velvet_petal", "paint_vintage_mauve", "paint_apricot_nectar", "paint_charcoal_noir", "paint_graphite_slate", "paint_smoky_quartz", "paint_espresso_dark", "paint_pure_obsidian", "paint_storm_cloud"]};
const stored = localStorage.getItem('buildai_supplier_reviews');
if(stored){
  try{window.buildaiReviews=JSON.parse(stored);}catch(e){window.buildaiReviews=JSON.parse(JSON.stringify(supplierReviews));}
}else{
  window.buildaiReviews=JSON.parse(JSON.stringify(supplierReviews));
}
const factors={lakshmi:{cement:.97,tmt:.96,brick:1.01,roof:.98,waterproof:1.04,hardware:1.02},"pandian-ply":{ply:.96,door:.98,gypsum:1.03,woodtile:1.04},babu:{cement:1.01,tmt:1.02,brick:.97,paint:.98,tile:1.03,pipe:.96,wire:1.01,basin:1.02,waterproof:.98,roof:1.02,hardware:.97,granite:1.01},geetha:{ply:1.02,woodtile:.97,tile:.96,granite:.98,door:1.03,gypsum:.96},"dk-paints":{paint:.96,waterproof:1.02,hardware:1.03,pipe:1.04,wire:.98,basin:.97,door:1.04,brick:1.03}};
const priorityWeights={balanced:{price:.36,service:.27,speed:.20,delivery:.17},cost:{price:.57,service:.14,speed:.14,delivery:.15},quality:{price:.17,service:.52,speed:.17,delivery:.14},speed:{price:.18,service:.12,speed:.52,delivery:.18}};
let rowNo=0,photoMode=false,allowCombination=false;
function productFor(id){return getProducts().find(p=>p.id===id);}
function supplierFor(id){return getSuppliers().find(s=>s.id===id);}
function supplies(s,p){return (assortment[s.id]||[]).indexOf(p.id)>=0;}
function offer(s,p){const m=metrics[s.id]||{score:4,days:3,fee:650,tag:"Demo supplier"},price=Math.max(1,Math.round(Number(p.price||0)*((factors[s.id]||{})[p.id]||1.02))),stockOptions=["Demo stock estimate","Usually available · confirm before order","Limited demo stock · confirm quantity"];return {supplier:s,product:p,price:price,score:m.score,days:m.days,fee:m.fee,tag:m.tag,stock:stockOptions[(s.id.length+p.id.length+p.name.length)%stockOptions.length]};}
function productOptions(selectedId){return getProducts().map(p=>'<option value="'+safe(p.id)+'" '+(p.id===selectedId?"selected":"")+'>'+safe(p.name)+' · '+safe(p.unit)+'</option>').join("");}
function getCategoriesFromProducts(){const cats=[...new Set(getProducts().map(p=>p.category))].sort();return cats;}
function productOptionsForCategory(categoryVal,selectedId){const prods=getProducts().filter(p=>!categoryVal||p.category===categoryVal);return prods.map(p=>'<option value="'+safe(p.id)+'" '+(p.id===selectedId?"selected":"")+'>'+safe(p.name)+' · '+safe(p.unit)+'</option>').join("");}
function addRow(productId,qty){
 const host=$("requestItems");if(!host)return;if(host.children.length>=8){if(typeof toast==="function")toast("Maximum 8 material lines in this prototype.");return;}
 const id=++rowNo;
 const allProds=getProducts();
 const firstProd=productId?(allProds.find(p=>p.id===productId)||allProds[0]):allProds[0];
 const firstCat=firstProd?firstProd.category:'';
 const cats=getCategoriesFromProducts();
 const catOptions=cats.map(c=>'<option value="'+safe(c)+'" '+(c===firstCat?"selected":"")+'>'+safe(c)+'</option>').join('');
 const row=document.createElement('div');row.className='request-item-row';
 row.innerHTML='<div class="field"><label for="cat-'+id+'">Category</label><select id="cat-'+id+'" class="req-category">'+catOptions+'</select></div><div class="field"><label for="mat-'+id+'">Material</label><select id="mat-'+id+'" class="req-material">'+productOptionsForCategory(firstCat,firstProd?firstProd.id:'')+'</select></div><div class="field"><label for="qty-'+id+'">Quantity</label><input id="qty-'+id+'" class="req-qty" type="number" min="0.01" step="any" required value="'+safe(qty==null?1:qty)+'"></div><div class="field"><label>Unit</label><input class="req-unit" readonly aria-label="Selected material unit"></div><button class="remove-row" type="button" title="Remove line" aria-label="Remove material line">×</button>';
 host.appendChild(row);
 const catSel=row.querySelector('.req-category');
 const matSel=row.querySelector('.req-material');
 const unitInp=row.querySelector('.req-unit');
 const updateUnit=()=>{const p=productFor(matSel.value);unitInp.value=p?p.unit:'unit';};
 catSel.addEventListener('change',()=>{matSel.innerHTML=productOptionsForCategory(catSel.value,'');updateUnit();});
 matSel.addEventListener('change',updateUnit);
 row.querySelector('.remove-row').addEventListener('click',()=>{if(host.children.length>1)row.remove();else if(typeof toast==='function')toast('Keep at least one material line.');});
 updateUnit();
}
window.addRow = addRow;
function norm(value,min,max){return max===min?1:(max-value)/(max-min);}
function rankOffer(p,priority,deadline,used){
 const all=getSuppliers().filter(s=>supplies(s,p)).map(s=>offer(s,p));if(!all.length)return null;const timely=all.filter(o=>o.days<=deadline),pool=timely.length?timely:all,w=priorityWeights[priority]||priorityWeights.balanced;
 const minP=Math.min(...pool.map(o=>o.price)),maxP=Math.max(...pool.map(o=>o.price)),minQ=Math.min(...pool.map(o=>o.score)),maxQ=Math.max(...pool.map(o=>o.score)),minD=Math.min(...pool.map(o=>o.days)),maxD=Math.max(...pool.map(o=>o.days)),fees=pool.map(o=>used.has(o.supplier.id)?0:o.fee),minF=Math.min(...fees),maxF=Math.max(...fees);
 return pool.map(o=>{const ps=norm(o.price,minP,maxP),qs=maxQ===minQ?1:(o.score-minQ)/(maxQ-minQ),ss=maxD===minD?1:(maxD-o.days)/(maxD-minD),marginal=used.has(o.supplier.id)?0:o.fee,ds=maxF===minF?1:(maxF-marginal)/(maxF-minF);return Object.assign({},o,{rank:w.price*ps+w.service*qs+w.speed*ss+w.delivery*ds,late:o.days>deadline});}).sort((a,b)=>b.rank-a.rank||a.price-b.price||a.days-b.days)[0];
}
function priorityName(v){return ({balanced:"Balanced value",cost:"Lowest overall cost",quality:"Highest service score",speed:"Fastest delivery"})[v]||"Balanced value";}
function optimize(e){
 e.preventDefault();const lines=Array.from($("requestItems").querySelectorAll(".request-item-row")).map(row=>({product:productFor(row.querySelector(".req-material").value),qty:Number(row.querySelector(".req-qty").value)})).filter(x=>x.product&&x.qty>0);
 if(!lines.length){if(typeof toast==="function")toast("Enter a valid material quantity.");return;}
 const seen=new Set();for(const l of lines){if(seen.has(l.product.id)){if(typeof toast==="function")toast("Use one row per material; combine duplicate quantities.");return;}seen.add(l.product.id);}
 const budget=Math.max(0,Number($("projectBudget").value)||0),deadline=Number($("deliveryDeadline").value)||3,priority=$("optimizationPriority").value,used=new Set(),allocations=[];
 const comboCheck=$("allowCombinationSuppliers");
 allowCombination=comboCheck?comboCheck.checked:true;
 let forceSupplierId=null;
 if(!allowCombination){
  const supCoverage=getSuppliers().map(s=>({s,count:lines.filter(l=>supplies(s,l.product)).length,score:(metrics[s.id]||{score:4}).score}));
  supCoverage.sort((a,b)=>b.count-a.count||b.score-a.score);
  if(supCoverage.length)forceSupplierId=supCoverage[0].s.id;
 }
 lines.forEach(line=>{
  let o;
  if(!allowCombination&&forceSupplierId){
   const fs=supplierFor(forceSupplierId);
   if(fs&&supplies(fs,line.product))o=offer(fs,line.product);
   else o=rankOffer(line.product,priority,deadline,used);
  }else{
   o=rankOffer(line.product,priority,deadline,used);
  }
  if(o){used.add(o.supplier.id);allocations.push({product:line.product,qty:line.qty,offer:o,subtotal:o.price*line.qty});}
  else allocations.push({product:line.product,qty:line.qty,offer:null,subtotal:0});
 });
 const map=new Map();allocations.forEach(a=>{if(!a.offer)return;const id=a.offer.supplier.id;if(!map.has(id))map.set(id,{supplier:a.offer.supplier,fee:a.offer.fee,allocations:[]});map.get(id).allocations.push(a);});
 const materialTotal=allocations.reduce((s,a)=>s+a.subtotal,0),shops=Array.from(map.values()),shippingTotal=shops.reduce((s,x)=>s+x.fee,0);
 renderResults({allocations,shops,materialTotal,shippingTotal,total:materialTotal+shippingTotal,budget,deadline,priority,area:$("projectArea").value.trim(),project:$("projectName").value.trim()});
}
function renderResults(d){
 const root=$("optimizationResults"),delta=d.budget-d.total,pct=d.budget?Math.min(100,Math.round(d.total/d.budget*100)):0,late=d.allocations.filter(x=>x.offer&&x.offer.late),budgetText=d.budget?(delta>=0?money(delta)+" under budget":money(-delta)+" over budget"):"No budget limit";
 let h='<div class="optimizer-summary"><div class="optimizer-stat"><span>Estimated total</span><b>'+money(d.total)+'</b><small>Materials plus delivery charges</small></div><div class="optimizer-stat"><span>Material subtotal</span><b>'+money(d.materialTotal)+'</b><small>Simulated shop-specific rates</small></div><div class="optimizer-stat"><span>Delivery total</span><b>'+money(d.shippingTotal)+'</b><small>One fee per selected shop</small></div><div class="optimizer-stat"><span>Selected suppliers</span><b>'+d.shops.length+'</b><small>'+safe(budgetText)+'</small></div></div>';
 h+='<div class="optimizer-banner '+((late.length||(d.budget&&delta<0))?"warning":"")+'"><span>ⓘ</span><div><b>'+safe(d.project||"Your project")+' · '+safe(priorityName(d.priority))+'</b>BuildAI ranks demo offers by unit price, simulated service score, delivery speed and the marginal delivery fee for adding a supplier. This is a weighted recommendation, not a guarantee of global optimum or live stock. '+(late.length?late.length+' selected line(s) exceed the '+d.deadline+'-day target. ':'')+(d.budget&&delta<0?'The estimate is above the target budget. ':'Estimated budget position: '+safe(budgetText)+'.')+'</div></div>';
 h+='<div class="results-heading"><div><h3>Recommended material allocation</h3><p>Each line includes a reason and a link to the supplier catalogue.</p></div><span class="result-chip">'+pct+'% of budget</span></div><div class="allocation-list">';
 d.allocations.forEach(a=>{
  const o=a.offer,p=a.product;if(!o){h+='<article class="allocation-card"><div class="allocation-card-head"><div><h4>'+safe(p.name)+'</h4><p>No demo supplier offers this product.</p></div><span class="allocation-price">No match</span></div></article>';return;}
  const candidates=getSuppliers().filter(s=>supplies(s,p)).map(s=>offer(s,p)),lowest=Math.min(...candidates.map(x=>x.price)),difference=o.price-lowest,priceReason=difference===0?"the lowest displayed demo unit price":(difference/lowest<=.03?"within 3% of the lowest demo price":Math.round(difference/lowest*100)+"% above the lowest demo price"),serviceReason=o.score>=4.3?"one of the highest simulated service scores":(o.score>=4.1?"a competitive simulated service score":"a reasonable overall fit for this priority");
  h+='<article class="allocation-card"><div class="allocation-card-head"><div><h4>'+safe(p.name)+'</h4><p>Quantity '+safe(a.qty)+' '+safe(p.unit)+' · '+safe(o.supplier.name)+'</p></div><span class="allocation-price">'+money(a.subtotal)+'</span></div><div class="allocation-details"><span>Indicative unit price<b>'+money(o.price)+' / '+safe(p.unit)+'</b></span><span>BuildAI demo service score<b>'+o.score.toFixed(1)+' / 5 · simulated</b></span><span>Estimated delivery<b>'+o.days+' day'+(o.days===1?'':'s')+(o.late?' · misses target':'')+'</b></span><span>Delivery charge<b>'+money(o.fee)+' per supplier</b></span></div><div class="choice-reason"><b>Why this supplier:</b> '+safe(o.supplier.name)+' has '+priceReason+', '+serviceReason+', and delivery is estimated at '+o.days+' day'+(o.days===1?'':'s')+'. If this shop already supplies another line, its delivery fee is counted only once. '+(o.late?'This offer misses your delivery target. ':'')+'Service scores and offer availability are simulated; they are not real review ratings or verified stock.</div><div class="allocation-actions"><button type="button" data-open-shop="'+safe(o.supplier.id)+'">View shop catalogue</button><button type="button" data-map-pick="'+safe(o.supplier.id)+'">View location</button><button type="button" data-add-cart="'+safe(p.id)+'">Add to cart</button></div></article>';
 });
 h+='</div><div class="results-heading"><div><h3>Supplier-level order split</h3><p>Delivery fees are counted once per selected shop.</p></div></div><div class="delivery-breakdown"><h4>Suggested purchase split</h4>';
 d.shops.forEach(shop=>{const subtotal=shop.allocations.reduce((s,a)=>s+a.subtotal,0);h+='<div class="delivery-row"><span>'+safe(shop.supplier.name)+'<br><small>'+shop.allocations.length+' material line(s): '+safe(shop.allocations.map(a=>a.product.name).join(", "))+'</small></span><b>'+money(subtotal)+' + '+money(shop.fee)+' delivery</b></div>';});
 h+='<div class="delivery-row"><span><b>Estimated procurement total</b><br>Delivery area: '+safe(d.area||"not specified")+' · not a firm quote</span><b>'+money(d.total)+'</b></div></div><div class="intro-notice" style="margin-top:13px"><b>Demo data</b><span>Prices, delivery time, assortment and service scores are synthetic for your academic prototype. It does not contact shops or create real orders. Confirm rates, taxes, freight and stock with suppliers.</span></div><div class="submit-sourcing-row"><div><b>Ready to contact your matched suppliers?</b><p>Send this requirement list to each selected supplier workspace in the local demo.</p></div><button class="primary" type="button" id="sendToSuppliers">Send requirements to suppliers →</button></div>';
 window.__buildaiLastOptimization=d;
 root.innerHTML=h;
}
function starHtml(rating,max){max=max||5;var s='';for(var i=1;i<=max;i++)s+='<span style="color:'+(i<=Math.round(rating)?'#f4a823':'#ddd')+'">★</span>';return s;}
function renderShopReviews(supplierId){
 const reviews=(window.buildaiReviews||{})[supplierId]||[];
 const avg=reviews.length?(reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1):null;
 let h='<div class="shop-reviews-section"><div class="shop-reviews-header"><h3>Customer Reviews</h3>';
 if(avg)h+='<div class="shop-avg-rating">'+starHtml(avg)+'<span>'+avg+'/5 · '+reviews.length+' review'+(reviews.length!==1?'s':'')+'</span></div>';
 h+='</div>';
 if(reviews.length){h+='<div class="shop-reviews-list">'+reviews.map(r=>'<div class="shop-review-card"><div class="shop-review-top"><span class="shop-review-author">'+safe(r.author)+'</span>'+starHtml(r.rating)+'<span class="shop-review-date">'+safe(r.date)+'</span></div><p class="shop-review-comment">'+safe(r.comment)+'</p></div>').join('')+'</div>';}
 else{h+='<p style="color:#8899aa;font-size:11px">No reviews yet. Be the first to review!</p>';}
 h+='<div class="shop-write-review"><h4>Write a Review</h4><form class="shop-review-form"><div class="shop-review-form-grid"><input class="shop-reviewer-name" placeholder="Your name" required maxlength="60"><select class="shop-reviewer-rating"><option value="5">★★★★★ Excellent</option><option value="4">★★★★☆ Good</option><option value="3">★★★☆☆ Average</option><option value="2">★★☆☆☆ Below average</option><option value="1">★☆☆☆☆ Poor</option></select></div><textarea class="shop-reviewer-comment" placeholder="Share your experience with this supplier..." maxlength="300" required></textarea><button type="submit" class="primary" style="margin-top:8px">Submit Review</button></form></div></div>';
 return h;
}
function openShop(id){
 const s=supplierFor(id);if(!s){if(typeof toast==="function")toast("Supplier profile not found.");return;}
 closeShop();const ids=assortment[s.id]||[],items=getProducts().filter(p=>ids.includes(p.id)),m=metrics[s.id]||{score:4,days:3,fee:650};
 const catMap=new Map();
 items.forEach(p=>{if(!catMap.has(p.category))catMap.set(p.category,[]);catMap.get(p.category).push(p);});
 let categorizedCards='';
 catMap.forEach((prods,cat)=>{
  categorizedCards+='<div class="shop-category-group"><div class="shop-category-heading">'+safe(cat)+'</div><div class="shop-products-grid">';
  prods.forEach(p=>{const o=offer(s,p);categorizedCards+='<article class="shop-product" data-shop-product data-search="'+safe((p.name+" "+p.category+" "+p.spec).toLowerCase())+'"><img src="'+safe(p.img)+'" loading="lazy" alt="'+safe(p.name)+'"><div class="shop-product-info"><div class="shop-product-category">'+safe(p.category)+'</div><h4>'+safe(p.name)+'</h4><div class="shop-product-spec">'+safe(p.spec)+'</div><div class="shop-price-line"><strong>'+money(o.price)+'</strong><span>/ '+safe(p.unit)+'</span></div><div class="shop-stock">● '+safe(o.stock)+'</div><button class="small-add" type="button" data-add-cart="'+safe(p.id)+'">+ Add to cart</button></div></article>';});
  categorizedCards+='</div></div>';
 });
 const html='<div class="supplier-shop-backdrop" role="dialog" aria-modal="true" aria-label="'+safe(s.name)+' catalogue"><div class="supplier-shop-modal"><div class="shop-modal-head"><div class="shop-brand-icon">'+safe(s.initials||s.name.slice(0,2))+'</div><div class="shop-head-copy"><h2>'+safe(s.name)+'</h2><p>'+safe(s.address)+'<br>'+safe(Array.from(new Set(items.map(p=>p.category))).join(" · "))+'<br>'+m.days+' day estimated delivery · demo service score '+m.score.toFixed(1)+'/5 (simulated)</p></div><div class="shop-head-actions"><a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(s.mapQuery||s.address)+'">Map ↗</a><button class="shop-close" type="button" aria-label="Close shop">×</button></div></div><div class="shop-demo-notice"><b>Prototype shop / simulated catalogue.</b> Prices, product assortment, stock labels and service scores are generated for demonstration. They are not real customer ratings, verified stock, official offers or proof of partnership.</div><div class="shop-catalogue"><div class="shop-catalogue-head"><div><h3>Products listed by this shop</h3><p>'+items.length+' demo products · estimated delivery charge '+money(m.fee)+'</p></div><input class="shop-search" aria-label="Filter products" placeholder="Search this shop..."></div>'+(categorizedCards||'<div class="shop-empty">No products in this demo assortment.</div>')+'<div class="shop-empty shop-no-match" hidden>No products match this search.</div></div>'+renderShopReviews(s.id)+'<div class="shop-footer"><span>Demo score is an assumed BuildAI service score, not a customer rating.</span><a target="_blank" rel="noopener" href="'+safe(s.source||"#")+'">Open public business source ↗</a></div></div></div>';
 document.body.insertAdjacentHTML("beforeend",html);const overlay=document.querySelector(".supplier-shop-backdrop");overlay.querySelector(".shop-close").addEventListener("click",closeShop);overlay.addEventListener("click",e=>{if(e.target===overlay)closeShop();});
 overlay.querySelector(".shop-search").addEventListener("input",e=>{let count=0;const q=e.target.value.toLowerCase();overlay.querySelectorAll("[data-shop-product]").forEach(card=>{const show=card.dataset.search.indexOf(q)>=0;card.hidden=!show;if(show)count++;});overlay.querySelector(".shop-no-match").hidden=count>0;});
 const reviewForm=overlay.querySelector(".shop-review-form");
 if(reviewForm){reviewForm.addEventListener("submit",e=>{e.preventDefault();const name=reviewForm.querySelector(".shop-reviewer-name").value.trim(),rating=Number(reviewForm.querySelector(".shop-reviewer-rating").value),comment=reviewForm.querySelector(".shop-reviewer-comment").value.trim();if(!name||!comment)return;if(!window.buildaiReviews[id])window.buildaiReviews[id]=[];window.buildaiReviews[id].unshift({author:name,rating:rating,comment:comment,date:new Date().toISOString().slice(0,10)});localStorage.setItem('buildai_supplier_reviews',JSON.stringify(window.buildaiReviews));const reviewsSection=overlay.querySelector(".shop-reviews-section");if(reviewsSection)reviewsSection.outerHTML=renderShopReviews(id);if(typeof toast==="function")toast("Review submitted. Thank you!");});}
 document.addEventListener("keydown",handleEscape);
}
function closeShop(){const overlay=document.querySelector(".supplier-shop-backdrop");if(overlay)overlay.remove();document.removeEventListener("keydown",handleEscape);}
function handleEscape(e){if(e.key==="Escape")closeShop();}
function handleAction(e){
 const shop=e.target.closest("[data-open-shop]");if(shop){e.preventDefault();openShop(shop.dataset.openShop);return;}
 const add=e.target.closest("[data-add-cart]");if(add){const id=add.dataset.addCart;if(typeof addCart==="function")addCart(id);if(add.closest(".supplier-shop-backdrop"))closeShop();return;}
 const map=e.target.closest("[data-map-pick]");if(map){if(map.closest("#supplierGrid"))return;const id=map.dataset.mapPick;closeShop();if(typeof loadMap==="function")loadMap(id);const section=$("suppliersSection");if(section)section.scrollIntoView({behavior:"smooth",block:"start"});return;}
}
function updatePhoto(){
 if(typeof finishes==="undefined"||typeof selected==="undefined")return;
 const set=(id,f,opacity)=>{const el=$(id);if(el&&f){el.style.backgroundColor=f.color;el.style.backgroundImage=f.texture;el.style.opacity=opacity;}};
 set("photoWallMask",finishes.wall[selected.wall],".38");set("photoWoodMask",finishes.wood[selected.wood],".65");set("photoFloorMask",finishes.floor[selected.floor],".5");
 const floor=$("photoFloorMask"),f=typeof finishes!=="undefined"&&finishes.floor&&finishes.floor[selected.floor];if(floor&&f)floor.style.backgroundImage=f.texture+",linear-gradient(90deg,#42424225 1px,transparent 1px),linear-gradient(#42424225 1px,transparent 1px)";
 const btn=$("photoPreviewToggle");if(btn)btn.textContent=photoMode?"Return to 3D view":"Photo preview";
}
function togglePhoto(){photoMode=!photoMode;const room=$("roomRender");if(room)room.classList.toggle("photo-mode",photoMode);updatePhoto();}
function enter(target){
  document.body.classList.remove("intro-active");
  const exp = $("exploreApp");
  if(exp) exp.hidden = false;
  const ip = $("introPage");
  if(ip) ip.setAttribute("hidden", "");

  // Update top-left module switcher tabs
  if(target){
    document.querySelectorAll(".top-nav-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.navTarget === target);
    });
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
      const node = $(target);
      if(node) node.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
function showGuide(){$("exploreApp").hidden=true;$("introPage").removeAttribute("hidden");document.body.classList.add("intro-active");window.scrollTo({top:0,behavior:"smooth"});const nav=$("moduleNav");if(nav)nav.hidden=true;}
function init(){
 if(!$("requestItems")||!getProducts().length)return;
 addRow("bb_lvt_001",150);addRow("bb_stn_001",200);addRow("bb_cem_001",50);
 $("startPlanning").addEventListener("click",()=>enter("procurementSection"));$("guideStartPlan").addEventListener("click",()=>enter("procurementSection"));$("enterMarketplace").addEventListener("click",()=>enter("productsSection"));$("startExploring").addEventListener("click",()=>enter("productsSection"));$("returnGuide").addEventListener("click",showGuide);$("headerPlan").addEventListener("click",()=>enter("procurementSection"));
 $("addRequirementRow").addEventListener("click",()=>addRow());$("buildRequestForm").addEventListener("submit",optimize);const pBtn=$("photoPreviewToggle");if(pBtn)pBtn.addEventListener("click",togglePhoto);
  // Top-left module switcher tabs (Browse Material, Material Planner, AI Studio)
  document.querySelectorAll(".top-nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.navTarget;
      enter(target);
    });
  });

  // IntersectionObserver to automatically highlight active module on scroll
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          const id = entry.target.id;
          document.querySelectorAll(".top-nav-btn").forEach(b => {
            b.classList.toggle("active", b.dataset.navTarget === id);
          });
        }
      });
    }, { threshold: [0.25, 0.5] });

    ["productsSection", "procurementSection", "studioSection"].forEach(id => {
      const el = $(id);
      if (el) sectionObserver.observe(el);
    });
  }
  document.addEventListener("click",handleAction);
 $("studioSection").addEventListener("click",e=>{if(e.target.closest("[data-surface]")||e.target.closest("[data-finish]"))setTimeout(updatePhoto,60);});
 $("sceneReset").addEventListener("click",()=>setTimeout(updatePhoto,100));$("resetMaterials").addEventListener("click",()=>setTimeout(updatePhoto,100));updatePhoto();
 // Module navigation
 const moduleNav=$("moduleNav");
 if(moduleNav){
  const sections={marketplace:"productsSection",plan:"procurementSection",suppliers:"suppliersSection",studio:"studioSection"};
  function showModule(mod){
   document.querySelectorAll(".module-tab").forEach(t=>t.classList.toggle("active",t.dataset.module===mod));
   const sidebar=document.querySelector(".sidebar");
   if(sidebar)sidebar.style.display=mod==="marketplace"?"":"none";const layout=document.querySelector(".layout");if(layout)layout.style.gridTemplateColumns=mod==="marketplace"?"":"1fr";
   const targetId=sections[mod];
   if(targetId){const el=$(targetId);if(el)el.scrollIntoView({behavior:"smooth",block:"start"});}
  }
  window.showModule = showModule;
  document.querySelectorAll(".module-tab").forEach(btn=>{btn.addEventListener("click",()=>showModule(btn.dataset.module));});
  const session=JSON.parse(sessionStorage.getItem("buildai_demo_session")||"null");
  if(session&&session.role==="supplier")moduleNav.hidden=true;
 }
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();

/* Separate role/login layer for the local demo. Shared requests are stored in this browser only. */
(function(){
"use strict";
const $=id=>document.getElementById(id);
const STORE_SESSION="buildai_demo_session";
const STORE_REQUESTS="buildai_supplier_requests";
var _builderLiveSyncTimer = null;
var _notifiedFailures = new Set();
const suppliers={
 lakshmi:{id:"lakshmi",name:"Lakshmi Steel Traders",email:"lakshmi@buildai.demo",address:"Rangapuram · Arcot Road"},
 "pandian-ply":{id:"pandian-ply",name:"Pandian Ply / Pandian & Co",email:"pandian@buildai.demo",address:"GPH Road · Krishna Shopping Complex"},
 babu:{id:"babu",name:"Babu Agencies",email:"babu@buildai.demo",address:"Virudampet · Near Palar Bridge"},
 geetha:{id:"geetha",name:"Geetha Timbers",email:"geetha@buildai.demo",address:"Thottapalayam · Katpadi Main Road"},
 "dk-paints":{id:"dk-paints",name:"D.K. Paints & Hardware",email:"dkpaints@buildai.demo",address:"Kamalatchipuram · Arni Road"}
};
let activeRole="builder";
function h(v){return String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function cash(n){return "₹"+Math.round(Number(n)||0).toLocaleString("en-IN");}
function getJson(key,fallback){try{const x=JSON.parse(localStorage.getItem(key)||"null");return x==null?fallback:x;}catch(e){return fallback;}}
function putJson(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true;}catch(e){return false;}}
const DEFAULT_SEED_REQUESTS = [{"id": "BA-20261025091500-LAK1", "groupId": "BA-20261025091500", "supplierId": "lakshmi", "supplierName": "Lakshmi Steel & Structural Traders", "builderEmail": "builder@buildai.demo", "projectName": "Green Valley Villa - Phase 1 Foundation", "deliveryArea": "Katpadi, Vellore, Tamil Nadu", "budget": 250000, "deadlineDays": 2, "priority": "balanced", "createdAt": "2026-10-25T09:15:00.000Z", "items": [{"productId": "bb_tmt_001", "name": "Tata Tiscon 550D Fe TMT Rebars 12mm", "category": "TMT Steel & Reinforcement", "quantity": 1200, "unit": "kg", "indicativeUnitPrice": 68, "indicativeSubtotal": 81600, "specification": "IS 1786 Fe 550D High Ductility structural rebar"}, {"productId": "bb_tmt_004", "name": "Tata Wiron Gi Binding Wire 18 Gauge", "category": "TMT Steel & Reinforcement", "quantity": 25, "unit": "kg", "indicativeUnitPrice": 82, "indicativeSubtotal": 2050, "specification": "High-tensile galvanized annealed binding wire"}, {"productId": "bb_snd_002", "name": "Manufactured M-Sand (Zone II Concreting)", "category": "Sand & Aggregates", "quantity": 400, "unit": "cft", "indicativeUnitPrice": 55, "indicativeSubtotal": 22000, "specification": "VSI double-washed zone II concrete sand"}], "indicativeSubtotal": 105650, "indicativeDeliveryFee": 750, "indicativeTotal": 106400, "status": "Order confirmed", "supplierQuote": 104500, "supplierNote": "Dispatched via Tata 407 Tipper (TN-23-AB-4412). Scheduled arrival at Katpadi site by 3:00 PM.", "updatedAt": "2026-10-25T10:30:00.000Z"}, {"id": "BA-20261025112000-BAB2", "groupId": "BA-20261025112000", "supplierId": "babu", "supplierName": "Babu Agencies Multi-Material Mart", "builderEmail": "builder@buildai.demo", "projectName": "Arcot Road Commercial Complex", "deliveryArea": "Arcot Road, Vellore, Tamil Nadu", "budget": 180000, "deadlineDays": 3, "priority": "speed", "createdAt": "2026-10-25T11:20:00.000Z", "milestone": "Friday 11:00 AM - Foundation Concrete Slab Pouring", "items": [{"productId": "bb_tmt_001", "name": "Tata Tiscon 550D Fe TMT Rebars 12mm", "category": "TMT Steel & Reinforcement", "quantity": 200, "unit": "bars (12m)", "indicativeUnitPrice": 410, "indicativeSubtotal": 82000, "specification": "IS 1786 Fe 550D High Ductility structural rebar (200 bars = 2,400 kg)"}, {"productId": "bb_cem_001", "name": "UltraTech 53 Grade High-Strength OPC Cement", "category": "Cement", "quantity": 100, "unit": "bag", "indicativeUnitPrice": 395, "indicativeSubtotal": 39500, "specification": "IS 269:2015 OPC 53 Grade high early strength structural cement"}], "indicativeSubtotal": 121500, "indicativeDeliveryFee": 650, "indicativeTotal": 122150, "status": "Order confirmed", "supplierQuote": 122150, "supplierNote": "Order confirmed for Friday 10:30 AM delivery at Arcot Road commercial jobsite.", "updatedAt": "2026-10-25T11:25:00.000Z", "failure": null}];
function getRequests(){
  const x = getJson(STORE_REQUESTS, null);
  if (Array.isArray(x) && x.length > 0) return x;
  try { putJson(STORE_REQUESTS, DEFAULT_SEED_REQUESTS); } catch(e){}
  return DEFAULT_SEED_REQUESTS.slice();
}
function getSession(){try{return JSON.parse(sessionStorage.getItem(STORE_SESSION)||"null");}catch(e){return null;}}
function showError(message){const el=$("authError");if(!el)return;el.textContent=message;el.hidden=false;}
function hideError(){const el=$("authError");if(el){el.textContent="";el.hidden=true;}}
function selectedSupplier(){return suppliers[$("authSupplier")?$("authSupplier").value:"babu"]||suppliers.babu;}
function updateDemoCard(){
 const text=$("authDemoText"),email=$("authEmail"),password=$("authPassword"),heading=$("authHeading"),intro=$("authIntro"),picker=$("authSupplierPicker");
 if(activeRole==="builder"){
  if(heading)heading.textContent="Builder sign in";
  if(intro)intro.textContent="Enter the demo credentials to continue to your project workspace.";
  if(picker)picker.hidden=true;
  if(text)text.innerHTML="Builder: builder@buildai.demo<br>Password: BuildAI123";
  if(email)email.placeholder="builder@buildai.demo";
 }else{
  const s=selectedSupplier();
  if(heading)heading.textContent="Supplier sign in";
  if(intro)intro.textContent="Open your shop inbox to review builders' matching material requests.";
  if(picker)picker.hidden=false;
  if(text)text.innerHTML="Shop: "+h(s.name)+"<br>Email: "+h(s.email)+"<br>Password: Supplier123";
  if(email)email.placeholder=s.email;
 }
}
function fillDemoCredentials(){
 const em=$("authEmail"), pw=$("authPassword");
 if(em) em.value = activeRole === "builder" ? "builder@buildai.demo" : selectedSupplier().email;
 if(pw) pw.value = activeRole === "builder" ? "BuildAI123" : "Supplier123";
 hideError();
}
function setRole(role){
 activeRole = role === "supplier" ? "supplier" : "builder";
 document.querySelectorAll("[data-auth-role]").forEach(button => {
  const active = button.dataset.authRole === activeRole;
  button.classList.toggle("active", active);
  button.setAttribute("aria-selected", active ? "true" : "false");
 });
 hideError();
 updateDemoCard();
 const em = $("authEmail"), pw = $("authPassword"), picker = $("authSupplierPicker");
 if(picker) {
   picker.hidden = activeRole === "builder";
   picker.style.display = activeRole === "builder" ? "none" : "block";
 }
 if(em) em.value = activeRole === "builder" ? "builder@buildai.demo" : selectedSupplier().email;
 if(pw) pw.value = activeRole === "builder" ? "BuildAI123" : "Supplier123";
}
function login(e){
 if(e && typeof e.preventDefault === "function") e.preventDefault();
 hideError();

 const emInp = $("authEmail");
 const pwInp = $("authPassword");
 let email = (emInp ? emInp.value : "").trim().toLowerCase();
 let password = (pwInp ? pwInp.value : "").trim();

 if(!email || !password){
   fillDemoCredentials();
   email = (emInp ? emInp.value : "").trim().toLowerCase();
   password = (pwInp ? pwInp.value : "").trim();
 }

 // 1. Direct Builder Match
 if(email === "builder@buildai.demo" || email.includes("builder")){
   loginSuccess({ role: "builder", email: "builder@buildai.demo", name: "Demo Builder", signedInAt: new Date().toISOString() });
   return;
 }

 // 2. Direct Supplier Match by Email
 const allSups = Object.values(suppliers);
 const matchedSupplier = allSups.find(s => s.email.toLowerCase() === email || email.includes(s.id));
 if(matchedSupplier){
   loginSuccess({
     role: "supplier",
     email: matchedSupplier.email,
     name: matchedSupplier.name,
     supplierId: matchedSupplier.id,
     signedInAt: new Date().toISOString()
   });
   return;
 }

 // 3. Active Role Match
 if(activeRole === "supplier"){
   const shop = selectedSupplier();
   loginSuccess({
     role: "supplier",
     email: shop.email,
     name: shop.name,
     supplierId: shop.id,
     signedInAt: new Date().toISOString()
   });
   return;
 } else {
   loginSuccess({ role: "builder", email: "builder@buildai.demo", name: "Demo Builder", signedInAt: new Date().toISOString() });
   return;
 }
}

window.setRole = setRole;
window.fillDemoCredentials = fillDemoCredentials;
window.login = login;
window.logout = logout;
window.getRequests = getRequests;
window.showBuyerRequests = showBuyerRequests;
window.showFailureRecoveryModal = showFailureRecoveryModal;
function onSupplierSelectChange(){
 updateDemoCard();
 const em = $("authEmail"), pw = $("authPassword");
 if(em) em.value = selectedSupplier().email;
 if(pw) pw.value = "Supplier123";
 hideError();
}
window.onSupplierSelectChange = onSupplierSelectChange;

function ensureSupplierWorkspace(){
 let root = $("supplierWorkspace");
 if(root) return root;
 root = document.createElement("section");
 root.id = "supplierWorkspace";
 root.className = "supplier-workspace";
 root.style.display = "none";
 root.innerHTML = '<header class="supplier-workspace-top"><a class="brand" href="#"><span class="brandmark">⌂</span><span>Build<span>AI</span></span></a><div class="supplier-header-actions"><button type="button" id="supplierRefresh">Refresh requests ↻</button><button type="button" class="primary" id="supplierSignOut">Sign out</button></div></header><div class="supplier-workspace-inner"><div class="supplier-welcome-block"><div><div class="eyebrow">SUPPLIER PROCUREMENT INBOX</div><h1 id="supplierDashboardTitle">Your shop dashboard</h1><p id="supplierDashboardSubtitle">Review requirements shared by builders and respond with your offer.</p></div><span class="source-badge">Local prototype</span></div><div class="intro-notice" style="margin-top:0"><b>Demo workspace</b><span>This inbox reads requests saved in the same browser. A supplier using another device will not see them until a shared backend/database is connected.</span></div><div class="supplier-stats" id="supplierStats"></div><div class="supplier-inbox-head"><div><h2>Builder requirements assigned to your shop</h2><p>Only materials matched to your supplier profile appear here.</p></div></div><div class="supplier-request-list" id="supplierRequestList"></div></div>';
 document.body.appendChild(root);
 const refreshBtn = $("supplierRefresh");
 if(refreshBtn) refreshBtn.addEventListener("click", () => renderSupplierDashboard(getSession()));
 const signoutBtn = $("supplierSignOut");
 if(signoutBtn) signoutBtn.addEventListener("click", logout);
 root.addEventListener("click", handleSupplierAction);
 return root;
}

function enterBuilder(session){
 document.body.classList.remove("auth-active", "supplier-mode");
 const app = $("exploreApp"); if(app) app.hidden = false;
 const intro = $("introPage"); if(intro) intro.removeAttribute("hidden");
 document.body.classList.add("intro-active");
 const side = $("supplierWorkspace"); if(side) side.style.display = "none";
 const nav = $("moduleNav"); if(nav) nav.hidden = false;
 addBuilderHeaderActions(session);
 if(typeof startBuilderLiveSync === "function") startBuilderLiveSync();
 window.scrollTo({top: 0, behavior: "smooth"});
}

function addBuilderHeaderActions(session){
 const actions = document.querySelector(".top-actions");
 if(!actions) return;
 
 let recBtn = $("recoveryHeaderBtn");
 if(!recBtn){
   recBtn = document.createElement("button");
   recBtn.id = "recoveryHeaderBtn";
   recBtn.type = "button";
   recBtn.className = "header-link auth-action-button recovery-btn";
   recBtn.innerHTML = '🛡️ <span id="recoveryHeaderLabel">Recovery Engine</span>';
   actions.appendChild(recBtn);
 }
 recBtn.onclick = () => {
   const unresolved = getRequests().find(r => r.failure && !r.failureResolved);
   if(unresolved && typeof showFailureRecoveryModal === "function") showFailureRecoveryModal(unresolved.id);
   else if(typeof toast === "function") toast("No active supplier disruptions reported.");
 };

 let track = $("trackOrdersBtn");
 if(!track){
  track = document.createElement("button");
  track.id = "trackOrdersBtn";
  track.type = "button";
  track.className = "header-link auth-action-button track-orders-btn";
  track.innerHTML = '🚚 <span>Track Orders</span>';
  actions.appendChild(track);
 }
 track.onclick = () => {
   if(typeof showBuyerRequests === "function") showBuyerRequests();
 };

 let out = $("roleSignOut");
 if(!out){
  out = document.createElement("button");
  out.id = "roleSignOut";
  out.type = "button";
  out.className = "header-link auth-action-button signout-btn";
  out.textContent = "Sign out";
  actions.appendChild(out);
 }
 out.onclick = logout;
}

function loginSuccess(session){
 try{sessionStorage.setItem(STORE_SESSION, JSON.stringify(session));}catch(e){}
 hideError();
 const authP = $("authPage");
 if(authP) authP.style.display = "none";
 if(session && session.role === "supplier"){
  document.body.classList.remove("auth-active", "intro-active");
  document.body.classList.add("supplier-mode");
  const nav = $("moduleNav"); if(nav) nav.hidden = true;
  const root = ensureSupplierWorkspace();
  if(root) root.style.display = "block";
  renderSupplierDashboard(session);
 } else {
  enterBuilder(session);
 }
}

window.loginSuccess = loginSuccess;
window.enterBuilder = enterBuilder;
window.ensureSupplierWorkspace = ensureSupplierWorkspace;

function logout(){
 try{sessionStorage.removeItem(STORE_SESSION);localStorage.removeItem(STORE_SESSION);}catch(e){}
 document.body.classList.remove("supplier-mode","intro-active");document.body.classList.add("auth-active","intro-active");
 $("authPage").style.display="block";
 const root=$("supplierWorkspace");if(root)root.style.display="none";
 const app=$("exploreApp");if(app)app.hidden=true;
 const intro=$("introPage");if(intro)intro.setAttribute("hidden","");
 const nav=$("moduleNav");if(nav)nav.hidden=true;
 const my=$("mySupplierRequests");if(my)my.remove();const track=$("trackOrdersBtn");if(track)track.remove();const out=$("roleSignOut");if(out)out.remove();
 const profile=document.querySelector(".profile");if(profile)profile.textContent="Buyer / Contractor⌄";
 document.body.scrollTop=0;window.scrollTo(0,0);
 setRole("builder");$("authPassword").value="BuildAI123";
}
function saveOptimizedRequest(){
 const d=window.__buildaiLastOptimization;
 if(!d||!Array.isArray(d.shops)||!d.shops.length){if(typeof toast==="function")toast("Generate an optimized plan first.");return;}
 const existing=getRequests(),groupId="BA-"+new Date().toISOString().replace(/[-:TZ.]/g,"").slice(0,14)+"-"+Math.random().toString(36).slice(2,6).toUpperCase();
 const session=getSession()||{email:"builder@buildai.demo"};
 const now=new Date().toISOString();
 d.shops.forEach(shop=>{
  const items=shop.allocations.map(a=>({productId:a.product.id,name:a.product.name,category:a.product.category,quantity:a.qty,unit:a.product.unit,indicativeUnitPrice:a.offer.price,indicativeSubtotal:a.subtotal,specification:a.product.spec}));
  const subtotal=items.reduce((n,item)=>n+Number(item.indicativeSubtotal||0),0);
  existing.push({id:groupId+"-"+shop.supplier.id,groupId:groupId,supplierId:normalizeSupplierId(shop.supplier.id),supplierName:shop.supplier.name,builderEmail:session.email,projectName:d.project||"Builder project",deliveryArea:d.area||"Vellore, Tamil Nadu",budget:Number(d.budget||0),deadlineDays:Number(d.deadline||3),priority:d.priority||"balanced",createdAt:now,items:items,indicativeSubtotal:subtotal,indicativeDeliveryFee:shop.fee,indicativeTotal:subtotal+shop.fee,status:"Pending response",supplierQuote:null,supplierNote:"",updatedAt:null});
 });
 if(!putJson(STORE_REQUESTS,existing)){if(typeof toast==="function")toast("Browser storage is unavailable. Request was not saved.");return;}
 try {
  const newReqs = existing.filter(r => r.groupId === groupId);
  fetch("/api/requests", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(newReqs)
  }).catch(()=>{});
 } catch(e){}
 const button=$("sendToSuppliers");if(button){button.textContent="Requirements sent ✓";button.disabled=true;setTimeout(()=>{button.textContent="Send requirements to suppliers →";button.disabled=false;},2200);}
 if(typeof toast==="function")toast("Requirement "+groupId+" saved for "+d.shops.length+" supplier shop(s). Switch to a supplier login to review it.");
}
function statusClass(status){
 if(status==="Order confirmed"||status==="Order Confirmed")return "confirmed";
 if(status==="Out for delivery")return "dispatched";
 if(status==="Delivered")return "delivered";
 if(status==="Quote sent")return "sent";
 if(status==="Unable to supply")return "unavailable";
 if(status==="Under review")return "review";
 return "";
}
function renderOrderTracker(status, updatedAt){
 const steps=[
  {key:"Ordered",label:"Order Placed",desc:"Requirement submitted"},
  {key:"Confirmed",label:"Order Confirmed",desc:"Supplier confirmed order"},
  {key:"Processing",label:"Packed & Processing",desc:"Preparing dispatch"},
  {key:"Dispatched",label:"Out for Delivery",desc:"En route to site"},
  {key:"Delivered",label:"Delivered",desc:"Received at site"}
 ];
 let activeIdx=0;
 if(status==="Order confirmed"||status==="Order Confirmed")activeIdx=1;
 else if(status==="Processing"||status==="Preparing dispatch")activeIdx=2;
 else if(status==="Out for delivery")activeIdx=3;
 else if(status==="Delivered")activeIdx=4;

 let hHtml='<div class="order-tracker-card">';
 hHtml+='<div class="order-tracker-title"><span>🚚 LIVE ORDER TRACKER</span><b>'+h(status)+'</b></div>';
 hHtml+='<div class="order-tracker-stepper">';
 steps.forEach((s,i)=>{
  const isDone=i<=activeIdx;
  const isCurrent=i===activeIdx;
  hHtml+='<div class="tracker-step '+(isDone?"step-done ":"")+(isCurrent?"step-current":"")+'">';
  hHtml+='<div class="step-circle">'+(i<activeIdx?"✓":(i+1))+'</div>';
  hHtml+='<div class="step-label"><b>'+s.label+'</b><small>'+s.desc+'</small></div>';
  hHtml+='</div>';
 });
 hHtml+='</div>';
 if(updatedAt){
  hHtml+='<div class="order-tracker-time">Status updated on: '+h(new Date(updatedAt).toLocaleString())+'</div>';
 }
 hHtml+='</div>';
 return hHtml;
}
function renderSupplierDashboard(session){
 if(!session||session.role!=="supplier")return;
 const s=suppliers[session.supplierId];if(!s)return;
 const root=ensureSupplierWorkspace();root.style.display="block";
 $("supplierDashboardTitle").textContent=s.name;
 $("supplierDashboardSubtitle").textContent=s.address+" · "+(typeof metrics!=="undefined"&&metrics[s.id]?metrics[s.id].tag:"Vellore supplier demo")+" · Signed in as "+session.email;
 const all=getRequests().filter(r=>normalizeSupplierId(r.supplierId)===s.id).sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
const pending=all.filter(r=>!r.status||r.status==="Pending response").length,sent=all.filter(r=>r.status==="Quote sent").length,review=all.filter(r=>r.status==="Under review").length;
 $("supplierStats").innerHTML='<div class="supplier-stat-card"><small>Requests received</small><b>'+all.length+'</b><span>Requirements assigned to this shop</span></div><div class="supplier-stat-card"><small>Awaiting response</small><b>'+pending+'</b><span>Need supplier review</span></div><div class="supplier-stat-card"><small>Quotes sent</small><b>'+sent+'</b><span>Responses shared with builders</span></div><div class="supplier-stat-card"><small>Under review</small><b>'+review+'</b><span>Requests being prepared</span></div>';
 const host=$("supplierRequestList");
 if(!all.length){host.innerHTML='<div class="supplier-empty"><div class="empty-icon">▤</div><h3>No builder requests yet</h3><p>Sign out, log in as the builder, add material requirements, run the optimizer, and choose “Send requirements to suppliers”. Items matched to '+h(s.name)+' will show here.</p></div>';return;}
 host.innerHTML=all.map(r=>{
  const rows=(r.items||[]).map(item=>`<tr><td><b>${h(item.name)}</b><br><small>${h(item.category||"Construction material")}</small></td><td>${h(item.quantity)} ${h(item.unit)}</td><td>${cash(item.indicativeUnitPrice)} / ${h(item.unit)}</td><td>${cash(item.indicativeSubtotal)}</td></tr>`).join("");
  const status=r.status||"Pending response",quote=r.supplierQuote==null?"":String(r.supplierQuote);
  const saved=r.updatedAt?`<div class="supplier-response-note">Latest response saved ${h(new Date(r.updatedAt).toLocaleString())}. Builder view will reflect this status and quote in this same browser.</div>`:"";
  return `
  <article class="supplier-request-card" data-request-card="${h(r.id)}">
    <div class="supplier-request-top">
      <div>
        <h3>${h(r.projectName)} <span style="color:#8793a4;font-size:10px;font-weight:500">· ${h(r.groupId)}</span></h3>
        <p>From builder: ${h(r.builderEmail)}<br>Delivery location: ${h(r.deliveryArea)} · Requested within ${h(r.deadlineDays)} day(s)<br>Received: ${h(new Date(r.createdAt).toLocaleString())}</p>
      </div>
      <span class="request-status ${statusClass(status)}">${h(status)}</span>
    </div>
    <div class="supplier-request-body">
      <div class="supplier-request-meta">
        <div><span>Builder budget</span><b>${cash(r.budget)}</b></div>
        <div><span>Materials requested</span><b>${(r.items||[]).length} line(s)</b></div>
        <div><span>Indicative materials total</span><b>${cash(r.indicativeSubtotal)}</b></div>
        <div><span>Demo delivery fee</span><b>${cash(r.indicativeDeliveryFee)}</b></div>
      </div>
      <div style="overflow-x:auto">
        <table class="supplier-items-table">
          <thead>
            <tr><th>Requested material</th><th>Quantity</th><th>Demo reference price</th><th>Reference subtotal</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <p style="font-size:9px;color:#8491a1;line-height:1.7">Builder preference: ${h(({balanced:"Balanced value",cost:"Lowest cost",quality:"Service score",speed:"Delivery speed"})[r.priority]||r.priority)}. Reference prices are synthetic; submit a demo response below.</p>
      <form class="supplier-reply-form">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <h4 style="margin:0;">Respond / Update Fulfillment Status</h4>
          <button type="button" class="secondary" style="font-size:11px;border-color:#ea580c;color:#c2410c;font-weight:800;padding:4px 10px;" onclick="const s = this.closest('form').querySelector('[name=supplier-status]'); s.value='Unable to supply'; s.dispatchEvent(new Event('change'));">
            🚨 Report Stockout / Fulfillment Failure
          </button>
        </div>
        <div class="supplier-reply-grid">
          <div class="supplier-reply-field">
            <label>Response status</label>
            <select name="supplier-status" onchange="const f = this.closest('form').querySelector('.supplier-failure-fields'); if(f) f.style.display = (this.value==='Unable to supply' ? 'block' : 'none');">
              <option ${status==="Pending response"?"selected":""} value="Pending response">Pending response</option>
              <option ${status==="Under review"?"selected":""} value="Under review">Under review</option>
              <option ${status==="Quote sent"?"selected":""} value="Quote sent">Quote sent</option>
              <option ${status==="Order confirmed"||status==="Order Confirmed"?"selected":""} value="Order confirmed">Order confirmed</option>
              <option ${status==="Out for delivery"?"selected":""} value="Out for delivery">Out for delivery</option>
              <option ${status==="Delivered"?"selected":""} value="Delivered">Delivered</option>
              <option ${status==="Unable to supply"||(r.failure&&!r.failureResolved)?"selected":""} value="Unable to supply" style="color:#c2410c;font-weight:bold;">🚨 Unable to supply / Report Failure</option>
            </select>
          </div>
          <div class="supplier-reply-field">
            <label>Your total quote (₹)</label>
            <input type="number" name="supplier-quote" min="0" step="1" placeholder="Enter actual/demo amount" value="${h(quote)}">
          </div>
          <div class="supplier-reply-field">
            <label>Note for builder</label>
            <textarea name="supplier-note" maxlength="300" placeholder="Availability, brands, delivery terms...">${h(r.supplierNote||"")}</textarea>
          </div>
        </div>

        <div class="supplier-failure-fields" style="display:${status==="Unable to supply"||(r.failure&&!r.failureResolved)?"block":"none"};margin-top:14px;background:#fff7ed;border:1.5px solid #fdba74;border-radius:12px;padding:14px 16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <b style="color:#9a3412;font-size:12.5px;display:flex;align-items:center;gap:6px;">🚨 Structured Failure Report (Only Suppliers Can Initiate)</b>
            <span style="font-size:10px;font-weight:800;background:#ffedd5;color:#c2410c;border:1px solid #fdba74;padding:3px 8px;border-radius:4px;text-transform:uppercase;">Triggers BuildAI Recovery Engine</span>
          </div>
          <p style="font-size:11.5px;color:#7c2d12;margin:0 0 10px;line-height:1.45;">Submitting this failure will alert the builder in real time and automatically calculate alternative regional suppliers to protect their project milestone.</p>
          
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:10px;">
            <div>
              <label style="font-size:11px;font-weight:800;color:#9a3412;display:block;margin-bottom:4px;">Failure Type</label>
              <select name="supplier-failure-type" style="width:100%;font-size:12px;font-weight:700;padding:7px 10px;border-radius:8px;border:1px solid #fdba74;background:#fff;color:#9a3412;">
                <option value="stockout" ${((r.failure&&r.failure.type==="stockout")||!r.failure)?"selected":""}>Stockout (Warehouse depleted / Mill deficit)</option>
                <option value="delay" ${(r.failure&&(r.failure.type==="delay"||r.failure.type==="transit_delay"))?"selected":""}>Severe Transit Delay (Highway/Fleet breakdown)</option>
                <option value="shortfall" ${(r.failure&&(r.failure.type==="shortfall"||r.failure.type==="quantity_shortfall"))?"selected":""}>Partial Quantity Shortfall (Cannot supply full batch)</option>
                <option value="cancelled" ${(r.failure&&r.failure.type==="cancelled")?"selected":""}>Emergency Order Cancellation (Facility maintenance)</option>
              </select>
            </div>
            <div>
              <label style="font-size:11px;font-weight:800;color:#9a3412;display:block;margin-bottom:4px;">Quantity Shortfall</label>
              <input type="number" name="supplier-failure-shortfall" min="1" placeholder="e.g. 200" value="${((r.failure&&r.failure.shortfallQty)||200)}" style="width:100%;font-size:12px;font-weight:700;padding:7px 10px;border-radius:8px;border:1px solid #fdba74;background:#fff;">
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:10px;">
            <div>
              <label style="font-size:11px;font-weight:800;color:#9a3412;display:block;margin-bottom:4px;">Expected Delay (Days)</label>
              <input type="number" name="supplier-failure-delay" min="1" max="30" placeholder="e.g. 4" value="${((r.failure&&r.failure.delayDays)||4)}" style="width:100%;font-size:12px;font-weight:700;padding:7px 10px;border-radius:8px;border:1px solid #fdba74;background:#fff;">
            </div>
            <div>
              <label style="font-size:11px;font-weight:800;color:#9a3412;display:block;margin-bottom:4px;">Target Critical Milestone</label>
              <input type="text" name="supplier-failure-milestone" value="${h((r.failure&&r.failure.milestone)||r.milestone||"Friday 11:00 AM - Foundation Concrete Slab Pouring")}" style="width:100%;font-size:12px;font-weight:600;padding:7px 10px;border-radius:8px;border:1px solid #fdba74;background:#fff;">
            </div>
          </div>

          <div>
            <label style="font-size:11px;font-weight:800;color:#9a3412;display:block;margin-bottom:4px;">Disruption Reason / Explanation for Builder</label>
            <textarea name="supplier-failure-reason" rows="2" style="width:100%;font-size:12px;padding:7px 10px;border-radius:8px;border:1px solid #fdba74;background:#fff;line-height:1.4;" placeholder="Describe mill deficit, fleet breakdown, or allocation constraints...">${h((r.failure&&r.failure.reason)||"Primary supplier out of stock on 200 units of Fe 550D TMT Rebar due to regional mill allocation deficit. Deliveries delayed by 4 days to next Tuesday.")}</textarea>
          </div>
        </div>

        <div style="margin-top:12px;display:flex;justify-content:flex-end;gap:8px;align-items:center;flex-wrap:wrap;">

          <button type="button" class="primary" data-save-response="${h(r.id)}" style="padding:10px 22px;font-size:13px;font-weight:800;">
            Save Response &amp; Synchronize via API →
          </button>
        </div>
      </form>
      ${saved}
    </div>
  </article>`;
 }).join("");
}
async function handleSupplierAction(e){
  const b = e.target.closest("[data-save-response]");
  if(!b) return;
  const card = b.closest("[data-request-card]");
  const id = b.dataset.saveResponse;
  const form = card.querySelector(".supplier-reply-form");
  const status = form.querySelector('[name="supplier-status"]').value;
  const quoteStr = form.querySelector('[name="supplier-quote"]').value.trim();
  const note = form.querySelector('[name="supplier-note"]').value.trim();

  if(quoteStr !== "" && (!Number.isFinite(Number(quoteStr)) || Number(quoteStr) < 0)){
    alert("Enter a valid quote amount.");
    return;
  }
  const session = getSession();
  if(!session || session.role !== "supplier") return;
  const records = getRequests();
  const at = records.findIndex(r => r.id === id && normalizeSupplierId(r.supplierId) === session.supplierId);
  if(at < 0){
    alert("This request was not found in local storage. Refresh and try again.");
    return;
  }

  // Read structured failure fields if supplier is reporting unable to supply
  const failTypeEl = form.querySelector('[name="supplier-failure-type"]');
  const failShortfallEl = form.querySelector('[name="supplier-failure-shortfall"]');
  const failDelayEl = form.querySelector('[name="supplier-failure-delay"]');
  const failMilestoneEl = form.querySelector('[name="supplier-failure-milestone"]');
  const failReasonEl = form.querySelector('[name="supplier-failure-reason"]');

  const failureType = failTypeEl ? failTypeEl.value : "stockout";
  const shortfallQty = failShortfallEl ? (Number(failShortfallEl.value) || 200) : 200;
  const delayDays = failDelayEl ? (Number(failDelayEl.value) || 4) : 4;
  const milestone = failMilestoneEl ? failMilestoneEl.value.trim() : "Friday 11:00 AM - Foundation Concrete Slab Pouring";
  const failureReason = failReasonEl ? failReasonEl.value.trim() : "";

  records[at].status = status;
  records[at].supplierQuote = quoteStr === "" ? null : Number(quoteStr);
  records[at].supplierNote = note;
  records[at].updatedAt = new Date().toISOString();

  if(status === "Unable to supply" || status.includes("failure")){
    const failureTypeTitles = {
      stockout: "Supplier Stockout on " + shortfallQty + " Units",
      delay: "Severe Transit Delay (" + delayDays + "-Day Postponement)",
      shortfall: "Partial Quantity Shortfall (" + shortfallQty + "-Unit Deficit)",
      cancelled: "Supplier Order Cancellation"
    };

    records[at].failure = {
      type: failureType,
      title: failureTypeTitles[failureType] || ("Supplier Disruption: " + failureType),
      reason: failureReason || note || (records[at].supplierName + " reported unable to supply on time."),
      reportedAt: new Date().toISOString(),
      reportedBy: records[at].supplierName + " Logistics Desk",
      shortfallQty: shortfallQty,
      delayDays: delayDays,
      milestone: milestone || "Friday 11:00 AM - Foundation Concrete Slab Pouring",
      severity: "CRITICAL",
      penaltyRisk: "₹25,000/day idle transit mixer & pump crew penalty"
    };
    records[at].status = "Supplier failure reported - Recovery plan generated";
    records[at].failureResolved = false;
  } else {
    if(status === "Order confirmed" || status === "Quote sent"){
      records[at].failure = null;
      records[at].failureResolved = true;
    }
  }

  // Always persist locally first so workflow is never blocked
  putJson(STORE_REQUESTS, records);

  // Persist to Server API with automatic fallback
  b.disabled = true;
  b.textContent = "Synchronizing with API...";
  try {
    let res = await fetch("/api/requests/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(records[at])
    });

    // If order was missing on server, auto-create it via /api/requests
    if(!res.ok && res.status === 404){
      res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([records[at]])
      });
    }

    if(res.ok){
      const data = await res.json().catch(()=>({}));
      if(data && data.request) {
        records[at] = data.request;
        putJson(STORE_REQUESTS, records);
      }
      if(status === "Unable to supply" || records[at].failure){
        if(typeof toast === "function") toast("🚨 Disruption registered (" + records[at].failure.type.toUpperCase() + "). Builder alert triggered.");
      } else if(status === "Order confirmed" || status === "Order Confirmed"){
        if(typeof toast === "function") toast("✓ Order confirmed! Sourcing commitment synchronized.");
      } else {
        if(typeof toast === "function") toast("Response saved and synchronized with server ✓");
      }
    } else {
      // Graceful fallback when API returned non-200
      if(status === "Unable to supply" || records[at].failure){
        if(typeof toast === "function") toast("🚨 Disruption saved to workspace (" + records[at].failure.type.toUpperCase() + ").");
      } else if(status === "Order confirmed" || status === "Order Confirmed"){
        if(typeof toast === "function") toast("✓ Order confirmed in workspace!");
      } else {
        if(typeof toast === "function") toast("Response saved in workspace ✓");
      }
    }
    renderSupplierDashboard(session);
  } catch(err){
    console.warn("API offline or network error, persisted locally:", err);
    if(status === "Unable to supply" || records[at].failure){
      if(typeof toast === "function") toast("🚨 Disruption registered locally (" + records[at].failure.type.toUpperCase() + ").");
    } else if(status === "Order confirmed" || status === "Order Confirmed"){
      if(typeof toast === "function") toast("✓ Order confirmed locally!");
    } else {
      if(typeof toast === "function") toast("Response saved locally ✓");
    }
    renderSupplierDashboard(session);
  }
}
function showBuyerRequests(){
  const session = getSession() || { email: "builder@buildai.demo", role: "builder" };
  const old = $("buyerRequestModal");
  if(old) old.remove();
  
  const rows = getRequests().filter(r => (!r.builderEmail || !session || r.builderEmail === session.email) ).sort((a,b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  
  // Check for active failure requiring recovery
  const pendingFailure = rows.find(r => r.failure && !r.failureResolved);
  let topAlertHtml = '';
  if(pendingFailure){
    topAlertHtml = `
      <div class="buyer-failure-alert-card">
        <div class="buyer-failure-alert-info">
          <span style="font-size:32px;">⚡</span>
          <div>
            <span class="recovery-badge-pill" style="margin-bottom:4px;">SIGNATURE ENGINE ACTIVE</span>
            <h4>Supplier Disruption: ${h(pendingFailure.failure.title || 'Supplier Failure Reported')}</h4>
            <p>${h(pendingFailure.failure.reason)}</p>
            <div style="font-size:11.5px;color:#9a3412;font-weight:700;">
              ✓ Alternative Identified: <b>Lakshmi Steel &amp; Structural Traders</b> · Arrives Thursday · Friday Milestone Protected
            </div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end;">
          <button type="button" class="recovery-trigger-btn" onclick="showFailureRecoveryModal('${pendingFailure.id}')">
            ⚡ Review Revised Plan &amp; Authorize Substitution →
          </button>
          <small style="color:#7c2d12;font-size:10.5px;font-weight:700;">🔒 Requires buyer approval</small>
        </div>
      </div>
    `;
  }

  const body = rows.length ? rows.map(r => {
    const isConfirmed = ["Order confirmed", "Order Confirmed", "Processing", "Preparing dispatch", "Out for delivery", "Delivered", "Order confirmed (Substituted via Recovery Engine)"].includes(r.status);
    const hasActiveFailure = r.failure && !r.failureResolved;
    const isSubstituted = r.failureResolved || (r.status && r.status.includes("Substituted"));
    
    const responseClass = hasActiveFailure 
      ? "buyer-supplier-response" 
      : (isConfirmed ? "buyer-supplier-response buyer-response-confirmed" : (r.status === "Quote sent" ? "buyer-supplier-response buyer-response-good" : "buyer-supplier-response"));
    
    const trackerHtml = isConfirmed ? renderOrderTracker(r.status, r.updatedAt) : "";
    const canInvoice = isConfirmed && !hasActiveFailure;
    const isDelivered = r.status === "Delivered";
    const invoiceBtnHtml = canInvoice ? `<button type="button" class="secondary invoice-action-btn" onclick="showTaxInvoice('${r.id}')">🧾 View GST Tax Invoice &amp; Receipt</button>` : '';
    
    const markDeliveredBtnHtml = (isConfirmed && !isDelivered && !hasActiveFailure) ? `
      <button type="button" class="secondary mark-delivered-btn" onclick="window.markOrderDelivered('${r.id}')" style="padding:8px 14px;font-size:11.5px;font-weight:600;border:1px solid #cbd5e1;background:#f8fafc;color:#334155;border-radius:8px;cursor:pointer;">
        ✓ Mark Delivered (Demo)
      </button>
    ` : '';
    
    let failureActionHtml = '';
    if(hasActiveFailure){
      failureActionHtml = `
        <div style="margin-top:12px;background:#fef2f2;border:1.5px solid #fca5a5;border-radius:12px;padding:14px;box-shadow:0 2px 8px rgba(239,68,68,0.06);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <b style="color:#991b1b;font-size:12.5px;display:flex;align-items:center;gap:6px;">🚨 ${h(r.failure.title || 'SUPPLIER DISRUPTION REPORTED')}</b>
            <span style="font-size:10px;font-weight:800;color:#991b1b;background:#fee2e2;border:1px solid #fca5a5;padding:3px 8px;border-radius:4px;text-transform:uppercase;">REVISED PLAN READY</span>
          </div>
          <p style="font-size:12px;color:#7f1d1d;margin:0 0 10px;line-height:1.45;font-weight:600;">${h(r.failure.reason)}</p>
          <button type="button" class="recovery-trigger-btn" style="width:100%;text-align:center;padding:11px 16px;font-size:13.5px;" onclick="showFailureRecoveryModal('${r.id}')">
            ⚡ Open Failure Recovery Engine · Compare Original vs Revised Plan →
          </button>
        </div>
      `;
    } else if(isSubstituted){
      failureActionHtml = `
        <div style="margin-top:12px;background:#f0fdf4;border:1.5px solid #86efac;border-radius:12px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
          <div>
            <b style="color:#15803d;font-size:12px;display:flex;align-items:center;gap:6px;">✓ Recovery Engine Plan Authorized &amp; Active</b>
            <small style="display:block;color:#166534;font-size:11px;font-weight:600;margin-top:2px;">Substituted to ${h(r.supplierName)} · Critical milestone pouring deadline secured</small>
          </div>
          <button type="button" class="secondary" style="font-size:11px;padding:5px 12px;font-weight:700;" onclick="showFailureRecoveryModal('${r.id}')">
            📋 View Recovery Audit
          </button>
        </div>
      `;
    }

    const testSimulationHtml = (invoiceBtnHtml || markDeliveredBtnHtml) ? `
      <div style="margin-top:10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        ${invoiceBtnHtml}
        
        ${markDeliveredBtnHtml}
      </div>
    ` : '';

    return `
      <article class="buyer-request-card" data-order-id="${r.id}" style="position:relative;${hasActiveFailure ? 'border: 2px solid #fca5a5;' : ''}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
          <div>
            <h3>${h(r.projectName)} · ${h(r.groupId)}</h3>
            <p style="margin:4px 0 8px;">
              <b>Primary Supplier:</b> ${h(r.supplierName)}<br>
              <b>Materials:</b> ${(r.items||[]).map(i=>h(i.name)+" × "+i.quantity+" "+h(i.unit)).join(", ")}<br>
              <b>Total Amount (incl. delivery):</b> <span style="font-weight:800;color:${isConfirmed?'#15803d':'#0f172a'}">${cash(r.indicativeTotal)}</span><br>
              <small style="color:#64748b;">Created: ${h(new Date(r.createdAt).toLocaleString())}</small>
            </p>
          </div>
          ${hasActiveFailure ? '<span style="background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;font-size:10px;font-weight:800;padding:4px 8px;border-radius:6px;text-transform:uppercase;">Failure Flagged</span>' : ''}
        </div>

        <div class="${responseClass}">
          <b>Status: ${h(r.status || "Pending response")}</b><br>
          ${r.supplierQuote != null ? "Supplier quote: " + cash(r.supplierQuote) + "<br>" : "No quote amount entered yet.<br>"}
          ${r.supplierNote ? "Supplier note: " + h(r.supplierNote) + "<br>" : ""}
          ${r.updatedAt ? "Last updated: " + h(new Date(r.updatedAt).toLocaleString()) : "Awaiting supplier response."}
        </div>

        ${trackerHtml}
        ${failureActionHtml}
        ${testSimulationHtml}
      </article>
    `;
  }).join("") : '<div class="supplier-empty"><div class="empty-icon">▤</div><h3>No orders or sourcing requests yet</h3><p>Place an order or send requirements from the Marketplace / Material Plan. Once submitted and confirmed by a supplier, you can track them here.</p></div>';

  const modal = document.createElement("div");
  modal.id = "buyerRequestModal";
  modal.className = "buyer-request-modal";
  modal.innerHTML = `
    <div class="buyer-request-dialog" role="dialog" aria-modal="true" aria-label="My orders and supplier requests">
      <div class="buyer-request-dialog-head">
        <div>
          <h2>Orders &amp; Sourcing Requests</h2>
          <small style="display:block;color:#7d899a;font-size:10px;margin-top:5px">${rows.length} order record(s) · BuildAI Autonomous Recovery Engine Active</small>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          
          <button type="button" class="buyer-close-btn" aria-label="Close requests" style="background:transparent;border:none;font-size:22px;cursor:pointer;color:#64748b;padding:0 6px;">×</button>
        </div>
      </div>
      <div class="buyer-request-list">
        ${topAlertHtml}
        ${body}
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  const closeBtn = modal.querySelector(".buyer-close-btn") || modal.querySelector(".buyer-request-dialog-head button");
  if(closeBtn) closeBtn.addEventListener("click", () => modal.remove());
  modal.addEventListener("click", e => { if(e.target === modal) modal.remove(); });
  updateRecoveryHeaderBadge();
}
function initAuth(){
 try{localStorage.removeItem("buildai_demo_session");}catch(e){}
 if(!$("authLoginForm"))return;
 document.querySelectorAll("[data-auth-role]").forEach(b=>b.addEventListener("click",()=>setRole(b.dataset.authRole)));
 $("authSupplier").addEventListener("change",()=>{if(activeRole==="supplier"){updateDemoCard();$("authEmail").value=selectedSupplier().email;$("authPassword").value="Supplier123";hideError();}});
 $("fillDemoCredentials").addEventListener("click", fillDemoCredentials);
 $("toggleAuthPassword").addEventListener("click",()=>{const f=$("authPassword"),show=f.type==="password";f.type=show?"text":"password";$("toggleAuthPassword").textContent=show?"◌":"◉";$("toggleAuthPassword").setAttribute("aria-label",show?"Hide password":"Show password");});
 $("authLoginForm").addEventListener("submit",login);
 setRole("builder");
 const session=getSession();
 if(session&&session.role==="supplier"&&suppliers[session.supplierId])loginSuccess(session);
 else if(session&&session.role==="builder")loginSuccess(session);
 else {document.body.classList.add("auth-active");$("authPage").style.display="block";}
 const intro=$("introPage");
 if(intro&&$("exploreApp"))$("exploreApp").hidden=false;
 document.addEventListener("click",e=>{if(e.target.closest("#sendToSuppliers"))saveOptimizedRequest();});
}

// ==========================================
// BUILDAI ADVANCED REAL-WORLD PROCUREMENT & WORKFLOWS
// ==========================================

// 1. Live Server API Synchronization
function syncRequestsWithServer(){
  fetch("/api/requests").then(r=>r.json()).then(d=>{
    if(d && Array.isArray(d.requests) && d.requests.length){
      const local = getRequests();
      const idMap = new Map();
      d.requests.forEach(r => idMap.set(r.id, r));
      local.forEach(r => {
        const serverVer = idMap.get(r.id);
        if(!serverVer) {
          idMap.set(r.id, r);
        } else if(r.updatedAt && (!serverVer.updatedAt || r.updatedAt > serverVer.updatedAt)) {
          idMap.set(r.id, r);
        }
      });
      putJson(STORE_REQUESTS, Array.from(idMap.values()));
      if(typeof updateRecoveryHeaderBadge === "function") updateRecoveryHeaderBadge();
    }
  }).catch(()=>{});
}
syncRequestsWithServer();

// 2. Alternative Supplier Recommendation & Auto-Rerouting
function getAlternativeSupplier(currentSupId, items){
  const supKeys = ["lakshmi", "pandian-ply", "babu", "geetha", "dk-paints"].filter(id => id !== currentSupId);
  const metricData = typeof metrics !== "undefined" ? metrics : {};
  const supData = typeof suppliers !== "undefined" ? suppliers : {};
  
  // Find supplier with highest score that can fulfill materials
  let best = null;
  let bestScore = -1;
  supKeys.forEach(sid => {
    const s = supData[sid];
    const m = metricData[sid] || { score: 4.0, days: 2, fee: 550 };
    if(!s) return;
    const score = m.score;
    if(score > bestScore){
      bestScore = score;
      best = {
        id: sid,
        name: s.name,
        address: s.address,
        score: m.score,
        days: m.days,
        fee: m.fee,
        tag: m.tag
      };
    }
  });
  return best || { id: "lakshmi", name: "Lakshmi Steel & Structural Traders", days: 2, fee: 550, score: 4.5 };
}

function rerouteOrder(orderId, newSupplierId){
  const records = getRequests();
  const at = records.findIndex(r => r.id === orderId);
  if(at < 0){
    if(typeof toast === "function") toast("Order not found.");
    return;
  }
  const sData = suppliers[newSupplierId] || suppliers["lakshmi"];
  const mData = (typeof metrics !== "undefined" && metrics[newSupplierId]) || { fee: 550, days: 2 };
  
  records[at].supplierId = newSupplierId;
  records[at].supplierName = sData.name;
  records[at].status = "Pending response (Re-routed)";
  records[at].indicativeDeliveryFee = mData.fee;
  records[at].indicativeTotal = Number(records[at].indicativeSubtotal || 0) + mData.fee;
  records[at].updatedAt = new Date().toISOString();
  records[at].supplierNote = "Re-routed from unavailable supplier. Awaiting confirmation.";
  
  putJson(STORE_REQUESTS, records);
  
  // Also push to server API
  try {
    fetch("/api/requests/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(records[at])
    }).catch(()=>{});
  } catch(e){}
  
  if(typeof toast === "function") toast("Order successfully re-routed to " + sData.name + "!");
  showBuyerRequests();
}

// 3. GST Tax Invoice Generator
function showTaxInvoice(orderId){
  const records = getRequests();
  const r = records.find(x => x.id === orderId);
  if(!r) return;
  
  const subtotal = Number(r.indicativeSubtotal || 0);
  const freight = Number(r.indicativeDeliveryFee || 500);
  const taxable = subtotal;
  const cgst = Math.round(taxable * 0.09);
  const sgst = Math.round(taxable * 0.09);
  const grandTotal = taxable + cgst + sgst + freight;
  
  const itemRows = (r.items || []).map((it, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><b>${h(it.name)}</b><br><small style="color:#64748b">${h(it.category || 'Construction material')}</small></td>
      <td>HSN-6810</td>
      <td>${h(it.quantity)} ${h(it.unit)}</td>
      <td>${cash(it.indicativeUnitPrice)}</td>
      <td><b>${cash(it.indicativeSubtotal)}</b></td>
    </tr>
  `).join("");
  
  const oldInv = $("taxInvoiceModal");
  if(oldInv) oldInv.remove();
  
  const invModal = document.createElement("div");
  invModal.id = "taxInvoiceModal";
  invModal.className = "buyer-request-modal invoice-backdrop";
  invModal.innerHTML = `
    <div class="buyer-request-dialog invoice-dialog" role="dialog" aria-modal="true">
      <div class="invoice-actions-top no-print">
        <button type="button" class="primary print-btn" onclick="if(window.triggerInvoicePrint){window.triggerInvoicePrint(document.getElementById('printableInvoice'),'BuildAI GST Tax Invoice')}else{window.print()}">🖨️ Print / Download PDF Invoice</button>
        <button type="button" class="invoice-close-btn" onclick="document.getElementById('taxInvoiceModal').remove()">×</button>
      </div>
      <div class="tax-invoice-sheet" id="printableInvoice">
        <div class="invoice-header">
          <div>
            <div class="invoice-brand">Build<span>AI</span> · B2B TAX INVOICE</div>
            <div class="invoice-meta-sub">Original for Recipient · Commercial Order Document</div>
          </div>
          <div class="invoice-number-box">
            <b>INVOICE NO:</b> INV-2026-${h(r.id.slice(-6))}<br>
            <b>DATE:</b> ${new Date(r.createdAt).toLocaleDateString('en-IN')}<br>
            <b>STATUS:</b> <span class="invoice-paid-badge">CONFIRMED / PAID</span>
          </div>
        </div>
        
        <div class="invoice-parties-grid">
          <div class="invoice-party">
            <small>SUPPLIER DETAILS (ISSUED BY):</small>
            <h4>${h(r.supplierName)}</h4>
            <p>Vellore Construction Hub, Tamil Nadu<br>
            <b>GSTIN:</b> 33AAACL${h(r.supplierId.slice(0,4)).toUpperCase()}1234F1Z5<br>
            <b>PAN:</b> AAACL${h(r.supplierId.slice(0,4)).toUpperCase()}123</p>
          </div>
          <div class="invoice-party">
            <small>BILLED TO / SITE DELIVERY TO:</small>
            <h4>Demo Builder / Contractor</h4>
            <p>Project: ${h(r.projectName)}<br>
            Site Address: ${h(r.deliveryArea)}<br>
            Contact: ${h(r.builderEmail)}</p>
          </div>
        </div>
        
        <table class="invoice-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item & Material Specification</th>
              <th>HSN Code</th>
              <th>Qty</th>
              <th>Rate (₹)</th>
              <th>Taxable Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>
        
        <div class="invoice-totals-wrapper">
          <div class="invoice-seal-area">
            <div class="invoice-qr-box">
              <div class="qr-mock">QR<br>CODE</div>
              <small>Digitally verified by BuildAI Platform Engine<br>Tamil Nadu Commercial Tax Compliant</small>
            </div>
          </div>
          <div class="invoice-totals-table">
            <div class="inv-tot-row"><span>Total Taxable Value:</span><b>${cash(taxable)}</b></div>
            <div class="inv-tot-row"><span>CGST (9.0%):</span><b>${cash(cgst)}</b></div>
            <div class="inv-tot-row"><span>SGST (9.0%):</span><b>${cash(sgst)}</b></div>
            <div class="inv-tot-row"><span>Logistics & Freight Transport:</span><b>${cash(freight)}</b></div>
            <div class="inv-tot-row grand-total"><span>Grand Total (INR):</span><b>${cash(grandTotal)}</b></div>
          </div>
        </div>
        
        <div class="invoice-footer-note">
          <p><b>Declaration:</b> This is an electronically generated commercial tax invoice for demonstration and procurement tracking. Goods once dispatched are covered under standard manufacturer guarantee.</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(invModal);
  invModal.addEventListener("click", e => { if(e.target === invModal) invModal.remove(); });
}

// 4. Construction Material Quantity Calculator
function showMaterialCalculator(){
  const old = $("materialCalculatorModal");
  if(old) old.remove();
  
  const modal = document.createElement("div");
  modal.id = "materialCalculatorModal";
  modal.className = "buyer-request-modal calc-modal-backdrop";
  modal.innerHTML = `
    <div class="buyer-request-dialog calc-dialog" role="dialog" aria-modal="true" aria-label="BuildAI Construction Material Calculator">
      <div class="buyer-request-dialog-head">
        <div>
          <h2>🧮 Construction Material Quantity Calculator</h2>
          <small style="color:#64748b;font-size:11px">Engineering estimations for slabs, masonry walls, plastering and paints</small>
        </div>
        <button type="button" class="shop-close" onclick="document.getElementById('materialCalculatorModal').remove()">×</button>
      </div>
      
      <div class="calc-tabs">
        <button type="button" class="calc-tab active" data-calc="concrete">Concrete Slab & RCC</button>
        <button type="button" class="calc-tab" data-calc="brick">Brickwork & Walls</button>
        <button type="button" class="calc-tab" data-calc="plaster">Wall Plastering</button>
        <button type="button" class="calc-tab" data-calc="paint">Wall Paint Coverage</button>
      </div>
      
      <div class="calc-content-body">
        <!-- Concrete Slab Panel -->
        <div id="calcPanelConcrete" class="calc-panel active">
          <div class="calc-grid">
            <div class="field"><label>Slab Length (feet)</label><input id="concLength" type="number" min="1" value="30"></div>
            <div class="field"><label>Slab Width (feet)</label><input id="concWidth" type="number" min="1" value="20"></div>
            <div class="field"><label>Slab Thickness (inches)</label><input id="concThick" type="number" min="1" step="0.5" value="5"></div>
            <div class="field"><label>Concrete Grade Mix</label><select id="concMix"><option value="M20">M20 (1 : 1.5 : 3 - Standard Slabs)</option><option value="M25">M25 (1 : 1 : 2 - Heavy Columns)</option></select></div>
          </div>
          <div class="calc-results-box" id="concResults"></div>
          <button type="button" class="primary full" id="addConcreteToPlan">➕ Add Calculated Materials to Procurement Plan →</button>
        </div>
        
        <!-- Brickwork Panel -->
        <div id="calcPanelBrick" class="calc-panel" hidden>
          <div class="calc-grid">
            <div class="field"><label>Wall Length (feet)</label><input id="brickLength" type="number" min="1" value="40"></div>
            <div class="field"><label>Wall Height (feet)</label><input id="brickHeight" type="number" min="1" value="10"></div>
            <div class="field"><label>Wall Thickness</label><select id="brickThick"><option value="9">9 inch (Main External Wall)</option><option value="4.5">4.5 inch (Internal Partition Wall)</option></select></div>
            <div class="field"><label>Masonry Material Type</label><select id="brickType"><option value="red">Standard Red Clay Kiln Bricks</option><option value="aac">AAC Lightweight Blocks (6 inch)</option><option value="solid">Solid Concrete Blocks</option></select></div>
          </div>
          <div class="calc-results-box" id="brickResults"></div>
          <button type="button" class="primary full" id="addBrickToPlan">➕ Add Brickwork Materials to Procurement Plan →</button>
        </div>
        
        <!-- Plastering Panel -->
        <div id="calcPanelPlaster" class="calc-panel" hidden>
          <div class="calc-grid">
            <div class="field"><label>Total Wall Surface Area (sq ft)</label><input id="plasterArea" type="number" min="10" value="800"></div>
            <div class="field"><label>Plastering Location</label><select id="plasterType"><option value="internal">Internal Wall Plaster (12mm, 1:4)</option><option value="external">External Weather Plaster (18mm, 1:4 with Waterproofing)</option></select></div>
          </div>
          <div class="calc-results-box" id="plasterResults"></div>
          <button type="button" class="primary full" id="addPlasterToPlan">➕ Add Plaster Materials to Procurement Plan →</button>
        </div>
        
        <!-- Paint Panel -->
        <div id="calcPanelPaint" class="calc-panel" hidden>
          <div class="calc-grid">
            <div class="field"><label>Room Carpet Area (sq ft)</label><input id="paintArea" type="number" min="10" value="600"></div>
            <div class="field"><label>Ceiling Height (feet)</label><input id="paintHeight" type="number" min="7" value="10"></div>
            <div class="field"><label>Coats Required</label><select id="paintCoats"><option value="2">2 Coats Royale Luxury Emulsion + 1 Coat Primer</option><option value="3">3 Coats Ultra Finish (Fresh Plaster)</option></select></div>
          </div>
          <div class="calc-results-box" id="paintResults"></div>
          <button type="button" class="primary full" id="addPaintToPlan">➕ Add Paint Materials to Procurement Plan →</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Tab switching
  modal.querySelectorAll(".calc-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      modal.querySelectorAll(".calc-tab").forEach(t => t.classList.toggle("active", t === tab));
      const target = tab.dataset.calc;
      modal.querySelector("#calcPanelConcrete").hidden = target !== "concrete";
      modal.querySelector("#calcPanelBrick").hidden = target !== "brick";
      modal.querySelector("#calcPanelPlaster").hidden = target !== "plaster";
      modal.querySelector("#calcPanelPaint").hidden = target !== "paint";
    });
  });
  
  function updateConcreteCalc(){
    const l = Number($("concLength").value)||0, w = Number($("concWidth").value)||0, t = Number($("concThick").value)||0;
    const volCft = (l * w * (t / 12));
    const volCum = volCft * 0.0283168;
    const cementBags = Math.round(volCum * 8.2);
    const sandTons = (volCum * 0.45 * 1.6).toFixed(1);
    const aggregateTons = (volCum * 0.85 * 1.5).toFixed(1);
    const steelKg = Math.round(volCum * 85);
    
    $("concResults").innerHTML = `
      <div class="calc-res-item"><span>Total Wet Concrete Volume:</span><b>${volCft.toFixed(1)} cft (${volCum.toFixed(2)} m³)</b></div>
      <div class="calc-res-item"><span>OPC 53 Cement Required:</span><b style="color:#2563eb">${cementBags} bags (50kg)</b></div>
      <div class="calc-res-item"><span>M-Sand (Zone II):</span><b>${sandTons} tons (${Math.round(sandTons * 25)} cft)</b></div>
      <div class="calc-res-item"><span>20mm Blue Metal Aggregate:</span><b>${aggregateTons} tons (${Math.round(aggregateTons * 25)} cft)</b></div>
      <div class="calc-res-item"><span>TMT Reinforcement Steel (Fe 550D):</span><b style="color:#15803d">${steelKg} kg</b></div>
    `;
    $("addConcreteToPlan").onclick = () => {
      modal.remove();
      if(typeof addRow === "function"){
        addRow("bb_cem_002", cementBags);
        addRow("bb_snd_002", Math.round(sandTons * 25));
        addRow("bb_snd_004", Math.round(aggregateTons * 25));
        addRow("bb_tmt_003", steelKg);
      }
      enter("procurementSection");
      if(typeof toast === "function") toast("Calculated concrete materials added to Procurement Plan!");
    };
  }
  
  function updateBrickCalc(){
    const l = Number($("brickLength").value)||0, h = Number($("brickHeight").value)||0;
    const is9 = $("brickThick").value === "9";
    const type = $("brickType").value;
    const wallArea = l * h;
    
    let brickCount = 0, cementBags = 0, sandCft = 0;
    if(type === "red"){
      brickCount = Math.round(wallArea * (is9 ? 9 : 4.5));
      cementBags = Math.max(1, Math.round(wallArea * (is9 ? 0.28 : 0.14)));
      sandCft = Math.round(cementBags * 4);
    } else if(type === "aac"){
      brickCount = Math.round(wallArea * 0.77);
      cementBags = Math.max(1, Math.round(wallArea * 0.08));
      sandCft = Math.round(cementBags * 3);
    } else {
      brickCount = Math.round(wallArea * (is9 ? 6 : 3));
      cementBags = Math.max(1, Math.round(wallArea * (is9 ? 0.22 : 0.11)));
      sandCft = Math.round(cementBags * 3.5);
    }
    
    $("brickResults").innerHTML = `
      <div class="calc-res-item"><span>Total Wall Surface Area:</span><b>${wallArea} sq ft</b></div>
      <div class="calc-res-item"><span>Masonry Units Required:</span><b style="color:#2563eb">${brickCount} units</b></div>
      <div class="calc-res-item"><span>Mortar Cement Required:</span><b>${cementBags} bags (50kg)</b></div>
      <div class="calc-res-item"><span>P-Sand Mortar Sand:</span><b>${sandCft} cft</b></div>
    `;
    $("addBrickToPlan").onclick = () => {
      modal.remove();
      if(typeof addRow === "function"){
        const bId = type === "aac" ? "bb_brk_003" : "bb_brk_001";
        addRow(bId, brickCount);
        addRow("bb_cem_003", cementBags);
        addRow("bb_snd_003", sandCft);
      }
      enter("procurementSection");
      if(typeof toast === "function") toast("Calculated masonry materials added to Procurement Plan!");
    };
  }
  
  function updatePlasterCalc(){
    const a = Number($("plasterArea").value)||0;
    const isExt = $("plasterType").value === "external";
    const cementBags = Math.max(1, Math.round(a * (isExt ? 0.18 : 0.12)));
    const sandCft = Math.round(cementBags * 4.5);
    const chemLitres = isExt ? Math.max(1, Math.round(cementBags * 0.2)) : 0;
    
    $("plasterResults").innerHTML = `
      <div class="calc-res-item"><span>Plaster Surface Area:</span><b>${a} sq ft</b></div>
      <div class="calc-res-item"><span>Cement Required:</span><b style="color:#2563eb">${cementBags} bags (50kg)</b></div>
      <div class="calc-res-item"><span>P-Sand Plaster Sand:</span><b>${sandCft} cft</b></div>
      ${isExt ? `<div class="calc-res-item"><span>Dr. Fixit Integral Waterproofing:</span><b style="color:#15803d">${chemLitres} Litres</b></div>` : ''}
    `;
    $("addPlasterToPlan").onclick = () => {
      modal.remove();
      if(typeof addRow === "function"){
        addRow("bb_cem_003", cementBags);
        addRow("bb_snd_003", sandCft);
        if(isExt) addRow("bb_chm_002", Math.max(1, chemLitres));
      }
      enter("procurementSection");
      if(typeof toast === "function") toast("Calculated plaster materials added to Procurement Plan!");
    };
  }
  
  function updatePaintCalc(){
    const a = Number($("paintArea").value)||0, h = Number($("paintHeight").value)||0;
    const wallArea = (Math.sqrt(a) * 4 * h) + a;
    const primerLitres = Math.max(1, Math.round(wallArea / 130));
    const paintLitres = Math.max(1, Math.round((wallArea * 2) / 110));
    
    $("paintResults").innerHTML = `
      <div class="calc-res-item"><span>Total Paintable Area:</span><b>${Math.round(wallArea)} sq ft (Walls + Ceiling)</b></div>
      <div class="calc-res-item"><span>Acrylic Wall Primer:</span><b>${primerLitres} Litres</b></div>
      <div class="calc-res-item"><span>Royale Luxury Emulsion (2 Coats):</span><b style="color:#2563eb">${paintLitres} Litres</b></div>
    `;
    $("addPaintToPlan").onclick = () => {
      modal.remove();
      if(typeof addRow === "function"){
        addRow("paint_soft_ivory", paintLitres);
      }
      enter("procurementSection");
      if(typeof toast === "function") toast("Calculated paint quantities added to Procurement Plan!");
    };
  }
  
  ["concLength","concWidth","concThick","concMix"].forEach(id => { const el=$(id); if(el) el.addEventListener("input", updateConcreteCalc); });
  ["brickLength","brickHeight","brickThick","brickType"].forEach(id => { const el=$(id); if(el) el.addEventListener("input", updateBrickCalc); });
  ["plasterArea","plasterType"].forEach(id => { const el=$(id); if(el) el.addEventListener("input", updatePlasterCalc); });
  ["paintArea","paintHeight","paintCoats"].forEach(id => { const el=$(id); if(el) el.addEventListener("input", updatePaintCalc); });
  
  updateConcreteCalc();
  updateBrickCalc();
  updatePlasterCalc();
  updatePaintCalc();
}

// 5. Material Passport / Technical Spec Sheet Modal
function showMaterialPassport(productId){
  if(typeof window.showMaterialPassport === "function" && window.showMaterialPassport !== showMaterialPassport){
    return window.showMaterialPassport(productId);
  }
  if(!productId) return;
  const prods = (window.products && Array.isArray(window.products) && window.products.length)
    ? window.products
    : (typeof products !== "undefined" && Array.isArray(products) && products.length ? products : []);
  let p = prods.find(x => x.id === productId || String(x.id).toLowerCase() === String(productId).toLowerCase() || x.sku === productId);
  if(!p) return;
  
  const old = document.getElementById("materialPassportModal");
  if(old) old.remove();
  
  const modal = document.createElement("div");
  modal.id = "materialPassportModal";
  modal.className = "buyer-request-modal passport-backdrop";
  modal.style.cssText = "position:fixed !important;inset:0 !important;z-index:999999 !important;display:grid !important;place-items:center !important;background:rgba(15,23,42,0.75) !important;backdrop-filter:blur(4px) !important;padding:16px !important;overflow-y:auto !important;";
  modal.innerHTML = `
    <div class="buyer-request-dialog passport-dialog" role="dialog" aria-modal="true" style="position:relative !important;z-index:1000000 !important;background:#ffffff !important;border-radius:20px !important;max-width:680px !important;width:min(95vw,680px) !important;max-height:92vh !important;overflow-y:auto !important;box-shadow:0 25px 60px rgba(0,0,0,0.35) !important;padding:26px !important;border:1px solid #e2e8f0 !important;">
      <div class="passport-head" style="display:flex !important;justify-content:space-between !important;align-items:flex-start !important;gap:12px !important;border-bottom:1px solid #e2e8f0 !important;padding-bottom:14px !important;margin-bottom:16px !important;">
        <div>
          <span class="passport-chip" style="display:inline-block !important;background:#e0e7ff !important;color:#3730a3 !important;font-size:10px !important;font-weight:800 !important;padding:4px 8px !important;border-radius:4px !important;margin-bottom:6px !important;">📋 OFFICIAL MATERIAL PASSPORT &amp; SPEC SHEET</span>
          <h2 style="font-size:18px !important;font-weight:800 !important;color:#0f172a !important;margin:4px 0 !important;line-height:1.3 !important;">${p.name}</h2>
          <small style="color:#64748b !important;font-size:12px !important;">${p.brand || 'Verified Construction Manufacturer'} · SKU: ${p.sku || p.id}</small>
        </div>
        <button type="button" class="shop-close" onclick="document.getElementById('materialPassportModal').remove()" style="cursor:pointer !important;border:1px solid #e2e8f0 !important;background:#f8fafc !important;border-radius:8px !important;width:34px !important;height:34px !important;font-size:20px !important;color:#64748b !important;display:grid !important;place-items:center !important;line-height:1 !important;" title="Close Specs">×</button>
      </div>
      
      <div class="passport-body-grid" style="display:grid !important;grid-template-columns:190px 1fr !important;gap:20px !important;margin:16px 0 !important;align-items:center !important;">
        <div class="passport-img-side" style="text-align:center !important;">
          <img src="${p.img}" alt="${p.name}" style="width:100% !important;height:180px !important;object-fit:contain !important;background:#f8fafc !important;border-radius:12px !important;border:1px solid #e2e8f0 !important;padding:8px !important;">
          <div class="passport-verified-stamp" style="margin-top:8px !important;font-size:10.5px !important;font-weight:800 !important;color:#15803d !important;background:#f0fdf4 !important;border:1px solid #bbf7d0 !important;padding:4px !important;border-radius:4px !important;">✓ BIS / ISI CERTIFIED</div>
        </div>
        <div class="passport-specs-side" style="display:flex !important;flex-direction:column !important;gap:10px !important;">
          <div class="passport-spec-row" style="display:flex !important;justify-content:space-between !important;font-size:12.5px !important;border-bottom:1px solid #f1f5f9 !important;padding-bottom:5px !important;"><span style="color:#64748b !important;font-weight:600 !important;">Category</span><b style="color:#0f172a !important;">${p.category}</b></div>
          <div class="passport-spec-row" style="display:flex !important;justify-content:space-between !important;font-size:12.5px !important;border-bottom:1px solid #f1f5f9 !important;padding-bottom:5px !important;"><span style="color:#64748b !important;font-weight:600 !important;">Engineering Specification</span><b style="color:#0f172a !important;text-align:right !important;max-width:65% !important;">${p.spec}</b></div>
          <div class="passport-spec-row" style="display:flex !important;justify-content:space-between !important;font-size:12.5px !important;border-bottom:1px solid #f1f5f9 !important;padding-bottom:5px !important;"><span style="color:#64748b !important;font-weight:600 !important;">Primary Packaging / Unit</span><b style="color:#0f172a !important;">${p.unit}</b></div>
          <div class="passport-spec-row" style="display:flex !important;justify-content:space-between !important;font-size:12.5px !important;border-bottom:1px solid #f1f5f9 !important;padding-bottom:5px !important;"><span style="color:#64748b !important;font-weight:600 !important;">Reference Price</span><b style="color:#15803d !important;font-size:13.5px !important;">₹${Number(p.price||0).toLocaleString('en-IN')} / ${p.unit}</b></div>
          <div class="passport-spec-row" style="display:flex !important;justify-content:space-between !important;font-size:12.5px !important;border-bottom:1px solid #f1f5f9 !important;padding-bottom:5px !important;"><span style="color:#64748b !important;font-weight:600 !important;">Fulfillment Partner</span><b style="color:#0f172a !important;">${p.supplierName || 'Verified Regional Depot'}</b></div>
          <div class="passport-spec-row" style="display:flex !important;justify-content:space-between !important;font-size:12.5px !important;border-bottom:1px solid #f1f5f9 !important;padding-bottom:5px !important;"><span style="color:#64748b !important;font-weight:600 !important;">Green Building Rating</span><b style="color:#15803d !important;">IGBC &amp; GRIHA Level 4</b></div>
          <div class="passport-spec-row" style="display:flex !important;justify-content:space-between !important;font-size:12.5px !important;border-bottom:1px solid #f1f5f9 !important;padding-bottom:5px !important;"><span style="color:#64748b !important;font-weight:600 !important;">Quality Verification</span><b style="color:#0f172a !important;">Tested Batch (IS 12269 / IS 1786)</b></div>
        </div>
      </div>
      
      <div class="passport-qr-strip" style="display:flex !important;justify-content:space-between !important;align-items:center !important;background:#f8fafc !important;border:1px solid #e2e8f0 !important;border-radius:12px !important;padding:12px 16px !important;margin:16px 0 !important;">
        <div class="passport-qr-code-box" onclick="if(window.showQrScannerModal)window.showQrScannerModal();" title="Click to open QR scanner" style="display:flex !important;align-items:center !important;gap:12px !important;cursor:pointer !important;">
          <div class="qr-code-graphic" style="width:36px !important;height:36px !important;background:#0f172a !important;border-radius:6px !important;display:grid !important;place-items:center !important;color:#fff !important;font-size:18px !important;">
            ⚏
          </div>
          <div>
            <b style="display:block !important;font-size:12.5px !important;color:#0f172a !important;">Digital Product Passport QR</b>
            <small style="color:#2563eb !important;font-size:11px !important;">Scan on jobsite or click to verify batch lab tests ↗</small>
          </div>
        </div>
        <button type="button" class="secondary sample-req-btn" onclick="document.getElementById('materialPassportModal').remove();if(window.requestMaterialSample)window.requestMaterialSample('${p.id}');" style="padding:7px 12px !important;font-size:12px !important;font-weight:700 !important;">
          📦 Request Sample
        </button>
      </div>
      
      <div class="passport-actions" style="display:flex !important;justify-content:flex-end !important;gap:10px !important;border-top:1px solid #e2e8f0 !important;padding-top:16px !important;margin-top:10px !important;">
        <button type="button" class="secondary" onclick="document.getElementById('materialPassportModal').remove()" style="padding:8px 14px !important;font-size:12.5px !important;font-weight:700 !important;">Close</button>
        <button type="button" class="secondary" onclick="if(window.toggleCompare)window.toggleCompare('${p.id}');" style="padding:8px 14px !important;font-size:12.5px !important;font-weight:700 !important;">⚖️ Compare</button>
        <button type="button" class="secondary" onclick="if(window.toggleShortlist)window.toggleShortlist('${p.id}');" style="padding:8px 14px !important;font-size:12.5px !important;font-weight:700 !important;">♡ Shortlist</button>
        <button type="button" class="primary" onclick="if(typeof addCart==='function')addCart('${p.id}');document.getElementById('materialPassportModal').remove();" style="padding:8px 18px !important;font-size:12.5px !important;font-weight:800 !important;">Add to Cart +</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener("click", e => { if(e.target === modal) modal.remove(); });
}
if(!window.showMaterialPassport){
  window.showMaterialPassport = showMaterialPassport;
}
window.showMaterialCalculator = showMaterialCalculator;
window.showTaxInvoice = showTaxInvoice;
window.rerouteOrder = rerouteOrder;


// ============================================================================
// BUILDAI ENTERPRISE CONSTRUCTION FEATURES:
// 1. Side-by-Side Product Comparison Tool
// 2. Wishlist & Project Shortlists
// 3. Physical Product Samples & QR Discovery
// 4. Automatic Multi-Channel Notifications (WhatsApp / SMS / Email)
// 5. Complete Delivery-Address & Site Management (Vehicle Accessibility Checks)
// 6. Construction Services & Contractor Marketplace
// ============================================================================

// --- 1. SIDE-BY-SIDE PRODUCT COMPARISON TOOL ---
let compareList = JSON.parse(localStorage.getItem("buildai_compare_list") || "[]");

function saveCompareList(){
  localStorage.setItem("buildai_compare_list", JSON.stringify(compareList));
  updateCompareBar();
}

function toggleCompare(productId){
  const idx = compareList.indexOf(productId);
  if(idx >= 0){
    compareList.splice(idx, 1);
    if(typeof toast === "function") toast("Removed from comparison.");
  } else {
    if(compareList.length >= 4){
      if(typeof toast === "function") toast("You can compare up to 4 materials at once.");
      return;
    }
    compareList.push(productId);
    if(typeof toast === "function") toast("Added to comparison (" + compareList.length + "/4).");
  }
  saveCompareList();
  if(typeof renderProducts === "function") renderProducts();
}
window.toggleCompare = toggleCompare;

function clearCompare(){
  compareList = [];
  saveCompareList();
  if(typeof renderProducts === "function") renderProducts();
}
window.clearCompare = clearCompare;

function updateCompareBar(){
  let bar = $("floatingCompareBar");
  if(!compareList.length){
    if(bar) bar.style.display = "none";
    return;
  }
  if(!bar){
    bar = document.createElement("div");
    bar.id = "floatingCompareBar";
    bar.className = "floating-compare-bar";
    document.body.appendChild(bar);
  }
  bar.style.display = "flex";
  
  const prods = typeof products !== "undefined" ? products : [];
  const selectedItems = compareList.map(id => prods.find(p => p.id === id)).filter(Boolean);
  
  bar.innerHTML = `
    <div class="compare-bar-left">
      <span class="compare-badge">⚖️ Compare</span>
      <div class="compare-thumbs">
        ${selectedItems.map(p => `<img src="${p.img}" title="${p.name}" alt="${p.name}">`).join("")}
      </div>
      <span class="compare-count-text"><b>${compareList.length}</b> of 4 items selected</span>
    </div>
    <div class="compare-bar-right">
      <button type="button" class="secondary small-btn" onclick="clearCompare()">Clear</button>
      <button type="button" class="primary compare-open-btn" onclick="showComparisonModal()">Compare Materials Side-by-Side →</button>
    </div>
  `;
}

function showComparisonModal(){
  const prods = typeof products !== "undefined" ? products : [];
  const items = compareList.map(id => prods.find(p => p.id === id)).filter(Boolean);
  if(items.length < 2){
    if(typeof toast === "function") toast("Select at least 2 materials to compare.");
    return;
  }
  
  const old = $("comparisonModal");
  if(old) old.remove();
  
  const modal = document.createElement("div");
  modal.id = "comparisonModal";
  modal.className = "buyer-request-modal compare-modal-backdrop";
  modal.innerHTML = `
    <div class="buyer-request-dialog compare-dialog" role="dialog" aria-modal="true">
      <div class="buyer-request-dialog-head">
        <div>
          <h2>⚖️ Side-by-Side Material Comparison</h2>
          <small style="color:#64748b">Direct engineering & commercial matrix comparison</small>
        </div>
        <button type="button" class="shop-close" onclick="document.getElementById('comparisonModal').remove()">×</button>
      </div>
      
      <div class="compare-table-wrapper">
        <table class="compare-table">
          <thead>
            <tr>
              <th class="spec-label-col">Specification / Property</th>
              ${items.map(p => `
                <th class="item-col">
                  <div class="comp-prod-header">
                    <img src="${p.img}" alt="${p.name}">
                    <h4>${p.name}</h4>
                    <span class="comp-brand-badge">${p.brand || 'Verified'}</span>
                    <button type="button" class="comp-rem-btn" onclick="toggleCompare('${p.id}');showComparisonModal();">Remove</button>
                  </div>
                </th>
              `).join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="spec-label">Category</td>
              ${items.map(p => `<td><b>${p.category}</b></td>`).join("")}
            </tr>
            <tr>
              <td class="spec-label">Reference Price</td>
              ${items.map(p => `<td class="comp-price">${typeof cash === 'function' ? cash(p.price) : '₹' + p.price} <small>/ ${p.unit}</small></td>`).join("")}
            </tr>
            <tr>
              <td class="spec-label">Engineering Specification</td>
              ${items.map(p => `<td>${p.spec || 'Standard compliance'}</td>`).join("")}
            </tr>
            <tr>
              <td class="spec-label">BIS / ISI Certification</td>
              ${items.map(p => `<td><span class="comp-isi-pill">✓ Verified Standard</span></td>`).join("")}
            </tr>
            <tr>
              <td class="spec-label">Fulfillment Partner</td>
              ${items.map(p => `<td><b>${p.supplierName || 'Vellore Depot'}</b></td>`).join("")}
            </tr>
            <tr>
              <td class="spec-label">Delivery Lead Time</td>
              ${items.map(p => `<td>⚡ ${p.deliveryDays || 2} Business Day(s)</td>`).join("")}
            </tr>
            <tr>
              <td class="spec-label">Green Building Rating</td>
              ${items.map(() => `<td style="color:#15803d;font-weight:700">IGBC & GRIHA Level 4</td>`).join("")}
            </tr>
            <tr>
              <td class="spec-label">Stock Status</td>
              ${items.map(p => `<td>${p.stock || 'In Stock'}</td>`).join("")}
            </tr>
            <tr>
              <td class="spec-label">Procure Action</td>
              ${items.map(p => `
                <td>
                  <button type="button" class="primary full" onclick="if(typeof addCart==='function')addCart('${p.id}');if(typeof toast==='function')toast('Added to cart!');">Add to Cart +</button>
                </td>
              `).join("")}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}
window.showComparisonModal = showComparisonModal;

// --- 2. WISHLIST & PROJECT SHORTLISTS ---
let shortlists = JSON.parse(localStorage.getItem("buildai_project_shortlists") || "{}");
if(!shortlists["Green Valley Villa"]) shortlists["Green Valley Villa"] = ["bb_cem_002", "bb_tmt_001"];
if(!shortlists["Arcot Road Complex"]) shortlists["Arcot Road Complex"] = ["bb_snd_002", "bb_cem_003"];

function saveShortlists(){
  localStorage.setItem("buildai_project_shortlists", JSON.stringify(shortlists));
  updateShortlistHeaderBadge();
}

function toggleShortlist(productId, projectName){
  const proj = projectName || "Green Valley Villa";
  if(!shortlists[proj]) shortlists[proj] = [];
  const list = shortlists[proj];
  const idx = list.indexOf(productId);
  if(idx >= 0){
    list.splice(idx, 1);
    if(typeof toast === "function") toast("Removed from " + proj + " shortlist.");
  } else {
    list.push(productId);
    if(typeof toast === "function") toast("Saved to " + proj + " shortlist!");
  }
  saveShortlists();
  if(typeof renderProducts === "function") renderProducts();
}
window.toggleShortlist = toggleShortlist;

function isShortlisted(productId){
  for(const proj in shortlists){
    if(shortlists[proj].includes(productId)) return true;
  }
  return false;
}
window.isShortlisted = isShortlisted;

function updateShortlistHeaderBadge(){
  const btn = $("shortlistsHeaderBtn");
  if(!btn) return;
  let total = 0;
  for(const proj in shortlists) total += shortlists[proj].length;
  btn.innerHTML = `📑 <span>Shortlists (${total})</span>`;
}

function showProjectShortlistsModal(){
  const prods = typeof products !== "undefined" ? products : [];
  const projects = Object.keys(shortlists);
  let activeProj = projects[0] || "Green Valley Villa";

  const old = $("shortlistsModal");
  if(old) old.remove();

  const modal = document.createElement("div");
  modal.id = "shortlistsModal";
  modal.className = "buyer-request-modal shortlist-backdrop";

  function renderBody(proj){
    const ids = shortlists[proj] || [];
    const items = ids.map(id => prods.find(p => p.id === id)).filter(Boolean);
    const totalEst = items.reduce((sum, p) => sum + (p.price || 0), 0);

    return `
      <div class="shortlist-tabs">
        ${projects.map(p => `
          <button type="button" class="shortlist-tab ${p === proj ? 'active' : ''}" data-proj="${p}">${p} (${(shortlists[p]||[]).length})</button>
        `).join("")}
        <button type="button" class="shortlist-add-proj" id="addNewProjBtn">+ New Site</button>
      </div>
      
      <div class="shortlist-items-container">
        ${items.length ? items.map(p => `
          <div class="shortlist-item-row">
            <img src="${p.img}" alt="${p.name}">
            <div class="shortlist-item-info">
              <h4>${p.name}</h4>
              <small>${p.category} · ${p.spec}</small>
              <div class="shortlist-price-tag">${typeof cash === 'function' ? cash(p.price) : '₹' + p.price} / ${p.unit}</div>
            </div>
            <div class="shortlist-item-actions">
              <button type="button" class="primary small-btn" onclick="if(typeof addCart==='function')addCart('${p.id}');if(typeof toast==='function')toast('Added to cart!');">Add to Cart</button>
              <button type="button" class="secondary small-btn" onclick="toggleShortlist('${p.id}', '${proj}');document.getElementById('shortlistsModal').remove();showProjectShortlistsModal();">Remove</button>
            </div>
          </div>
        `).join("") : '<div class="empty-state">No materials saved in this project shortlist yet. Click "♡ Save" on any marketplace card to add.</div>'}
      </div>

      <div class="shortlist-footer">
        <div>
          <b>Indicative Unit Reference:</b> ${typeof cash === 'function' ? cash(totalEst) : '₹' + totalEst}
        </div>
        <div class="shortlist-footer-actions">
          <button type="button" class="secondary" onclick="itemsToPlan('${proj}')">Add All to Procurement Plan →</button>
          <button type="button" class="primary" onclick="itemsToCart('${proj}')">Move All to Cart 🛒</button>
        </div>
      </div>
    `;
  }

  modal.innerHTML = `
    <div class="buyer-request-dialog shortlist-dialog" role="dialog" aria-modal="true">
      <div class="buyer-request-dialog-head">
        <div>
          <h2>📑 Project Wishlists & Material Shortlists</h2>
          <small style="color:#64748b">Organize alternative materials by construction project site</small>
        </div>
        <button type="button" class="shop-close" onclick="document.getElementById('shortlistsModal').remove()">×</button>
      </div>
      <div id="shortlistModalContent">
        ${renderBody(activeProj)}
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  modal.addEventListener("click", e => {
    const tab = e.target.closest(".shortlist-tab");
    if(tab){
      activeProj = tab.dataset.proj;
      $("shortlistModalContent").innerHTML = renderBody(activeProj);
    }
    if(e.target.id === "addNewProjBtn"){
      const name = prompt("Enter new construction project name:");
      if(name && name.trim()){
        shortlists[name.trim()] = [];
        saveShortlists();
        activeProj = name.trim();
        $("shortlistModalContent").innerHTML = renderBody(activeProj);
      }
    }
  });
}
window.showProjectShortlistsModal = showProjectShortlistsModal;

window.itemsToCart = function(proj){
  const ids = shortlists[proj] || [];
  if(!ids.length){ if(typeof toast==='function') toast("Shortlist is empty."); return; }
  ids.forEach(id => { if(typeof addCart === "function") addCart(id); });
  if(typeof toast === "function") toast("Added all items from " + proj + " to cart!");
  const m = $("shortlistsModal"); if(m) m.remove();
};

window.itemsToPlan = function(proj){
  const ids = shortlists[proj] || [];
  if(!ids.length){ if(typeof toast==='function') toast("Shortlist is empty."); return; }
  ids.forEach(id => { if(typeof addRow === "function") addRow(id, 10); });
  if(typeof toast === "function") toast("Added shortlist items to Procurement Plan!");
  const m = $("shortlistsModal"); if(m) m.remove();
  if(typeof enter === "function") enter("procurementSection");
};

// --- 3. PRODUCT SAMPLES & QR DISCOVERY ---
function requestMaterialSample(productId){
  const prods = typeof products !== "undefined" ? products : [];
  const p = prods.find(x => x.id === productId);
  if(!p) return;

  const old = $("sampleModal");
  if(old) old.remove();

  const modal = document.createElement("div");
  modal.id = "sampleModal";
  modal.className = "buyer-request-modal sample-modal-backdrop";
  modal.innerHTML = `
    <div class="buyer-request-dialog sample-dialog" role="dialog" aria-modal="true">
      <div class="buyer-request-dialog-head">
        <div>
          <span class="sample-chip">📦 ON-SITE MATERIAL INSPECTION</span>
          <h2>Request Physical Product Sample</h2>
          <small style="color:#64748b">${p.name} · SKU: ${p.sku || p.id}</small>
        </div>
        <button type="button" class="shop-close" onclick="document.getElementById('sampleModal').remove()">×</button>
      </div>
      
      <div class="sample-body">
        <div class="sample-prod-summary">
          <img src="${p.img}" alt="${p.name}">
          <div>
            <b>${p.brand || 'Verified Manufacturer'}</b>
            <p>${p.spec}</p>
            <small style="color:#15803d">✓ Sample verified by ${p.supplierName || 'Regional Depot'}</small>
          </div>
        </div>
        
        <div class="field" style="margin-top:16px">
          <label>Select Delivery Construction Site</label>
          <select id="sampleSiteSelect">
            <option value="SITE-001">Green Valley Villa - Phase 1 (Katpadi, Vellore)</option>
            <option value="SITE-002">Arcot Road Commercial Complex (Kagithapatrai, Vellore)</option>
            <option value="OTHER">Custom Site Address...</option>
          </select>
        </div>
        
        <div class="field">
          <label>Site Contact Engineer / Receiver Mobile</label>
          <input type="text" id="sampleReceiverMobile" value="+91 98421 55201" placeholder="+91 XXXXX XXXXX">
        </div>
        
        <div class="sample-courier-box">
          <div class="courier-badge">⚡ DTDC / BlueDart Express Surface</div>
          <p>Dispatched in 24 hours with Mill Test Certificate and batch analysis sheet.</p>
          <div class="sample-cost-row">
            <span>Sample Inspection Unit:</span><b>FREE for Registered Builders</b>
          </div>
          <div class="sample-cost-row">
            <span>Logistics & Courier Handling:</span><b style="color:#15803d">₹0 (Complimentary)</b>
          </div>
        </div>
        
        <button type="button" class="primary full" id="confirmSampleBtn">Confirm Sample Dispatch →</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  $("confirmSampleBtn").onclick = () => {
    modal.remove();
    addNotification("Sample Request Confirmed", "Physical sample for " + p.name + " dispatched to Katpadi site via DTDC Express (AWB: VLR-" + Math.floor(100000 + Math.random()*900000) + ").", "dispatch");
    if(typeof toast === "function") toast("Sample request submitted! Tracking details added to Notifications.");
  };
}
window.requestMaterialSample = requestMaterialSample;

// Interactive QR Scanner Modal
function showQrScannerModal(){
  const old = $("qrScannerModal");
  if(old) old.remove();

  const prods = typeof products !== "undefined" ? products : [];
  const sampleProd = prods[Math.floor(Math.random() * prods.length)] || { id: "bb_tmt_001", name: "Tata Tiscon 550D TMT Bar" };

  const modal = document.createElement("div");
  modal.id = "qrScannerModal";
  modal.className = "buyer-request-modal qr-scanner-backdrop";
  modal.innerHTML = `
    <div class="buyer-request-dialog qr-scanner-dialog" role="dialog" aria-modal="true">
      <div class="buyer-request-dialog-head">
        <div>
          <h2>📷 QR Code Material Discovery Scanner</h2>
          <small style="color:#64748b">Scan on-site QR code label to inspect live Material Passport</small>
        </div>
        <button type="button" class="shop-close" onclick="document.getElementById('qrScannerModal').remove()">×</button>
      </div>
      
      <div class="scanner-frame-box">
        <div class="scanner-laser"></div>
        <div class="scanner-viewfinder">
          <div class="corner top-left"></div>
          <div class="corner top-right"></div>
          <div class="corner bottom-left"></div>
          <div class="corner bottom-right"></div>
          <div class="scanner-icon">📱</div>
          <small>Align QR code inside square</small>
        </div>
      </div>
      
      <div class="scanner-sim-actions">
        <p>Simulate instant scan for verified product:</p>
        <button type="button" class="primary full" onclick="document.getElementById('qrScannerModal').remove();showMaterialPassport('${sampleProd.id}');">
          🔍 Scan Sample Material: ${sampleProd.name} →
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}
window.showQrScannerModal = showQrScannerModal;


// ============================================================================
// BUILDAI SUPPLIER FAILURE RECOVERY ENGINE (SIGNATURE FEATURE)
// ============================================================================

const alternativePool = {
  lakshmi: {
    id: "lakshmi",
    name: "Lakshmi Steel & Structural Traders",
    location: "Rangapuram Industrial Depot · 4.8 km from site",
    rating: 4.5,
    expressHours: 24,
    deliveryFee: 750,
    inventoryStock: "200 units Fe 550D In Stock (IS 1786 certified batch)",
    rateModifier: 1.012, // +1.2% rate adjustment for priority mill allocation
    tag: "Primary structural steel, cement & aggregates hub",
    rationale: "Lakshmi Steel maintains verified IS 1786 batch-certified Fe 550D inventory in Rangapuram depot with 24h express dispatch; absorbs the 200-bar deficit with minimal freight delta and guarantees Thursday on-site arrival, protecting the concrete slab pouring schedule."
  },
  "pandian-ply": {
    id: "pandian-ply",
    name: "Pandian Ply & Structural Mart",
    location: "GPH Road Depot · 7.2 km from site",
    rating: 4.6,
    expressHours: 48,
    deliveryFee: 850,
    inventoryStock: "180 units Fe 550D In Stock",
    rateModifier: 1.025,
    tag: "Multi-category structural & timber specialist",
    rationale: "Pandian Mart holds certified stock with heavy-duty crane trailer capabilities. Delivery achieved within 48h with nominal transport differential."
  },
  geetha: {
    id: "geetha",
    name: "Geetha Commercial Logistics & Materials",
    location: "Katpadi Depot · 3.5 km from site",
    rating: 4.3,
    expressHours: 36,
    deliveryFee: 700,
    inventoryStock: "150 units Fe 550D In Stock",
    rateModifier: 1.03,
    tag: "Regional bulk supply depot",
    rationale: "Geetha depot is closest to the site (3.5 km) with rapid turnaround, suitable for partial or expedited batch fulfillment."
  }
};

function calculateFailureRecoveryPlan(order, chosenAltId){
  const isAudit = !!(order.failureResolved || (order.status && order.status.includes("Substituted")));
  
  // Extract or preserve original supplier info
  let originalSupName = order.originalSupplierName;
  let originalSupId = order.originalSupplierId;
  if (!originalSupName && order.supplierNote && order.supplierNote.includes("Re-routed from ")) {
    const match = order.supplierNote.match(/Re-routed from ([^.]+?) due to/);
    if (match) originalSupName = match[1].trim();
  }
  if (!originalSupName) {
    originalSupName = isAudit ? "Babu Agencies Multi-Material Mart" : order.supplierName;
  }
  if (!originalSupId) {
    originalSupId = isAudit ? "babu" : normalizeSupplierId(order.supplierId);
  }

  const altKeys = Object.keys(alternativePool).filter(k => k !== originalSupId);
  
  // If in audit mode and no specific alt chosen, select the currently active substituted supplier
  let selectedAltKey;
  if (chosenAltId && alternativePool[chosenAltId]) {
    selectedAltKey = chosenAltId;
  } else if (isAudit) {
    selectedAltKey = normalizeSupplierId(order.supplierId) || (altKeys[0] || "lakshmi");
  } else {
    selectedAltKey = altKeys[0] || "lakshmi";
  }
  const alt = alternativePool[selectedAltKey] || alternativePool.lakshmi;

  // Original Plan metrics
  const origSubtotal = Number(order.originalSubtotal || (isAudit ? Math.round(Number(order.indicativeSubtotal || 121500) / (alt.rateModifier || 1)) : order.indicativeSubtotal)) || 121500;
  const origDeliveryFee = Number(order.originalDeliveryFee || (isAudit ? 500 : order.indicativeDeliveryFee)) || 500;
  const origTotal = origSubtotal + origDeliveryFee;
  const origMilestone = order.milestone || "Friday 11:00 AM - Foundation Concrete Slab Pouring";
  
  // Revised Plan calculation
  const revSubtotal = isAudit ? Number(order.indicativeSubtotal || Math.round(origSubtotal * alt.rateModifier)) : Math.round(origSubtotal * alt.rateModifier);
  const revDeliveryFee = isAudit ? Number(order.indicativeDeliveryFee || alt.deliveryFee) : alt.deliveryFee;
  const revTotal = revSubtotal + revDeliveryFee;
  const costDelta = Math.max(0, revTotal - origTotal);
  const costDeltaPct = origTotal > 0 ? ((costDelta / origTotal) * 100).toFixed(1) : "0.0";

  // Delivery Timing
  const revEta = "Thursday, Oct 29 • 3:30 PM";
  const hoursAheadOfMilestone = 19.5;

  return {
    order,
    isAudit,
    original: {
      supplierId: originalSupId,
      supplierName: originalSupName,
      location: "Virudampet Distribution Yard",
      subtotal: origSubtotal,
      deliveryFee: origDeliveryFee,
      total: origTotal,
      eta: "Friday, Oct 30 • 10:30 AM (FAILED: Delayed to next Tuesday)",
      milestone: origMilestone,
      disruptionType: (order.failure && order.failure.type) ? order.failure.type.toUpperCase() : "STOCKOUT",
      disruptionReason: (order.failure && order.failure.reason) ? order.failure.reason : "Primary supplier out of stock on ordered materials due to regional mill allocation deficit.",
      delayDays: 4,
      penaltyRisk: "Critical Concrete Pouring Halt"
    },
    revised: {
      supplierId: alt.id,
      supplierName: alt.name,
      location: alt.location,
      rating: alt.rating,
      subtotal: revSubtotal,
      deliveryFee: revDeliveryFee,
      total: revTotal,
      eta: revEta,
      hoursAhead: hoursAheadOfMilestone,
      milestoneStatus: "19.5h Ahead of Milestone",
      inventoryStock: "100% In Stock (Rangapuram Depot)",
      rationale: isAudit
        ? `Authorized & Active: Re-routed order to ${alt.name} to avoid 4-day critical site delay. Supplier verified with ${alt.rating}★ reliability and rapid 24h dispatch window.`
        : `Autonomous Recommendation: Re-routing order to ${alt.name} avoids 4-day site delay with verified immediate dispatch from Rangapuram central hub.`
    },
    delta: {
      cost: costDelta,
      costPct: costDeltaPct,
      materialDelta: Math.max(0, revSubtotal - origSubtotal),
      freightDelta: Math.max(0, revDeliveryFee - origDeliveryFee),
      timeDaysSaved: 4
    },
    availableAlternatives: altKeys.map(k => alternativePool[k])
  };
}

function showFailureRecoveryModal(orderId, chosenAltId){
  const records = getRequests();
  const order = records.find(r => r.id === orderId) || records[0];
  if(!order){
    if(typeof toast === "function") toast("Order not found.");
    return;
  }

  const isAudit = !!(order.failureResolved || (order.status && order.status.includes("Substituted")));

  // Strict Role Separation: Must have disruption or an authorized recovery audit
  if(!order.failure && !isAudit){
    if(typeof toast === "function") {
      toast("No supplier disruption or recovery plan recorded for this order.");
    } else {
      alert("No supplier disruption or recovery plan recorded for this order.");
    }
    return;
  }

  const plan = calculateFailureRecoveryPlan(order, chosenAltId);

  const old = document.getElementById("failureRecoveryModal");
  if(old) old.remove();

  const auditTrailItems = (order.auditTrail && order.auditTrail.length) ? order.auditTrail : [
    {
      timestamp: order.updatedAt || new Date().toISOString(),
      event: "SUPPLIER_SUBSTITUTION_APPROVED",
      details: `Builder authorized Autonomous Recovery plan. Substituted from ${plan.original.supplierName} to ${plan.revised.supplierName}. Delivery guaranteed Thursday 3:30 PM (19.5h ahead of milestone).`
    }
  ];

  const modal = document.createElement("div");
  modal.id = "failureRecoveryModal";
  modal.className = "recovery-modal-backdrop";
  modal.innerHTML = `
    <div class="recovery-dialog" role="dialog" aria-modal="true" aria-label="Supplier Failure Recovery Engine">
      
      <!-- Top Header -->
      <div class="recovery-head">
        <div>
          <span class="recovery-badge-pill" style="${isAudit ? 'background:#ecfdf5;color:#047857;border-color:#a7f3d0;' : ''}">
            ${isAudit ? '📋 EXECUTED RECOVERY AUDIT TRAIL • ACTIVE' : '⚡ SIGNATURE ENGINE • PROCUREMENT RESILIENCE'}
          </span>
          <h2>${isAudit ? 'Autonomous Recovery Audit Log' : 'Supplier Failure Recovery Engine'}</h2>
          <p>${isAudit ? 'Verified Purchase Plan Revision & Cost Audit' : 'Autonomous Purchase Plan Revision & Supplier Substitution'} for Order #${h(order.id)} • ${h(order.projectName)}</p>
        </div>
        <button type="button" class="recovery-close-btn" onclick="document.getElementById('failureRecoveryModal').remove()">×</button>
      </div>

      <!-- Critical Disruption Alert Box -->
      <div class="recovery-alert-box" style="${isAudit ? 'background:#f0fdf4;border-color:#86efac;' : ''}">
        <div class="recovery-alert-icon" style="${isAudit ? 'background:#dcfce7;color:#15803d;' : ''}">
          ${isAudit ? '✓' : '⚠️'}
        </div>
        <div class="recovery-alert-content">
          <h4 style="${isAudit ? 'color:#15803d;' : ''}">
            ${isAudit ? `RECOVERY AUDIT COMPLETED: ${h(plan.original.disruptionType)} MITIGATED` : `DISRUPTION DETECTED: ${h(plan.original.disruptionType)} (${h(plan.original.supplierName)})`}
          </h4>
          <p style="${isAudit ? 'color:#166534;' : ''}">
            ${isAudit 
              ? `Stockout disruption on ${h(plan.original.supplierName)} was successfully mitigated by re-routing order to ${h(plan.revised.supplierName)}. Pouring milestone deadline secured.`
              : h(plan.original.disruptionReason)}
          </p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
            <span class="recovery-deadline-tag" style="${isAudit ? 'background:#ecfdf5;border-color:#86efac;color:#15803d;' : ''}">
              ${isAudit ? '✓ Protected Milestone' : '⚡ Critical Milestone at Risk'}: ${h(plan.original.milestone)}
            </span>
            <span style="font-size:11.5px;color:${isAudit ? '#15803d' : '#991b1b'};font-weight:700;">
              ${isAudit ? 'Zero Delay • Concrete Pouring Protected' : `Potential Delay: +${plan.original.delayDays} Days • ${h(plan.original.penaltyRisk)}`}
            </span>
          </div>
        </div>
      </div>

      <!-- Side-by-Side Comparison Grid -->
      <div class="plan-comparison-grid">
        
        <!-- CARD A: Original Disrupted Plan -->
        <div class="plan-card plan-card-original">
          <div>
            <span class="plan-card-tag">📦 ORIGINAL PLAN (DISRUPTED)</span>
            <h3 class="plan-supplier-title">${h(plan.original.supplierName)}</h3>
            <div class="plan-supplier-meta">📍 ${h(plan.original.location)}</div>
            
            <div class="plan-items-table">
              <div style="font-size:10px;font-weight:800;text-transform:uppercase;color:#94a3b8;margin-bottom:6px;">Allocated Materials:</div>
              ${(order.items || []).map(it => `
                <div class="plan-item-row">
                  <span>${h(it.name)} × ${it.quantity} ${h(it.unit)}</span>
                  <b>${cash(it.indicativeSubtotal || (it.quantity * it.indicativeUnitPrice))}</b>
                </div>
              `).join("")}
            </div>

            <div class="plan-cost-summary">
              <div class="plan-cost-line"><span>Material Subtotal:</span><b>${cash(plan.original.subtotal)}</b></div>
              <div class="plan-cost-line"><span>Transport / Freight:</span><b>${cash(plan.original.deliveryFee)}</b></div>
              <div class="plan-cost-line total-line"><span>Total Committed Cost:</span><b>${cash(plan.original.total)}</b></div>
            </div>
          </div>

          <div class="plan-timeline-box">
            <div>
              <b>Original Delivery:</b>
              <div style="font-size:11px;margin-top:2px;">${h(plan.original.eta)}</div>
            </div>
            <span style="font-size:18px;">❌</span>
          </div>
        </div>

        <!-- CARD B: Revised BuildAI Recommended Plan -->
        <div class="plan-card plan-card-revised">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <span class="plan-card-tag" style="${isAudit ? 'background:#dcfce7;color:#15803d;border:1px solid #86efac;' : ''}">
                ${isAudit ? '✓ AUTHORIZED SUBSTITUTE PARTNER' : '⚡ REVISED PURCHASE PLAN (AI RECOMMENDED)'}
              </span>
              ${!isAudit ? `
                <div style="display:flex;align-items:center;gap:6px;">
                  <label style="font-size:10.5px;font-weight:800;color:#15803d;">Switch Partner:</label>
                  <select id="recoveryAltSelect" onchange="showFailureRecoveryModal('${order.id}', this.value)" style="font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;border:1px solid #86efac;background:#fff;color:#166534;cursor:pointer;">
                    ${plan.availableAlternatives.map(alt => `
                      <option value="${alt.id}" ${alt.id === plan.revised.supplierId ? 'selected' : ''}>${alt.name} (★ ${alt.rating})</option>
                    `).join("")}
                  </select>
                </div>
              ` : `
                <span style="font-size:11px;font-weight:800;color:#15803d;background:#ecfdf5;padding:3px 8px;border-radius:5px;border:1px solid #bbf7d0;">
                  ACTIVE IN SOURCING
                </span>
              `}
            </div>

            <h3 class="plan-supplier-title">${h(plan.revised.supplierName)}</h3>
            <div class="plan-supplier-meta">📍 ${h(plan.revised.location)} • <b style="color:#15803d">★ ${plan.revised.rating.toFixed(1)} Verified Quality</b></div>

            <div class="plan-items-table" style="background:#fafffa;border-color:#bbf7d0;">
              <div style="display:flex;justify-content:space-between;font-size:10px;font-weight:800;text-transform:uppercase;color:#166534;margin-bottom:6px;">
                <span>Substitution Materials (Equivalent Spec):</span>
                <span>${h(plan.revised.inventoryStock)}</span>
              </div>
              ${(order.items || []).map(it => `
                <div class="plan-item-row">
                  <span>${h(it.name)} × ${it.quantity} ${h(it.unit)} <small style="display:block;color:#15803d;font-weight:700;">✓ In-stock dispatch verified</small></span>
                  <b>${cash(Math.round((it.indicativeSubtotal || (it.quantity * it.indicativeUnitPrice)) * ((alternativePool[plan.revised.supplierId] || {}).rateModifier || 1)))}</b>
                </div>
              `).join("")}
            </div>

            <div class="plan-cost-summary" style="background:#fafffa;border-color:#bbf7d0;">
              <div class="plan-cost-line"><span>Revised Material Subtotal:</span><b>${cash(plan.revised.subtotal)}</b></div>
              <div class="plan-cost-line"><span>Recalculated Freight (Regional Depot):</span><b>${cash(plan.revised.deliveryFee)}</b></div>
              <div class="plan-cost-line total-line"><span>Revised Total Cost:</span><b>${cash(plan.revised.total)}</b></div>
            </div>
          </div>

          <div class="plan-timeline-box">
            <div>
              <b>${isAudit ? 'Confirmed Site Delivery:' : 'New Guaranteed Delivery:'}</b>
              <div style="font-size:11px;font-weight:700;margin-top:2px;">${h(plan.revised.eta)} (${h(plan.revised.milestoneStatus)})</div>
            </div>
            <span style="font-size:20px;">⚡</span>
          </div>
        </div>

      </div>

      <!-- Metric Delta Strip -->
      <div class="metric-delta-strip">
        <div class="metric-delta-card">
          <div class="metric-delta-label">Additional Cost (Delta)</div>
          <div class="metric-delta-value cost">+${cash(plan.delta.cost)} (+${plan.delta.costPct}%)</div>
          <div class="metric-delta-detail">Material variance: +${cash(plan.delta.materialDelta)} • Freight delta: +${cash(plan.delta.freightDelta)}</div>
        </div>

        <div class="metric-delta-card">
          <div class="metric-delta-label">Expected Delay &amp; Deadline</div>
          <div class="metric-delta-value schedule">0 Days Delay</div>
          <div class="metric-delta-detail">Arrives Thursday • 19.5 Hours AHEAD of Friday Milestone!</div>
        </div>

        <div class="metric-delta-card">
          <div class="metric-delta-label">Engineering Compliance</div>
          <div class="metric-delta-value risk">100% IS 1786</div>
          <div class="metric-delta-detail">Fe 550D Batch Lab Tested • Griha / IGBC Level 4</div>
        </div>
      </div>

      <!-- Recommendation Rationale Box -->
      <div class="recommendation-rationale-box">
        <h4>💡 Explainable Recommendation Rationale</h4>
        <p>${h(plan.revised.rationale)}</p>
      </div>

      <!-- Audit Trail Timeline (Visible in audit mode) -->
      ${isAudit ? `
        <div style="margin:14px 0 0;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 16px;">
          <div style="font-size:11px;font-weight:800;color:#475569;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">
            📋 Autonomous Recovery Audit Timeline
          </div>
          ${auditTrailItems.map(item => `
            <div style="display:flex;align-items:flex-start;gap:10px;font-size:11.5px;margin-bottom:6px;">
              <span style="color:#059669;font-weight:800;">✓</span>
              <div>
                <b style="color:#0f172a;">${h(item.event)}</b> &bull; <small style="color:#64748b;">${new Date(item.timestamp).toLocaleString('en-IN')}</small>
                <div style="color:#334155;margin-top:2px;">${h(item.details)}</div>
              </div>
            </div>
          `).join("")}
        </div>
      ` : ''}

      <!-- Action Bar -->
      <div class="recovery-actions-bar">
        ${isAudit ? `
          <div style="display:flex;justify-content:space-between;align-items:center;width:100%;flex-wrap:wrap;gap:12px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:22px;">🛡️</span>
              <div>
                <b style="font-size:12.5px;color:#0f172a;">Recovery Plan Authorized by Builder &amp; Active in Sourcing</b>
                <p style="margin:2px 0 0;font-size:11px;color:#64748b;">Substituted partner dispatch confirmed. Site operations protected against concrete curing delay.</p>
              </div>
            </div>
            <button type="button" class="primary" style="background:#0f766e;border-color:#0d5e56;padding:8px 20px;border-radius:7px;font-size:12px;font-weight:700;" onclick="document.getElementById('failureRecoveryModal').remove()">
              Close Audit Log
            </button>
          </div>
        ` : `
          <div class="recovery-lock-notice">
            <span>🔒</span>
            <span><b>Buyer Approval Required:</b> BuildAI will not modify your confirmed purchase plan or commit company funds without your explicit authorization.</span>
          </div>
          
          <div class="recovery-buttons-row">
            <button type="button" class="recovery-decline-btn" onclick="document.getElementById('failureRecoveryModal').remove();if(typeof toast==='function')toast('Substitution declined. Order remains in original delayed state.');">
              ✕ Keep Original Plan (Accept 4-Day Site Delay)
            </button>
            <button type="button" class="recovery-approve-btn" onclick="approveFailureRecovery('${order.id}', '${plan.revised.supplierId}')">
              ✓ Authorize Revised Plan &amp; Substitute to ${h(plan.revised.supplierName)} (${cash(plan.revised.total)}) →
            </button>
          </div>
        `}
      </div>

    </div>
  `;

  document.body.appendChild(modal);
  modal.addEventListener("click", e => { if(e.target === modal) modal.remove(); });
}

async function approveFailureRecovery(orderId, newSupplierId){
  const records = getRequests();
  const at = records.findIndex(r => r.id === orderId);
  if(at < 0){
    if(typeof toast === "function") toast("Order not found.");
    return;
  }

  const order = records[at];
  const oldSupplierName = order.supplierName;
  const oldSupplierId = order.supplierId;
  const plan = calculateFailureRecoveryPlan(order, newSupplierId);
  const newSupplier = alternativePool[newSupplierId] || alternativePool.lakshmi;

  // Preserve original metrics before mutation
  order.originalSupplierId = order.originalSupplierId || oldSupplierId || normalizeSupplierId(order.supplierId);
  order.originalSupplierName = order.originalSupplierName || oldSupplierName;
  order.originalSubtotal = order.originalSubtotal || order.indicativeSubtotal;
  order.originalDeliveryFee = order.originalDeliveryFee || order.indicativeDeliveryFee;
  order.originalTotal = order.originalTotal || order.indicativeTotal;

  // Atomically update order
  order.supplierId = newSupplier.id;
  order.supplierName = newSupplier.name;
  order.indicativeSubtotal = plan.revised.subtotal;
  order.indicativeDeliveryFee = plan.revised.deliveryFee;
  order.indicativeTotal = plan.revised.total;
  order.supplierQuote = plan.revised.total;
  order.status = "Order confirmed (Substituted via Recovery Engine)";
  order.updatedAt = new Date().toISOString();
  order.supplierNote = "DISPATCH SCHEDULED: Re-routed from " + oldSupplierName + " due to stockout. Inventory allocated from Rangapuram depot. Delivery confirmed for Thursday Oct 29, 3:30 PM.";
  
  if(!order.auditTrail) order.auditTrail = [];
  order.auditTrail.push({
    timestamp: new Date().toISOString(),
    event: "SUPPLIER_SUBSTITUTION_APPROVED",
    details: "Builder approved Failure Recovery plan. Substituted from " + oldSupplierName + " to " + newSupplier.name + ". Extra cost: ₹" + plan.delta.cost + ". Delivery secured for Thursday 3:30 PM (19.5h ahead of milestone)."
  });

  // Clear failure flag
  order.failureResolved = true;

  putJson(STORE_REQUESTS, records);

  // Sync with live server API and verify response
  try {
    const res = await fetch("/api/requests/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });
    if(!res.ok){
      console.warn("Failed to synchronize approved substitution with server (HTTP " + res.status + ").");
    } else {
      const data = await res.json();
      if(data.request) {
        records[at] = data.request;
      }
    }
  } catch(e){
    console.warn("Network notice: persisted locally first.");
  }

  const m = document.getElementById("failureRecoveryModal");
  if(m) m.remove();

  if(typeof renderBuyerRequestsModal === "function") renderBuyerRequestsModal();
  if(typeof renderSupplierWorkspace === "function") renderSupplierWorkspace();
  if(typeof updateRecoveryStatusButton === "function") updateRecoveryStatusButton();

  if(typeof toast === "function"){
    toast("Plan authorized! Order substituted to " + newSupplier.name + ". Thursday delivery secured.");
  }
}

// --- REAL-TIME ALERT ENGINE ON ACTIVE BUILDER SCREEN ---
// (_notifiedFailures and _builderLiveSyncTimer declared at top of closure)

function renderRealtimeDisruptionAlert(order){
  const old = document.getElementById("realtimeDisruptionAlert");
  if(old) old.remove();

  const fail = order.failure || {};
  const alertEl = document.createElement("div");
  alertEl.id = "realtimeDisruptionAlert";
  alertEl.className = "realtime-disruption-popup";
  alertEl.innerHTML = `
    <div class="disruption-popup-inner">
      <div style="font-size:32px;line-height:1;">🚨</div>
      <div style="flex:1;">
        <span class="recovery-badge-pill" style="font-size:10px;padding:3px 9px;margin-bottom:4px;">REAL-TIME SUPPLIER DISRUPTION ALERT</span>
        <h3 style="margin:4px 0 3px;font-size:15px;color:#991b1b;font-weight:800;">${h(order.supplierName)} reported ${h((fail.type || 'Fulfillment Failure').toUpperCase())}</h3>
        <p style="margin:0 0 6px;font-size:12px;color:#7f1d1d;line-height:1.45;font-weight:600;">
          Project: <b>${h(order.projectName)}</b><br>
          ${h(fail.reason || 'Supplier cannot deliver required materials on time.')}
        </p>
        <div style="font-size:11.5px;color:#9a3412;font-weight:700;">
          ⚠️ Milestone at Risk: ${h(fail.milestone || 'Friday Slab Pour')} (+${fail.delayDays || 4} days delay)<br>
          <span style="color:#15803d;">✓ BuildAI Alternative Identified: <b>Lakshmi Steel</b> (Guaranteed Delivery Thursday)</span>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;">
        <button type="button" class="recovery-trigger-btn" onclick="document.getElementById('realtimeDisruptionAlert').remove();showFailureRecoveryModal('${order.id}')">
          ⚡ Review Revised Plan &amp; Authorize Substitution →
        </button>
        <button type="button" style="background:transparent;border:none;color:#991b1b;font-size:11px;font-weight:700;cursor:pointer;padding:4px;" onclick="document.getElementById('realtimeDisruptionAlert').remove()">
          Dismiss (Track in Orders)
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(alertEl);
}

function checkLocalDisruptions(){
  const session = getSession();
  if(!session || session.role !== "builder") return;
  const local = getRequests();
  const unresolved = local.find(r => r.failure && !r.failureResolved);
  if(unresolved && !_notifiedFailures.has(unresolved.id)){
    _notifiedFailures.add(unresolved.id);
    renderRealtimeDisruptionAlert(unresolved);
  }
}
function startBuilderLiveSync(){
  if(_builderLiveSyncTimer) clearInterval(_builderLiveSyncTimer);
  checkLocalDisruptions();
  _builderLiveSyncTimer = setInterval(async () => {
    const session = getSession();
    if(!session || session.role !== "builder") return;
    try {
      const res = await fetch("/api/requests");
      if(!res.ok) return;
      const data = await res.json();
      if(data && Array.isArray(data.requests)){
        const local = getRequests();
        let stateChanged = false;

        data.requests.forEach(serverReq => {
          const locIdx = local.findIndex(lr => lr.id === serverReq.id);
          if(locIdx >= 0){
            const locReq = local[locIdx];
            // Detect if server has newly reported failure that hasn't been notified
            if(serverReq.failure && !serverReq.failureResolved){
              if(!locReq.failure || locReq.failureResolved || serverReq.updatedAt > locReq.updatedAt){
                local[locIdx] = serverReq;
                stateChanged = true;
                if(!_notifiedFailures.has(serverReq.id)){
                  _notifiedFailures.add(serverReq.id);
                  renderRealtimeDisruptionAlert(serverReq);
                }
              }
            } else if(serverReq.failureResolved && !locReq.failureResolved){
              local[locIdx] = serverReq;
              stateChanged = true;
            }
          } else {
            local.push(serverReq);
            stateChanged = true;
          }
        });

        if(stateChanged){
          putJson(STORE_REQUESTS, local);
          updateRecoveryHeaderBadge();
          const openModal = document.getElementById("buyerRequestModal");
          if(openModal){
            showBuyerRequests();
          }
        }
      }
    } catch(e){}
  }, 2500);
}

function updateRecoveryHeaderBadge(){
  const actions = document.querySelector(".top-actions");
  if(!actions) return;
  const records = getRequests();
  const pendingRecovery = records.filter(r => r.failure && !r.failureResolved);
  let btn = document.getElementById("recoveryHeaderBtn");
  if(!btn){
    btn = document.createElement("button");
    btn.id = "recoveryHeaderBtn";
    btn.type = "button";
    actions.prepend(btn);
  }
  
  if(pendingRecovery.length > 0){
    btn.className = "header-link recovery-header-pill";
    btn.innerHTML = `⚡ <span>Recovery Action Required (${pendingRecovery.length})</span>`;
    btn.onclick = () => showFailureRecoveryModal(pendingRecovery[0].id);
    btn.style.display = "inline-flex";
  } else {
    btn.style.display = "none";
  }
}

window.calculateFailureRecoveryPlan = calculateFailureRecoveryPlan;
window.showFailureRecoveryModal = showFailureRecoveryModal;
window.approveFailureRecovery = approveFailureRecovery;

window.updateRecoveryHeaderBadge = updateRecoveryHeaderBadge;


// --- 4. AUTOMATIC NOTIFICATIONS CENTER ---
let notifications = JSON.parse(localStorage.getItem("buildai_notifications") || "[]");
if(!notifications.length){
  notifications = [
    {
      id: "NOTIF-1",
      title: "Supplier Quotation Received",
      body: "Lakshmi Steel submitted confirmed quote ₹1,04,500 for Green Valley Villa Foundation Phase 1.",
      time: "10 mins ago",
      type: "quote",
      unread: true
    },
    {
      id: "NOTIF-2",
      title: "Dispatched & Out for Delivery",
      body: "Order #BA-20261025091500 is in transit via Tata 407 (TN-23-AB-4412). Driver Murugan (+91 94421 99182) arriving Katpadi site.",
      time: "45 mins ago",
      type: "dispatch",
      unread: true
    },
    {
      id: "NOTIF-3",
      title: "Material Price Update",
      body: "UltraTech 53 Grade High-Strength OPC Cement adjusted to ₹425/bag at Arcot Road Depot.",
      time: "2 hours ago",
      type: "price",
      unread: false
    }
  ];
  localStorage.setItem("buildai_notifications", JSON.stringify(notifications));
}

function addNotification(title, body, type){
  notifications.unshift({
    id: "NOTIF-" + Date.now(),
    title: title,
    body: body,
    time: "Just now",
    type: type || "system",
    unread: true
  });
  localStorage.setItem("buildai_notifications", JSON.stringify(notifications));
  updateNotifBadge();
}

function updateNotifBadge(){
  const btn = $("notifHeaderBtn");
  if(!btn) return;
  const unreadCount = notifications.filter(n => n.unread).length;
  btn.innerHTML = `🔔 <span>Notifications ${unreadCount ? `<b class="notif-pill">${unreadCount}</b>` : ''}</span>`;
}

function showNotificationsModal(){
  const old = $("notifModal");
  if(old) old.remove();

  notifications.forEach(n => n.unread = false);
  localStorage.setItem("buildai_notifications", JSON.stringify(notifications));
  updateNotifBadge();

  const modal = document.createElement("div");
  modal.id = "notifModal";
  modal.className = "buyer-request-modal notif-modal-backdrop";
  modal.innerHTML = `
    <div class="buyer-request-dialog notif-dialog" role="dialog" aria-modal="true">
      <div class="buyer-request-dialog-head">
        <div>
          <h2>🔔 Notification Center</h2>
          <small style="color:#64748b">Real-time alerts, supplier responses & dispatch tracking</small>
        </div>
        <button type="button" class="shop-close" onclick="document.getElementById('notifModal').remove()">×</button>
      </div>
      
      <div class="notif-channels-bar">
        <span class="channel-pill active">📱 WhatsApp: Connected (+91 98421 55201)</span>
        <span class="channel-pill active">💬 SMS: Active</span>
        <span class="channel-pill active">📧 Email: builder@buildai.demo</span>
      </div>
      
      <div class="notif-list">
        ${notifications.map(n => `
          <div class="notif-card ${n.type}">
            <div class="notif-head-row">
              <b>${n.title}</b>
              <small>${n.time}</small>
            </div>
            <p>${n.body}</p>
          </div>
        `).join("")}
      </div>
      
      <div class="notif-footer">
        <button type="button" class="secondary full" onclick="showBuyerRequests();document.getElementById('notifModal').remove();">View All Active Orders in Request Tracker →</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}
window.showNotificationsModal = showNotificationsModal;

// --- 5. DELIVERY-ADDRESS & CONSTRUCTION SITES MANAGEMENT ---
let savedSites = [];

function fetchSavedSites(){
  fetch("/api/sites").then(r => r.json()).then(d => {
    if(d && Array.isArray(d.sites) && d.sites.length){
      savedSites = d.sites;
    }
  }).catch(() => {
    savedSites = [
      {
        id: "SITE-001",
        name: "Green Valley Villa - Phase 1",
        plot: "Plot 42, Green Valley Enclave, Katpadi",
        city: "Vellore",
        pincode: "632014",
        landmark: "Near VIT Main Gate",
        contactName: "Er. K. Senthil",
        contactPhone: "+91 98421 55201",
        accessType: "heavy",
        isDefault: true
      },
      {
        id: "SITE-002",
        name: "Arcot Road Commercial Complex",
        plot: "No. 18/2, Arcot Main Road, Kagithapatrai",
        city: "Vellore",
        pincode: "632012",
        landmark: "Opposite Government Bus Depot",
        contactName: "Er. R. Murali",
        contactPhone: "+91 94432 88190",
        accessType: "medium",
        isDefault: false
      }
    ];
  });
}
fetchSavedSites();

function showSiteManagerModal(){
  const old = $("sitesModal");
  if(old) old.remove();

  const modal = document.createElement("div");
  modal.id = "sitesModal";
  modal.className = "buyer-request-modal sites-modal-backdrop";
  
  function getAccessBadge(type){
    if(type === "heavy") return '<span class="access-pill heavy">🟢 10-Wheeler Tipper Accessible (>30ft Road)</span>';
    if(type === "medium") return '<span class="access-pill medium">🟡 6-Wheeler Lorry Accessible (>20ft Road)</span>';
    return '<span class="access-pill light">🟠 Mini Commercial (Tata Ace) Only (<15ft Street)</span>';
  }

  modal.innerHTML = `
    <div class="buyer-request-dialog sites-dialog" role="dialog" aria-modal="true">
      <div class="buyer-request-dialog-head">
        <div>
          <h2>⌖ Construction Sites & Delivery Addresses</h2>
          <small style="color:#64748b">Manage project delivery destinations and vehicle road access</small>
        </div>
        <button type="button" class="shop-close" onclick="document.getElementById('sitesModal').remove()">×</button>
      </div>
      
      <div class="sites-list">
        ${savedSites.map(s => `
          <div class="site-card ${s.isDefault ? 'default-site' : ''}">
            <div class="site-card-head">
              <h4>${s.name} ${s.isDefault ? '<span class="default-chip">ACTIVE SITE</span>' : ''}</h4>
              ${getAccessBadge(s.accessType)}
            </div>
            <p><b>Address:</b> ${s.plot}, ${s.landmark}, ${s.city} - ${s.pincode}</p>
            <p><b>Site In-Charge:</b> ${s.contactName} (${s.contactPhone})</p>
            <div class="site-card-actions">
              ${!s.isDefault ? `<button type="button" class="secondary small-btn" onclick="setDefaultSite('${s.id}')">Set as Active Destination</button>` : '<span style="color:#15803d;font-weight:700">✓ Default destination for orders</span>'}
            </div>
          </div>
        `).join("")}
      </div>
      
      <div class="add-site-section">
        <h3>➕ Register New Construction Site</h3>
        <div class="add-site-grid">
          <div class="field"><label>Project / Site Name</label><input id="newSiteName" placeholder="e.g. Gandhi Nagar Heights"></div>
          <div class="field"><label>Plot / Door & Street</label><input id="newSitePlot" placeholder="No. 45, 2nd Cross Street"></div>
          <div class="field"><label>Landmark</label><input id="newSiteLandmark" placeholder="Near Apollo Pharmacy"></div>
          <div class="field"><label>City & Pincode</label><input id="newSiteCity" value="Vellore - 632006"></div>
          <div class="field"><label>Site Supervisor Name</label><input id="newSiteContact" placeholder="Er. Name"></div>
          <div class="field"><label>Supervisor Mobile</label><input id="newSitePhone" placeholder="+91 XXXXX XXXXX"></div>
          <div class="field" style="grid-column: 1 / -1">
            <label>Truck Accessibility (Road Width)</label>
            <select id="newSiteAccess">
              <option value="heavy">Road Width > 30ft: Full 10-Wheeler Heavy Tippers Allowed</option>
              <option value="medium">Road Width 20-30ft: 6-Wheeler Medium Commercial Lorries</option>
              <option value="light">Road Width < 15ft: Narrow Street - Mini Truck / Tata Ace Required</option>
            </select>
          </div>
        </div>
        <button type="button" class="primary full" id="saveSiteBtn">Save Construction Site →</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  $("saveSiteBtn").onclick = () => {
    const name = $("newSiteName").value.trim();
    const plot = $("newSitePlot").value.trim();
    if(!name || !plot){
      alert("Please fill site name and plot address.");
      return;
    }
    const newSite = {
      id: "SITE-" + Date.now(),
      name: name,
      plot: plot,
      landmark: $("newSiteLandmark").value.trim() || "Vellore",
      city: $("newSiteCity").value.trim() || "Vellore",
      pincode: "632001",
      contactName: $("newSiteContact").value.trim() || "Er. In-Charge",
      contactPhone: $("newSitePhone").value.trim() || "+91 98421 00000",
      accessType: $("newSiteAccess").value,
      isDefault: false
    };
    savedSites.push(newSite);
    try {
      fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSite)
      }).catch(()=>{});
    } catch(e){}
    modal.remove();
    showSiteManagerModal();
    if(typeof toast === "function") toast("Construction site registered successfully!");
  };
}
window.showSiteManagerModal = showSiteManagerModal;

window.setDefaultSite = function(siteId){
  savedSites.forEach(s => s.isDefault = (s.id === siteId));
  const active = savedSites.find(s => s.id === siteId);
  if(active && typeof toast === "function"){
    toast("Active destination set to: " + active.name);
  }
  const m = $("sitesModal"); if(m) m.remove();
  showSiteManagerModal();
};

// --- 6. CONSTRUCTION SERVICES & CONTRACTOR MARKETPLACE ---
let cachedServices = [];

function fetchServices(){
  fetch("/api/services").then(r => r.json()).then(d => {
    if(d && Array.isArray(d.services) && d.services.length){
      cachedServices = d.services;
    }
  }).catch(() => {
    cachedServices = [
      {
        id: "SRV-001",
        title: "RCC Slab Casting & Formwork Contractors",
        contractor: "Sri Murugan Structural Formwork",
        rate: "₹38 - ₹45 per sq.ft",
        teamSize: "18 skilled masons & fitters",
        equipment: "Concrete mixer, needle vibrators, steel props & shuttering ply",
        rating: 4.8,
        reviewsCount: 42,
        experience: "14 years in Vellore & Ranipet",
        specialty: "High-finish RCC roof casting, beams, and column footings",
        verified: true,
        phone: "+91 98423 77102"
      },
      {
        id: "SRV-002",
        title: "Precision AAC Block & Red Clay Masonry Team",
        contractor: "Vellore Brickcraft Guild",
        rate: "₹28 per sq.ft (AAC) / ₹18 per block",
        teamSize: "12 certified masons",
        equipment: "Laser alignment levelers, block cutters, mortar mixers",
        rating: 4.7,
        reviewsCount: 35,
        experience: "9 years",
        specialty: "Zero-joint thin bed mortar AAC masonry and exposed wirecut bricks",
        verified: true,
        phone: "+91 94431 66205"
      },
      {
        id: "SRV-003",
        title: "JCB 3DX & Poclain Earthmoving & Excavation",
        contractor: "Annai Earthmovers & Tipper Fleet",
        rate: "₹1,250 per hour / ₹9,500 per day",
        teamSize: "4 operators + 2 tippers (10-wheel)",
        equipment: "JCB 3DX Super (2024 Model), breaker attachment, 14m3 Tipper",
        rating: 4.9,
        reviewsCount: 58,
        experience: "16 years",
        specialty: "Basement excavation, rock breaking, site leveling and filling",
        verified: true,
        phone: "+91 97914 88320"
      },
      {
        id: "SRV-004",
        title: "A-Grade Licensed Electrical Contracting & Piping",
        contractor: "PowerTech Engineering Services",
        rate: "₹22 - ₹30 per sq.ft of slab area",
        teamSize: "8 licensed electricians",
        equipment: "Wall chaser groove cutters, conduit benders, earth testers",
        rating: 4.8,
        reviewsCount: 29,
        experience: "11 years",
        specialty: "Under-slab conduit casting, 3-phase DB panel installation, earthing",
        verified: true,
        phone: "+91 98425 11984"
      },
      {
        id: "SRV-005",
        title: "CPVC & Drainage Plumbing Infrastructure Team",
        contractor: "Royal Flow Plumbing Contractors",
        rate: "₹8,500 - ₹12,000 per toilet/bathroom unit",
        teamSize: "6 master plumbers",
        equipment: "Pipe fusion welding machines, pressure testing pump, drain snakes",
        rating: 4.6,
        reviewsCount: 31,
        experience: "12 years",
        specialty: "Astral CPVC concealed piping, SWR soil waste stack, overhead tanks",
        verified: true,
        phone: "+91 94435 77219"
      },
      {
        id: "SRV-006",
        title: "Terrace PU & Basement Waterproofing Applicators",
        contractor: "Apex Seal Waterproofing Specialists",
        rate: "₹45 - ₹65 per sq.ft (Material + Labour)",
        teamSize: "10 certified applicators",
        equipment: "Airless spray machines, surface scarifiers, injection grouters",
        rating: 4.9,
        reviewsCount: 47,
        experience: "10 years (Dr. Fixit & Fosroc Certified)",
        specialty: "10-Year warranty polymer terrace coatings, bathroom sunken waterproofing",
        verified: true,
        phone: "+91 97891 44520"
      }
    ];
  });
}
fetchServices();

function showServicesMarketplaceModal(){
  const old = $("servicesModal");
  if(old) old.remove();

  const modal = document.createElement("div");
  modal.id = "servicesModal";
  modal.className = "buyer-request-modal services-modal-backdrop";
  modal.innerHTML = `
    <div class="buyer-request-dialog services-dialog" role="dialog" aria-modal="true">
      <div class="buyer-request-dialog-head">
        <div>
          <h2>👷 Construction Services & Specialized Contractors</h2>
          <small style="color:#64748b">Verified Vellore region execution teams, civil labour, excavation & MEP contracting</small>
        </div>
        <button type="button" class="shop-close" onclick="document.getElementById('servicesModal').remove()">×</button>
      </div>
      
      <div class="services-grid">
        ${cachedServices.map(s => `
          <div class="service-card">
            <div class="service-head-row">
              <span class="service-category-tag">Contractor Team</span>
              <span class="service-rating-badge">★ ${s.rating.toFixed(1)} (${s.reviewsCount} jobs)</span>
            </div>
            <h3>${s.title}</h3>
            <div class="service-contractor-name">🏢 ${s.contractor} · <span style="color:#15803d">✓ Verified Trade Partner</span></div>
            
            <div class="service-meta-box">
              <div class="srv-meta-item"><span>Standard Rate:</span><b>${s.rate}</b></div>
              <div class="srv-meta-item"><span>Team Size:</span><b>${s.teamSize}</b></div>
              <div class="srv-meta-item"><span>Experience:</span><b>${s.experience}</b></div>
              <div class="srv-meta-item"><span>Specialty:</span><b>${s.specialty}</b></div>
              <div class="srv-meta-item"><span>Equipment:</span><b>${s.equipment}</b></div>
            </div>
            
            <div class="service-card-actions">
              <a href="tel:${s.phone}" class="secondary small-btn" style="text-decoration:none">📞 Call Directly</a>
              <button type="button" class="primary small-btn" onclick="inquireService('${s.id}', '${s.title}', '${s.contractor}')">📋 Request Formal Quote →</button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}
window.showServicesMarketplaceModal = showServicesMarketplaceModal;

function inquireService(srvId, srvTitle, contractorName){
  const name = prompt("Enter your Name & Site Area (e.g. 'Er. Rajesh - 2400 sq.ft RCC Slab at Katpadi'):");
  if(!name) return;
  const phone = prompt("Enter Contact Mobile Number:", "+91 98421 55201");
  if(!phone) return;

  fetch("/api/services/inquire", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      serviceId: srvId,
      clientName: name,
      clientPhone: phone,
      projectScope: srvTitle
    })
  }).catch(()=>{});

  addNotification("Service Quotation Request Sent", "Your request for " + srvTitle + " was forwarded to " + contractorName + ". Contractor will call " + phone + " within 2 hours.", "service");
  if(typeof toast === "function") toast("Quotation request sent to " + contractorName + "!");
}
window.inquireService = inquireService;


// --- DELIVERY STATUS HELPERS ---
function markOrderDelivered(orderId){
  const records = getRequests();
  const at = records.findIndex(r => String(r.id) === String(orderId));
  if(at === -1) return;

  records[at].status = "Delivered";
  records[at].updatedAt = new Date().toISOString();
  putJson(STORE_REQUESTS, records);

  try {
    fetch("/api/requests/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(records[at])
    }).catch(() => {});
  } catch(e){}

  if(typeof toast === "function"){
    toast("Order marked as Delivered ✓");
  }

  const session = getSession();
  if(session && session.role === "supplier"){
    if(typeof renderSupplierDashboard === "function") renderSupplierDashboard(session);
  } else {
    if(typeof showBuyerRequests === "function") showBuyerRequests();
  }
}

window.markOrderDelivered = markOrderDelivered;

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initAuth);else initAuth();
})();