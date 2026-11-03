(function(){
    const R = {KAL:'Kəlbəcər', LAC:'Laçın', QBA:'Qubadlı', ZAN:'Zəngilan', CAB:'Cəbrayıl', FUZ:'Füzuli', XVD:'Xocavənd', XCI:'Xocalı', SUS:'Şuşa', TAR:'Tərtər', AGM:'Ağdam'};
    const COL = ['#ef4444', '#f59e0b', '#10b981', '#38bdf8'];
    
    const T = [
        [0,'KAL',1],[0,'FUZ',1],[0,'CAB',1],[6,'TAR',1],[12,'TAR',2],[12,'XVD',1],
        [23,'ZAN',1],[26,'QBA',1],[41,'XCI',1],[42,'SUS',2],[43,'FUZ',2],[43,'CAB',2],
        [43,'ZAN',2],[43,'QBA',2],[43,'LAC',1],[45,'AGM',3],[46,'KAL',2],[47,'KAL',3],[47,'LAC',3]
    ];
    
    const ALL = ['SUS','XCI','XVD','FUZ','CAB','QBA','ZAN','LAC'];
    const N = 'Yeni ərazi elan olunmur.';
    const D = [
        ['Ermənistanın atəşinə cavab olaraq əks-hücum başlayır, hər iki ölkədə hərbi vəziyyət elan olunur. Murovdağ zirvəsi, Füzuli və Cəbrayılın ilk kəndləri azad edilir.',6,['KAL','FUZ','CAB']],
        ['Azərbaycanda qismən səfərbərlik elan edilir; cəbhəboyu döyüşlər davam edir.',0,[]],
        ['BMT Təhlükəsizlik Şurası qapalı iclas keçirir; atəşkəs çağırışlarına baxmayaraq döyüşlər sürür.',0,[]],
        ['Ağır artilleriya atışması; tərəflər bir-birinin yaşayış məntəqələrinin atəşə tutulduğunu bildirir.',0,[]],
        ['Mövqe döyüşləri davam edir. '+N,0,[]],['Cəbhəboyu atışmalar. '+N,0,[]],
        ['Tərtərdə Suqovuşan və Talış, Cəbrayılda 5, Füzulidə 1 kənd azad edilir.',8,['TAR','CAB','FUZ']],
        ['Cəbrayıl şəhəri və 9 kənd azad edilir. Gəncə raket atəşinə tutulur, Xankəndi də atəş altında olur.',10,['CAB']],
        ['Cəbrayılda Şıxalıağalı, Sarıcallı və Məzrə kəndləri azad edilir.',3,['CAB']],
        ['Mövqe döyüşləri. '+N,0,[]],['Cəbhəboyu atışmalar. '+N,0,[]],
        ['Şuşada Qazançı kilsəsi zədələnir; tərəflər fərqli izahat verir. '+N,0,[]],
        ['Hadrut qəsəbəsi və Sor (Xocavənd), Cəbrayıl, Füzuli və Tərtər kəndləri azad edilir.',9,['XVD','CAB','FUZ','TAR']],
        ['Moskvada razılaşma: 12:00-dan insani atəşkəs. Tərəflər dərhal bir-birini pozuntuda günahlandırır.',0,[]],
        ['Gəncəyə raket zərbəsində mülki şəxslər həlak olur (10 nəfər).',0,[]],
        ['Atəşkəs pozuntuları barədə qarşılıqlı ittihamlar; döyüşlər davam edir.',0,[]],
        ['Mövqe döyüşləri. '+N,0,[]],
        ['Füzulidə 3, Xocavəndin Bulutan, Məlikcanlı, Qırmızıqaya, Dağdöşü və Tağaser kəndləri azad edilir.',8,['FUZ','XVD']],
        ['Xocavəndin 4, Füzulinin Arış və Cəbrayılın Doşulu kəndləri azad edilir.',6,['XVD','FUZ','CAB']],
        ['Xocavəndin Xırmancıq, Ağbulaq və Axullu kəndləri azad edilir.',3,['XVD']],
        ['Füzuli şəhəri və 7 kənd azad edilir. Gəncəyə yeni zərbə (14 mülki ölü); yeni insani atəşkəs razılaşdırılır.',8,['FUZ']],
        ['Cəbrayılın Hacılı, Hacı İsaqlı kəndləri və Xudafərin qəsəbəsi azad edilir.',3,['CAB']],
        ['Cəbrayılın 11 kəndi azad edilir.',11,['CAB']],
        ['Zəngilan şəhəri azad edilir. Cəbrayıl, Füzuli və Xocavəndin 18 kəndi də azad olunur.',24,['ZAN','CAB','FUZ','XVD']],
        ['Zəngilanın Mincivan qəsəbəsi və 13 kəndi, Füzuli və Cəbrayılın 7 kəndi azad edilir.',21,['ZAN','FUZ','CAB']],
        ['Ağbənd qəsəbəsi azad edilir: İranla sərhədin 132 km-lik hissəsi nəzarətə keçir. Zəngilan, Füzuli və Cəbrayılda kəndlər azad olunur.',21,['ZAN','FUZ','CAB']],
        ['Qubadlının Zilanlı, Kürd Mahruzlu, Muğanlı, Alaqurşaq kəndləri; Xocavənd, Cəbrayıl və Zəngilanda 8 kənd azad edilir.',12,['QBA','XVD','CAB','ZAN']],
        ['Yeni yaşayış məntəqəsi rəsmi elan olunmur.',0,[]],
        ['Qubadlı şəhəri və 7 kəndi; Zəngilan və Cəbrayılda 9 kənd azad edilir.',17,['QBA','ZAN','CAB']],
        ['Cəbrayılın Çələbilər kəndi azad edilir. ABŞ vasitəçiliyi ilə yeni insani atəşkəs 08:00-da başlayır, pozulduğu bildirilir.',1,['CAB']],
        ['Döyüşlər davam edir. '+N,0,[]],
        ['Zəngilan, Qubadlı, Cəbrayıl və Füzulidə 12 kənd azad edilir. Bərdəyə raket zərbəsi: 21 mülki şəxs həlak olur (Ermənistan məsuliyyəti rədd edir).',12,['ZAN','QBA','CAB','FUZ']],
        [N,0,[]],
        ['Cəbrayıl, Zəngilan və Qubadlıda 9 kənd azad edilir; sərhəd zastavalarında bayraq qaldırılır.',9,['CAB','ZAN','QBA']],
        [N,0,[]],[N,0,[]],
        ['Cəbrayılda 2, Zəngilanda 2, Qubadlıda 3 kənd azad edilir.',7,['CAB','ZAN','QBA']],
        [N,0,[]],
        ['Cəbrayılda 2, Zəngilanda 2, Qubadlıda 3 kənd azad edilir.',7,['CAB','ZAN','QBA']],
        [N,0,[]],[N,0,[]],
        ['Xocalının Qarabulaq və Baharlı, Xocavəndin Ataqut və Hünərli kəndləri daxil olmaqla 16 yaşayış məntəqəsi azad edilir.',16,['XCI','XVD','FUZ','CAB','QBA','ZAN']],
        ['Şuşa şəhəri azad edilir; Prezident xalqa müraciətlə elan edir. Müharibənin taleyini həll edən gün.',1,['SUS']],
        ['Daşaltı, Xocalı, Xocavənd, Füzuli, Cəbrayıl, Qubadlı, Zəngilan və Laçının Güləbird, Səfiyan, Türklər kəndləri daxil olmaqla 70 məntəqə azad edilir. Gecə üçtərəfli bəyanat imzalanır.',70,ALL],
        ['Bəyanat Bakı vaxtı ilə 01:00-da qüvvəyə minir, atəş dayandırılır; Rusiya sülhməramlıları yerləşdirilir.',0,[]],
        ['Ağdam rayonu bəyanat əsasında Azərbaycana təhvil verilir.',1,['AGM']],
        ['Kəlbəcər rayonu bəyanat əsasında Azərbaycana təhvil verilir.',1,['KAL']],
        ['Laçın rayonu bəyanat əsasında Azərbaycana təhvil verilir.',1,['LAC']]
    ];
    const MON = ['yanvar','fevral','mart','aprel','may','iyun','iyul','avqust','sentyabr','oktyabr','noyabr','dekabr'];

    function date(i){
        const d = i <= 44 ? new Date(2020, 8, 27 + i) : i == 45 ? new Date(2020, 10, 20) : i == 46 ? new Date(2020, 10, 25) : new Date(2020, 11, 1);
        return d.getDate() + ' ' + MON[d.getMonth()] + ' 2020';
    }

    function head(i){
        return i < 44 ? '🇦🇿 Gün ' + (i + 1) : i == 44 ? '🇦🇿 Atəşkəs' : '🇦🇿 Müharibədən sonra';
    }

    const svg = document.getElementById('tl-svg'), src = document.querySelector('.maps .map-svg');
    svg.setAttribute('viewBox', '180 340 320 300');
    svg.innerHTML = src.innerHTML;

    svg.querySelectorAll('text').forEach(t => t.remove());

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svg.insertBefore(defs, svg.firstChild);

    // Qatların dəqiq ierarxiyası:
    const combatGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    combatGroup.setAttribute('id', 'combat-container');
    svg.appendChild(combatGroup);

    const outlineGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    outlineGroup.setAttribute('id', 'outline-container');
    svg.appendChild(outlineGroup);

    // Dronlar və partlayışlar həmişə outlinelardan ÜSTDƏ qalır
    const droneGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    droneGroup.setAttribute('id', 'drone-container');
    svg.appendChild(droneGroup);

    const textGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    textGroup.setAttribute('id', 'text-container');
    svg.appendChild(textGroup);

    const P = {};
    svg.querySelectorAll('path').forEach(p => {
        const k = p.id.replace('AZ-', '');
        p.removeAttribute('id');
        p.removeAttribute('style');
        p.style.fill = '#1c3b36';
        P[k] = p;

        const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
        clipPath.setAttribute('id', 'clip-' + k);
        clipPath.setAttribute('clipPathUnits', 'userSpaceOnUse');
        
        const clipNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        clipNode.setAttribute('d', p.getAttribute('d'));
        clipPath.appendChild(clipNode);
        defs.appendChild(clipPath);

        const outlinePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        outlinePath.setAttribute('d', p.getAttribute('d'));
        outlinePath.setAttribute('fill', 'none');
        outlinePath.setAttribute('stroke', '#0b0f19');
        outlinePath.setAttribute('stroke-width', '1.2');
        outlinePath.style.pointerEvents = 'none';
        outlineGroup.appendChild(outlinePath);
    });

    svg.querySelectorAll('style').forEach(e => e.remove());

    const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    tooltip.style.display = 'none';
    tooltip.style.pointerEvents = 'none';
    
    const tipBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    tipBg.setAttribute('rx', '4');
    tipBg.setAttribute('fill', '#0b0f19');
    tipBg.setAttribute('fill-opacity', '0.85');
    tipBg.setAttribute('stroke', '#38bdf8');
    tipBg.setAttribute('stroke-width', '1');
    
    const tipText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    tipText.setAttribute('fill', '#ffffff');
    tipText.setAttribute('font-size', '9px');
    tipText.setAttribute('font-family', 'sans-serif');
    tipText.setAttribute('text-anchor', 'middle');
    tipText.setAttribute('dominant-baseline', 'middle');
    
    tooltip.appendChild(tipBg);
    tooltip.appendChild(tipText);
    textGroup.appendChild(tooltip);

    Object.keys(R).forEach(k => {
        if(P[k]) {
            const b = P[k].getBBox();
            
            P[k].style.cursor = 'pointer';
            P[k].onmousemove = (e) => {
                tipText.textContent = R[k];
                const bbox = tipText.getBBox();
                tipBg.setAttribute('width', bbox.width + 10);
                tipBg.setAttribute('height', bbox.height + 6);
                tipBg.setAttribute('x', -bbox.width/2 - 5);
                tipBg.setAttribute('y', -bbox.height/2 - 3);
                
                const pt = svg.createSVGPoint();
                pt.x = e.clientX; pt.y = e.clientY;
                const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());
                
                tooltip.setAttribute('transform', `translate(${svgPt.x}, ${svgPt.y - 15})`);
                tooltip.style.display = 'block';
                P[k].style.opacity = '0.9';
            };
            P[k].onmouseout = () => {
                tooltip.style.display = 'none';
                P[k].style.opacity = '1';
            };


        }
    });

    const log = document.getElementById('tl-log'), rng = document.getElementById('tl-range');
    D.forEach((e, i) => {
        const r = document.createElement('div');
        r.innerHTML = '<span>' + head(i) + '</span><span>' + date(i) + '</span>';
        r.onclick = () => show(i);
        log.appendChild(r);
    });

    let cur = 0, timer = null;

    const WAR_END = 44;
    const SRC = {
        FUZ:[], CAB:['FUZ'], ZAN:['CAB'], QBA:['ZAN','CAB'], LAC:['QBA'],
        XVD:['FUZ','CAB'], XCI:['FUZ','XVD','AGM'], KAL:[], TAR:[], AGM:[], SUS:['XVD','XCI']
    };
    const ORG = {
        KAL:[0.95,0.50], LAC:[0.45,0.98], QBA:[0.85,0.85], ZAN:[0.90,0.90],
        CAB:[0.90,0.80], FUZ:[0.95,0.55], XVD:[0.50,0.95], XCI:[0.75,0.90],
        SUS:[0.60,0.95], TAR:[0.90,0.30], AGM:[0.95,0.50]
    };
    const FREE = Object.keys(P).filter(x => !R[x]);
    const ORGC = {};

    function borderOrigin(k){
        if (ORGC[k]) return ORGC[k];
        const path = P[k], L = path.getTotalLength();
        const srcKeys = FREE.concat(SRC[k] || []).filter(x => x !== k && P[x]);
        const all = [], hit = [];
        const n = 500;
        for (let j = 0; j < n; j++){
            const s = j / n * L, pt = path.getPointAtLength(s);
            all.push(pt);
            const p1 = path.getPointAtLength((s + 0.5) % L), p0 = path.getPointAtLength((s - 0.5 + L) % L);
            const tx = p1.x - p0.x, ty = p1.y - p0.y, m = Math.hypot(tx, ty) || 1;
            const nx = -ty / m, ny = tx / m;
            let found = false;
            [1.2, 2.5].forEach(d => [1, -1].forEach(sg => {
                if (found) return;
                const q = new DOMPoint(pt.x + nx * sg * d, pt.y + ny * sg * d);
                if (srcKeys.some(x => P[x].isPointInFill(q))) found = true;
            }));
            if (found) hit.push(pt);
        }
        let o;
        if (hit.length){
            const mx = hit.reduce((s, q) => s + q.x, 0) / hit.length;
            const my = hit.reduce((s, q) => s + q.y, 0) / hit.length;
            o = hit.reduce((best, q) => Math.hypot(q.x-mx, q.y-my) < Math.hypot(best.x-mx, best.y-my) ? q : best);
        } else {
            const bb = path.getBBox(), f = ORG[k] || [0.9, 0.5];
            o = {x: bb.x + bb.width * f[0], y: bb.y + bb.height * f[1]};
        }
        const far = all.reduce((mx, q) => Math.max(mx, Math.hypot(q.x - o.x, q.y - o.y)), 0);
        return ORGC[k] = {x: o.x, y: o.y, far};
    }

    function advance(k, i){
        const ev = T.filter(t => t[1] === k).sort((a,b) => a[0]-b[0]);
        let cur = null, next = null;
        ev.forEach(t => { if(t[0] <= i) cur = t; else if(!next) next = t; });
        if(!cur || (cur[2] !== 1 && cur[2] !== 2)) return null;           
        const s = cur[0], hasEnd = !!next, e = hasEnd ? next[0] : WAR_END;
        let p = (i - s + 1) / (e - s + 1);
        p = Math.max(0.05, Math.min(1.0, p)); 
        const o = borderOrigin(k);
        const ox = o.x, oy = o.y, r = o.far * p;
        return {ox, oy, r, p};
    }

    // Partlayış səs effekti (Web Audio API)
    function playExplosionSound() {
        try {
            const audioCtx = (playExplosionSound.ctx = playExplosionSound.ctx || new (window.AudioContext || window.webkitAudioContext)());
            if (audioCtx.state === 'suspended') audioCtx.resume();
            
            const bufferSize = audioCtx.sampleRate * 0.4;
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = audioCtx.createBufferSource();
            noise.buffer = buffer;

            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(600, audioCtx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.4);

            const gain = audioCtx.createGain();
            gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtx.destination);

            noise.start();
            noise.stop(audioCtx.currentTime + 0.4);
        } catch(e) {}
    }

    // ===== BAYRAKTAR TB2: REAL ZƏRBƏ CƏDVƏLİ =====
    // [başlanğıc gün, son gün, rayon, hədəf nöqtəsi (rayon bbox-na nisbi x,y), izah, dəqiqlik]
    // Gün indeksi: 0 = 27 sentyabr ... 43 = 9 noyabr.
    // dəqiqlik:  'doc'    = mənbədə həm gün, həm yer dəqiq göstərilib
    //            'period' = mənbə yalnız dövrü/yeri göstərir, dəqiq gün bəlli deyil
    //            'mod'    = Müdafiə Nazirliyi videosu (dron tipi rəsmən qeyd olunmur)
    const STRIKES = [
        [0,  0,  'FUZ', [0.55, 0.80], 'Horadiz istiqaməti: 3 ədəd Strela-10 HHM sistemi məhv edilir', 'doc'],
        [3,  7,  'CAB', [0.65, 0.82], 'Araz vadisi (Nüzgar istiqaməti): artilleriya və BM-21 qurğuları vurulur', 'period'],
        [13, 20, 'FUZ', [0.50, 0.40], 'Füzuli uğrunda döyüşlər: artilleriya və texnika vurulur', 'period'],
        [21, 43, 'SUS', [0.50, 0.50], 'Şuşa istiqaməti: müdafiə mövqeləri bombalanır', 'period'],
        [26, 26, 'XVD', [0.45, 0.50], 'Xocavənd istiqaməti: canlı qüvvə və texnika vurulur', 'mod'],
        [26, 26, 'FUZ', [0.50, 0.45], 'Füzuli istiqaməti: canlı qüvvə və texnika vurulur', 'mod'],
        [29, 29, 'XVD', [0.45, 0.50], 'Xocavənd rayonunda "müdafiə naziri"nin avtomobili vurulur', 'doc'],
        [43, 43, 'XVD', [0.55, 0.40], 'Xocavənd istiqaməti: yaşayış binaları arasında Tor-M2KM məhv edilir (15:50)', 'doc']
    ];
    const STAND = 22;                     // TB2 hədəfin üstünə uçmur, məsafədən atəş açır
    const T_OUT = 1100, T_FIRE = 350, T_BACK = 1100, T_EXP = 450;

    function rnd(seed){ const s = Math.sin(seed * 12.9898) * 43758.5453; return s - Math.floor(s); }
    const ease = p => p < 0.5 ? 2*p*p : -1 + (4 - 2*p) * p;

    // Verilmiş nisbi nöqtə rayonun daxilindədirsə onu, deyilsə ən yaxın daxili nöqtəni qaytarır
    function insidePoint(k, fx, fy){
        const b = P[k].getBBox();
        const x0 = b.x + b.width * fx, y0 = b.y + b.height * fy;
        const ok = (x, y) => P[k].isPointInFill(new DOMPoint(x, y));
        if (ok(x0, y0)) return {x: x0, y: y0};
        let best = null, bd = 1e9;
        for (let a = 0; a <= 24; a++) for (let c = 0; c <= 24; c++){
            const x = b.x + b.width * a / 24, y = b.y + b.height * c / 24;
            if (!ok(x, y)) continue;
            const d = Math.hypot(x - x0, y - y0);
            if (d < bd){ bd = d; best = {x, y}; }
        }
        return best || {x: b.x + b.width / 2, y: b.y + b.height / 2};
    }

    // Dron işğal olunmayan (Azərbaycan nəzarətindəki) ən yaxın rayondan qalxır
    function baseFor(tgt){
        let best = null, bd = 1e9;
        FREE.forEach(k => {
            const b = P[k].getBBox(), d = Math.hypot(b.x + b.width/2 - tgt.x, b.y + b.height/2 - tgt.y);
            if (d < bd){ bd = d; best = k; }
        });
        return best ? insidePoint(best, 0.5, 0.5) : {x: 500, y: tgt.y};
    }

    function makeFlight(s, i, idx){
        const jit = s[1] > s[0] ? 0.14 : 0;   // çoxgünlük dövrdə hər gün fərqli nöqtə
        const cl = v => Math.max(0.05, Math.min(0.95, v));
        const fx = cl(s[3][0] + (rnd(i * 7 + idx + 1) - 0.5) * 2 * jit);
        const fy = cl(s[3][1] + (rnd(i * 11 + idx + 3) - 0.5) * 2 * jit);
        const tgt = insidePoint(s[2], fx, fy);
        const b0 = baseFor(tgt);
        let dx = tgt.x - b0.x, dy = tgt.y - b0.y;
        const dist = Math.hypot(dx, dy) || 1, ux = dx / dist, uy = dy / dist, len = Math.max(dist, 80);
        return {
            s, tgt, ux, uy, delay: idx * 380, sounded: false,
            base:  {x: tgt.x - ux * len,   y: tgt.y - uy * len},
            stand: {x: tgt.x - ux * STAND, y: tgt.y - uy * STAND}
        };
    }

    // t = uçuşun başlamasından keçən ms
    function flightState(f, t){
        const angOut = Math.atan2(f.uy, f.ux) * 180 / Math.PI + 90;
        if (t < 0) return {hide: true};
        if (t < T_OUT){
            const p = ease(t / T_OUT);
            return {x: f.base.x + (f.stand.x - f.base.x) * p, y: f.base.y + (f.stand.y - f.base.y) * p, ang: angOut, op: 1};
        }
        if (t < T_OUT + T_FIRE){
            const q = (t - T_OUT) / T_FIRE, m = q * q;
            return {x: f.stand.x, y: f.stand.y, ang: angOut, op: 1,
                    missile: {x: f.stand.x + (f.tgt.x - f.stand.x) * m, y: f.stand.y + (f.tgt.y - f.stand.y) * m}};
        }
        const e = t - T_OUT - T_FIRE;
        if (e >= T_BACK) return {done: true};
        const p = ease(e / T_BACK), turn = Math.min(1, e / 250);
        return {
            x: f.stand.x + (f.base.x - f.stand.x) * p, y: f.stand.y + (f.base.y - f.stand.y) * p,
            ang: angOut + 180 * turn, op: Math.min(1, (T_BACK - e) / 250),
            expl: e < T_EXP ? e / T_EXP : null
        };
    }

    let droneToken = 0, droneRAF = 0;
    const SVGNS = 'http://www.w3.org/2000/svg';
    const mk = (tag, attrs) => { const el = document.createElementNS(SVGNS, tag); for (const k in attrs) el.setAttribute(k, attrs[k]); return el; };

    // Yalnız həmin gün üçün cədvəldə olan zərbələr üçün dron göndərir. Qaytarır: izah mətnləri.
    function launchDrones(i){
        const token = ++droneToken;
        cancelAnimationFrame(droneRAF);
        droneGroup.innerHTML = '';

        const list = STRIKES.filter(s => i >= s[0] && i <= s[1] && P[s[2]]);
        if (!list.length) return [];

        const flights = list.map((s, idx) => {
            const f = makeFlight(s, i, idx);
            f.img = mk('image', {width: 35, height: 35, href: 'Bayraktar.png'});
            f.img.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'Bayraktar.png');
            f.trail = mk('line', {stroke: '#fde68a', 'stroke-width': 1.2, 'stroke-opacity': 0.8});
            f.mis = mk('circle', {r: 1.8, fill: '#fde68a', });
            f.exp = mk('circle', {fill: '#ef4444', stroke: '#f59e0b', 'stroke-width': 1});
            [f.trail, f.mis, f.exp].forEach(el => el.style.display = 'none');
            f.img.style.opacity = '0';
            [f.trail, f.mis, f.exp, f.img].forEach(el => droneGroup.appendChild(el));
            return f;
        });

        const t0 = performance.now();
        const step = () => {
            if (token !== droneToken) return;
            const el = performance.now() - t0;
            let alive = false;
            flights.forEach(f => {
                const st = flightState(f, el - f.delay);
                if (st.done){ f.img.style.display = 'none'; f.exp.style.display = 'none'; return; }
                alive = true;
                if (st.hide) return;
                f.img.style.opacity = st.op;
                f.img.setAttribute('transform', 'translate(' + st.x + ' ' + st.y + ') rotate(' + st.ang + ') translate(-17.5 -17.5)');

                if (st.missile){
                    f.mis.style.display = f.trail.style.display = 'block';
                    f.mis.setAttribute('cx', st.missile.x); f.mis.setAttribute('cy', st.missile.y);
                    f.trail.setAttribute('x1', f.stand.x); f.trail.setAttribute('y1', f.stand.y);
                    f.trail.setAttribute('x2', st.missile.x); f.trail.setAttribute('y2', st.missile.y);
                } else {
                    f.mis.style.display = f.trail.style.display = 'none';
                }

                if (st.expl != null){
                    if (!f.sounded){ f.sounded = true; playExplosionSound(); }
                    f.exp.style.display = 'block';
                    f.exp.setAttribute('cx', f.tgt.x); f.exp.setAttribute('cy', f.tgt.y);
                    f.exp.setAttribute('r', 2 + 22 * st.expl);
                    f.exp.style.opacity = 1 - st.expl;
                } else {
                    f.exp.style.display = 'none';
                }
            });
            if (alive) droneRAF = requestAnimationFrame(step);
            else droneGroup.innerHTML = '';
        };
        droneRAF = requestAnimationFrame(step);

        return list.map(s => (s[5] === 'doc' ? '' : '≈ ') + s[4]);
    }

    function show(i){
        cur = i; 
        rng.value = i;
        const st = {}; 
        Object.keys(R).forEach(k => st[k] = 0); 
        T.forEach(t => { if(t[0] <= i) st[t[1]] = t[2]; });

        Object.keys(R).forEach(k => {
            if (P[k]) {
                let status = st[k];
                P[k].style.fill = COL[status] || COL[0];
                P[k].style.fillOpacity = '1';
            }
        });

        combatGroup.innerHTML = '';
        droneGroup.innerHTML = ''; // Köhnə dronlar təmizlənir

        Object.keys(st).forEach(k => {
            if (!P[k]) return;
            const a = advance(k, i);
            if (!a) return;
            
            const partialGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            partialGroup.setAttribute('clip-path', 'url(#clip-' + k + ')'); 

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', a.ox);
            circle.setAttribute('cy', a.oy);
            circle.setAttribute('r', a.r);
            circle.setAttribute('fill', COL[2]);

            partialGroup.appendChild(circle);
            combatGroup.appendChild(partialGroup);
        });

        svg.querySelectorAll('.pulse').forEach(p => p.classList.remove('pulse'));
        void svg.getBoundingClientRect();
        D[i][2].forEach(k => { if(P[k]) P[k].classList.add('pulse'); });

        const activeRegions = D[i][2]; 

        // --- BAYRAKTARLAR: yalnız real zərbə günlərində ---
        const strikeNotes = launchDrones(i);

        document.getElementById('tl-day').textContent = head(i) + ' · ' + date(i);
        document.getElementById('tl-text').textContent = D[i][0] + (strikeNotes.length ? '  ✈ Bayraktar TB2: ' + strikeNotes.join(' • ') : '');

        let n = 0; 
        for(let j = 0; j <= i; j++) n += D[j][1];

        const c = [0, 0, 0, 0]; 
        Object.keys(R).forEach(k => c[st[k]]++);

        document.getElementById('tl-n').textContent = n;
        document.getElementById('tl-r').textContent = c[2] + ' / ' + c[1] + ' / ' + c[3];

        [...log.children].forEach((r, j) => {
            r.classList.toggle('on', j == i);
            if(j == i) log.scrollTop = r.offsetTop - log.offsetTop - 60;
        });
    }

    const btn = document.getElementById('tl-play');
    function stop(){ 
        clearInterval(timer); 
        timer = null; 
        btn.textContent = 'Başla'; 
    }

    function play(){ 
        if(cur >= 47) show(0); 
        btn.textContent = 'Dayandır'; 
        
        let speedVal = Math.max(+document.getElementById('tl-speed').value * 1.5, 3000);

        timer = setInterval(() => { 
            if(cur >= 47){ stop(); return; } 
            show(cur + 1); 
        }, speedVal); 
    }

    btn.onclick = () => timer ? stop() : play();
    document.getElementById('tl-speed').onchange = () => { if(timer){ stop(); play(); } };
    document.getElementById('tl-prev').onclick = () => { stop(); show(Math.max(0, cur - 1)); };
    document.getElementById('tl-next').onclick = () => { stop(); show(Math.min(47, cur + 1)); };
    rng.oninput = () => { stop(); show(+rng.value); };

    show(0);
})();
