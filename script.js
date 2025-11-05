// ===== Frannywald – ふわっと飛ぶフクロウ =====
// 調整しやすいパラメータを上にまとめておく
const FW = {
liftRatio: 0.45, // 中継点の位置（0.0〜1.0） 0.45で“ふわっと”
liftHeight: 90, // 中継点でどれだけ上げるか(px)
step1: 900, // 1段目（ふわっと上へ）ms
step2: 1100, // 2段目（ポータルへ吸い込まれる）ms
shrink: 0.35, // 吸い込まれながらの縮小率（元画像に対して）
fadeTo: 0.15 // 吸い込み時の透明度
};

$(function(){
const $portal = $('.portal');

$('.owl').on('click', function(){
const $img = $(this);

// 1) 元の位置とサイズ
const start = $img.offset();
const w = $img.outerWidth();
const h = $img.outerHeight();

// 2) クローンを作成して絶対配置（元画像は残す）
const $clone = $img.clone().css({
position: 'absolute', left: start.left, top: start.top,
width: w, height: h, margin: 0, zIndex: 10,
borderRadius: $img.css('border-radius'),
boxShadow: '0 10px 24px rgba(0,0,0,.45)'
}).appendTo('body');

// 3) 目標（ポータル中心）座標を計算
const p = $portal.offset();
const pw = $portal.outerWidth();
const ph = $portal.outerHeight();
const targetLeft = p.left + pw/2 - w/2;
const targetTop = p.top + ph/2 - h/2;

// 4) 中継点（直線のFW.liftRatio地点を少し上に持ち上げる）
const midLeft = start.left + (targetLeft - start.left) * FW.liftRatio;
const midTop = start.top + (targetTop - start.top ) * FW.liftRatio - FW.liftHeight;

// 5) 1段目：ふわっと上へ
$clone.animate({ left: midLeft, top: midTop }, FW.step1, 'swing', function(){
// 6) 2段目：ポータルへ吸い込まれる + 小さく + フェード
$clone.animate({
left: targetLeft,
top: targetTop,
opacity: FW.fadeTo,
width: w * FW.shrink,
height: h * FW.shrink
}, FW.step2, 'swing', function(){
$clone.remove();
// 7) ポータルを一瞬きらり
$portal
.css({ boxShadow: '0 0 40px 18px rgba(124,244,193,.55), inset 0 0 28px rgba(255,255,255,.55)' })
.delay(160)
.queue(function(next){
$(this).css({ boxShadow: '0 0 22px 8px rgba(64,238,187,.35), inset 0 0 22px rgba(255,255,255,.25)' });
next();
});
});
});
});
});