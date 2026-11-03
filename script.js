(function(){
    const R = {KAL:'Kəlbəcər', LAC:'Laçın', QBA:'Qubadlı', ZAN:'Zəngilan', CAB:'Cəbrayıl', FUZ:'Füzuli', XVD:'Xocavənd', XCI:'Xocalı', SUS:'Şuşa', TAR:'Tərtər', AGM:'Ağdam'};
    const COL = ['#ef4444', '#f59e0b', '#10b981', '#38bdf8'];
    const T = [[0,'KAL',1],[0,'FUZ',1],[0,'CAB',1],[6,'TAR',1],[12,'TAR',2],[12,'XVD',1],[23,'ZAN',1],[26,'QBA',1],[41,'XCI',1],[42,'SUS',2],[43,'FUZ',2],[43,'CAB',2],[43,'ZAN',2],[43,'QBA',2],[43,'LAC',1],[45,'AGM',3],[46,'KAL',3],[47,'LAC',3]];
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

    const combatGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    combatGroup.setAttribute('id', 'combat-container');
    svg.appendChild(combatGroup);

    const P = {};
    svg.querySelectorAll('path').forEach(p => {
        const k = p.id.replace('AZ-', '');
        p.removeAttribute('id');
        p.removeAttribute('style');
        p.style.fill = '#1c3b36';
        P[k] = p;
    });

    svg.querySelectorAll('style').forEach(e => e.remove());
    const g = svg.querySelector('g');

    Object.keys(R).forEach(k => {
        const b = P[k].getBBox(), t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x', b.x + b.width / 2);
        t.setAttribute('y', b.y + b.height / 2);
        t.textContent = R[k];
        g.appendChild(t);
    });

    Object.keys(R).forEach(k => P[k].style.fill = COL[0]);

    const log = document.getElementById('tl-log'), rng = document.getElementById('tl-range');
    D.forEach((e, i) => {
        const r = document.createElement('div');
        r.innerHTML = '<span>' + head(i) + '</span><span>' + date(i) + '</span>';
        r.onclick = () => show(i);
        log.appendChild(r);
    });

    let cur = 0, timer = null;
    let prevDroneCoords = { x: 200, y: 500 };

    function show(i){
        cur = i; 
        rng.value = i;
        const st = {}; 
        Object.keys(R).forEach(k => st[k] = 0); 
        T.forEach(t => { if(t[0] <= i) st[t[1]] = t[2]; });

        Object.keys(R).forEach(k => P[k].style.fill = COL[st[k]]);
        svg.querySelectorAll('.pulse').forEach(p => p.classList.remove('pulse'));
        void svg.getBoundingClientRect();
        D[i][2].forEach(k => { if(P[k]) P[k].classList.add('pulse'); });

        combatGroup.innerHTML = ''; 
        const activeRegions = D[i][2];

        Object.keys(R).forEach(k => {
            if (P[k]) {
                const b = P[k].getBBox();
                const centerX = b.x + b.width / 2;
                const centerY = b.y + b.height / 2;

                if (activeRegions && activeRegions.includes(k)) {
                    const amTroop = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                    amTroop.setAttribute('href', 'TroopAm.png');
                    amTroop.setAttribute('xlink:href', 'TroopAm.png');
                    amTroop.setAttribute('width', '22');
                    amTroop.setAttribute('height', '22');
                    amTroop.setAttribute('x', centerX - 18);
                    amTroop.setAttribute('y', centerY - 11);
                    amTroop.setAttribute('class', 'troop-clash');
                    combatGroup.appendChild(amTroop);

                    const azTroop = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                    azTroop.setAttribute('href', 'TroopAz.png');
                    azTroop.setAttribute('xlink:href', 'TroopAz.png');
                    azTroop.setAttribute('width', '26');
                    azTroop.setAttribute('height', '26');
                    azTroop.setAttribute('x', centerX - 4);
                    azTroop.setAttribute('y', centerY - 13);
                    azTroop.setAttribute('class', 'troop-clash');
                    combatGroup.appendChild(azTroop);
                } 
                else if (st[k] === 0) {
                    const amTroop = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                    amTroop.setAttribute('href', 'TroopAm.png');
                    amTroop.setAttribute('xlink:href', 'TroopAm.png');
                    amTroop.setAttribute('width', '22');
                    amTroop.setAttribute('height', '22');
                    amTroop.setAttribute('x', centerX - 11);
                    amTroop.setAttribute('y', centerY - 11);
                    amTroop.style.opacity = '0.7';
                    combatGroup.appendChild(amTroop);
                }
            }
        });

        if (activeRegions && activeRegions.length > 0) {
            activeRegions.forEach((regionCode, index) => {
                if (P[regionCode]) {
                    const bbox = P[regionCode].getBBox();
                    const targetX = bbox.x + bbox.width / 2 - 17.5;
                    const targetY = bbox.y + bbox.height / 2 - 17.5;

                    const angle = Math.atan2(targetY - prevDroneCoords.y, targetX - prevDroneCoords.x) * (180 / Math.PI) + 90;

                    const drone = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                    drone.setAttribute('href', 'Bayraktar.png');
                    drone.setAttribute('xlink:href', 'Bayraktar.png');
                    drone.setAttribute('width', '35');
                    drone.setAttribute('height', '35');
                    drone.setAttribute('x', prevDroneCoords.x);
                    drone.setAttribute('y', prevDroneCoords.y);
                    drone.style.transition = 'all 1.2s ease-in-out';
                    drone.style.transformOrigin = 'center';
                    combatGroup.appendChild(drone);

                    setTimeout(() => {
                        drone.setAttribute('x', targetX);
                        drone.setAttribute('y', targetY);
                        drone.style.transform = `rotate(${angle}deg)`;

                        setTimeout(() => {
                            drone.setAttribute('x', '500');
                            drone.setAttribute('y', '340');
                            drone.style.opacity = '0';
                        }, 1500);
                    }, index * 400);

                    prevDroneCoords = { x: targetX, y: targetY };
                }
            });
        }

        document.getElementById('tl-day').textContent = head(i) + ' · ' + date(i);
        document.getElementById('tl-text').textContent = D[i][0];

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
        btn.textContent = 'Oynat'; 
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