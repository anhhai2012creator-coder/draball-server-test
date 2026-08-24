/** DATABASE 14 TƯỚNG (Bản Cập Nhật v4.3) */
const DB = [
    { id: 'jiren', abbr: 'JR', name: 'Jiren', role: 'ATK', hp: 235549000, atk: 18750000, def: 3000, spd: 150, en: 4.6, desc: 'Đánh thường hồi 1.8 EN, áp [Severe wound]. Cuồng nộ tăng sát thương khi HP < 40%.' },
    { id: 'goku_xeno', abbr: 'GX', name: 'Goku (Xeno)', role: 'DEF', hp: 290000000, atk: 13500000, def: 6550, spd: 145, en: 3, desc: 'Bảo vệ đồng minh yếu nhất, chia sẻ 25% sát thương nhận vào, tự hồi sinh 50% HP.' },
    { id: 'cooler', abbr: 'CG', name: 'Cooler (Gold)', role: 'DEF', hp: 285000000, atk: 13830000, def: 5780, spd: 145, en: 4, desc: 'Hồi phục 180% ATK khi dính debuff ở đầu lượt. Tuyệt kỹ tạo lá chắn bằng 30% sát thương gây ra.' },
    { id: 'broly_sp', abbr: 'BS', name: 'Broly (SP)', role: 'ATK', hp: 224500000, atk: 20000000, def: 4300, spd: 150, en: 3, desc: 'Miễn nhiễm mọi hiệu ứng khi HP > 80%, cấm hồi sinh kẻ địch bị hạ gục.' },
    { id: 'zamasu', abbr: 'ZC', name: 'Zamasu', role: 'SKL', hp: 276688000, atk: 14348000, def: 4200, spd: 155, en: 4.4, desc: 'Đánh thường toàn đội 92% ATK kèm Chảy Máu. Khống chế Terror diện rộng.' },
    { id: 'vegeta_ssg', abbr: 'VS', name: 'Vegeta (SSG)', role: 'ATK', hp: 219000000, atk: 18654000, def: 3500, spd: 150, en: 2, desc: 'SPD cao, tạo giáp ảo 185% ATK và buff tỷ lệ Né Tránh cho đồng minh.' },
    { id: 'vegeta_xeno', abbr: 'VX', name: 'Vegeta (Xeno)', role: 'ATK', hp: 245989000, atk: 19450000, def: 4100, spd: 150, en: 4, desc: 'Phá vỡ 100% DEF lượt đầu, tích lũy 10 tầng Sức Mạnh cho 100% bạo kích.' },
    { id: 'madara', abbr: 'MD', name: 'Madara (Lục đạo)', role: 'ATK', hp: 235888000, atk: 17900000, def: 4200, spd: 150, en: 3, desc: 'Tuyệt kỹ 300% ATK AoE kèm 53% Choáng 2 hiệp. Hồi EN khi nhận sát thương.' },
    { id: 'zhuang_fa', abbr: 'ZF', name: 'Zhuang Fa', role: 'SKL', hp: 261000000, atk: 19450000, def: 6400, spd: 156, en: 8, desc: 'Hút 80% đòn đánh, phản sát thương 50%, áp Nọc Độc rút % HP tối đa.' },
    { id: 'omega', abbr: 'OS', name: 'Omega Shenron', role: 'DEF', hp: 300000000, atk: 12880000, def: 5000, spd: 145, en: 5, desc: 'Lá chắn 50% HP miễn nhiễm tuyệt đối với sát thương Bạo Kích.' },
    { id: 'pain', abbr: 'PT', name: 'Pain Thiên Đạo', role: 'SKL', hp: 275600000, atk: 16890000, def: 4100, spd: 150, en: 4, desc: 'Dưới 50% HP nhận [Super Teleport] tăng 2% Né mỗi 4% HP mất. Giảm ST địch.' },
    { id: 'vegito', abbr: 'VG', name: 'Vegito', role: 'SKL', hp: 278590000, atk: 15890000, def: 5800, spd: 150, en: 3, desc: 'Sở hữu Bleeding2 độc lập gây 44% ATK mỗi hiệp không thể bị xóa bỏ.' },
    { id: 'timekaishin', abbr: 'TK', name: 'TimeKaishin', role: 'SKL', hp: 285873000, atk: 15670000, def: 5800, spd: 150, en: 4, desc: 'Hồi HP toàn đội dựa trên tổng ST gây ra, cấp khiên và buff Crit/DEF.' },
    { id: 'itachi', abbr: 'IT', name: 'Itachi (Uế Thổ)', role: 'DEF', hp: 300000000, atk: 17550000, def: 5000, spd: 145, en: 3, desc: 'Áp dấu ấn [Fire] phản sát thương, Bất tử 3 hiệp và nạp đầy 4 EN khi cạn HP.' }
];

class Buff {
    constructor(name, type, dur, data={}) { this.name=name; this.type=type; this.dur=dur; this.data=data; }
}

class Hero {
    constructor(d, team, idx) {
        this.id = d.id; this.abbr = d.abbr; this.name = d.name; this.team = team; this.idx = idx; this.role = d.role;
        this.uid = `${team}-${idx}-${this.id}`;
        this.maxHp = d.hp; this.hp = d.hp; 
        this.atk = d.atk; this.def = d.def; this.spd = d.spd;
        this.en = 0; this.maxEn = d.en;
        
        // Advanced Base
        this.critR = this.role === 'ATK' ? 0.13 : 0;
        this.critD = 1.5; this.armorP = 0; this.dmgRed = 0; this.dodge = 0; 
        this.healBonus = 0; this.dmgBonus = 0;
        this.shield = 0; this.buffs = []; this.dead = false; this.cantRevive = false;
        this.mem = { vxPower:0, zfTaunt:0.8, painDodge:0 };
        this.applyGodSkills();
    }

    applyGodSkills() {
        if(this.id==='jiren'){ this.maxHp*=1.15; this.atk*=1.08; this.dmgRed+=0.05; this.armorP+=0.45; this.critR+=0.23; }
        if(this.id==='goku_xeno'){ this.dodge+=0.09; this.armorP+=0.06; }
        if(this.id==='cooler'){ this.atk*=1.25; this.dodge+=0.05; }
        if(this.id==='broly_sp'){ this.maxHp*=1.25; this.armorP+=0.30; this.critR+=1.28; }
        if(this.id==='zamasu'){ this.atk*=1.10; this.maxHp*=1.08; this.dodge+=0.07; }
        if(this.id==='vegeta_ssg'){ this.atk*=1.25; this.armorP+=0.10; this.spd*=1.10; }
        if(this.id==='vegeta_xeno'){ this.maxHp*=1.25; this.armorP+=0.08; this.critD+=0.15; this.def*=1.10; }
        if(this.id==='madara'){ this.def*=1.20; this.critR+=0.08; this.dmgRed+=0.07; }
        if(this.id==='zhuang_fa'){ this.atk*=1.30; this.maxHp*=0.87; this.dmgRed+=0.08; } 
        if(this.id==='omega'){ this.dmgRed+=0.06; this.armorP+=0.15; }
        if(this.id==='pain'){ this.maxHp*=1.10; this.def*=1.10; }
        if(this.id==='vegito'){ this.atk*=1.25; this.maxHp*=1.14; this.dmgBonus+=0.30; }
        if(this.id==='timekaishin'){ this.maxHp*=1.20; this.def*=1.26; this.healBonus+=0.11; }
        if(this.id==='itachi'){ this.atk*=1.20; this.critR+=0.11; this.mem.immortal = true; }
        this.hp = this.maxHp;
    }

    updateUI() {
        if(!this.dom) return;
        this.dom.querySelector('.hp-bar').style.width = `${Math.max(0, this.hp/this.maxHp*100)}%`;
        this.dom.querySelector('.shield-bar').style.width = `${Math.min(100, this.shield/this.maxHp*100)}%`;
        this.dom.querySelector('.en-bar').style.width = `${Math.min(100, this.en/this.maxEn*100)}%`;
        this.dom.querySelector('.stats-text').innerHTML = `HP: ${Math.floor(this.hp).toLocaleString()}<br>EN: ${this.en.toFixed(1)}/${this.maxEn.toFixed(1)}`;
        
        let bfHtml = this.shield > 0 ? `<div class="b-pill bg-mark">Lá Chắn</div>` : '';
        
        if(this.id === 'pain' && this.hp < this.maxHp * 0.5) {
            bfHtml += `<div class="b-pill bg-buff">Super Teleport</div>`;
        }

        // Tối ưu hóa UI: Gộp chung các Buff trùng tên
        let buffGroups = {};
        this.buffs.forEach(b => {
            if(!buffGroups[b.name]) buffGroups[b.name] = { type: b.type, count: 0 };
            buffGroups[b.name].count++;
        });

        for(let name in buffGroups) {
            let b = buffGroups[name];
            let displayName = b.count > 1 ? `${name} x${b.count}` : name;
            let bgClass = b.type==='buff' ? 'bg-buff' : (b.type==='debuff' ? 'bg-debuff' : 'bg-mark');
            bfHtml += `<div class="b-pill ${bgClass}">${displayName}</div>`;
        }

        this.dom.querySelector('.buff-zone').innerHTML = bfHtml;
    }

    has(name) { return this.buffs.some(b=>b.name===name); }
    addBuff(b) {
        if(this.dead) return;
        if(this.id==='broly_sp' && this.hp > this.maxHp*0.8 && b.type==='debuff') return;
        this.buffs.push(b); this.updateUI();
    }

    receiveDamage(raw, source, isSkill=false, dodgeable=true) {
        if(this.dead) return 0;
        
        let dRate = this.dodge;
        if(this.id==='pain') {
            dRate += this.mem.painDodge;
            if(this.hp < this.maxHp * 0.5) {
                let lostPct = ((this.maxHp - this.hp) / this.maxHp) * 100;
                let bonusDodge = Math.floor(lostPct / 4) * 0.02;
                dRate += bonusDodge;
            }
        }

        if(dodgeable && Math.random() < dRate) {
            Battle.float(this.dom, "NÉ TRÁNH", "#ffffff");
            if(this.id==='pain' && source) source.addBuff(new Buff('Giảm ST', 'debuff', 2));
            return 0;
        }
        if(this.id==='pain') this.mem.painDodge = Math.min(0.6, this.mem.painDodge + 0.15);

        let sDmgBonus = source ? source.dmgBonus : 0;
        if(source) {
            if(source.id==='jiren' && source.hp < source.maxHp*0.4) sDmgBonus += (1 - (source.hp/source.maxHp)) * 2; 
            if(source.id==='vegeta_ssg' && this.atk < source.atk) sDmgBonus += 0.40;
            if(source.id==='vegeta_ssg' && isSkill && this.hp/this.maxHp < 0.45) sDmgBonus += 0.22;
            if(source.id==='vegeta_xeno' && !isSkill) sDmgBonus += (source.mem.vxPower * 0.30);
            if(source.id==='vegeta_xeno' && isSkill && this.hp/this.maxHp > 0.7) sDmgBonus += 0.40;
            if(source.id==='itachi' && source.hp < source.maxHp*0.5) sDmgBonus += Math.min(0.8, Math.floor((source.maxHp-source.hp)/(source.maxHp*0.08))*0.1);
        }

        let dynDef = this.def * (this.has('DEF Tăng') ? 1.3 : 1);
        let actualDef = dynDef * Math.max(0, 1 - (source ? source.armorP : 0));
        if(this.has('Terror')) actualDef *= 0.7; 
        if(this.has('VX-ArmorBreak')) actualDef = 0; 

        let dmg = (raw * (1 + sDmgBonus)) - actualDef;
        if(dmg < 1) dmg = 1;

        let isCrit = false;
        if(source) {
            let cr = source.critR + (source.has('Tỉ lệ Bạo Kích') ? 0.15 : 0);
            if(source.id==='vegeta_xeno' && source.mem.vxPower >= 10 && !isSkill) cr = 1.0;
            if(Math.random() < cr) { 
                isCrit = true; 
                let cd = source.critD;
                if(source.role === 'ATK' && isSkill) cd = 3.0; 
                dmg *= cd; 
            }
        }
        
        if(this.id==='omega' && this.shield > 0 && isCrit) { isCrit = false; dmg /= (source.role==='ATK'&&isSkill?3.0:1.5); }

        let tRed = this.dmgRed;
        if(isSkill && Math.random() < 0.15) { tRed += 0.3; Battle.float(this.dom, "CHỐNG ĐỠ", "#a78bfa"); } 
        if(this.id==='cooler' && this.buffs.some(b=>b.type==='debuff')) tRed += 0.2;
        if(this.has('Bảo vệ')) tRed += 0.15;
        if(Battle.getTeam(this.team).some(h=>h.id==='zamasu')) tRed += 0.05;
        if(source && source.has('GokuDebuff')) tRed += 0.1;
        if(source && source.has('Thiên đạo')) tRed += 0.3;
        if(source && source.has('Giảm ST')) tRed += 0.3;
        if(source && source.has('Ma đạo')) dmg *= 0.75; 

        dmg *= Math.max(0, 1 - tRed);

        if(this.has('Bảo vệ') && this.id !== 'goku_xeno') {
            let gk = Battle.getTeam(this.team).find(h=>h.id==='goku_xeno');
            if(gk && !gk.dead) { let split = dmg*0.25; dmg -= split; gk.takeDirect(split, source); }
        }

        if(source && source.id==='zhuang_fa') {
            let light = this.buffs.find(b=>b.name==='Ánh Sáng');
            if(light) {
                light.data.stacks = (light.data.stacks||1)+1;
                if(light.data.stacks >= 3) {
                    this.buffs = this.buffs.filter(b=>b.name!=='Ánh Sáng');
                    this.addBuff(new Buff('Choáng','debuff',1));
                }
            } else this.addBuff(new Buff('Ánh Sáng','debuff',99,{stacks:1}));
        }

        this.takeDirect(dmg, source, isCrit);
        return dmg;
    }

    takeDirect(dmg, source, isCrit=false) {
        if(this.dead) return;
        if(this.has('Severe wound') && !this.mem.sevL) this.mem.sevWound = (this.mem.sevWound||0) + dmg;
        
        if(this.shield > 0) {
            if(this.shield >= dmg) { this.shield -= dmg; dmg = 0; }
            else { dmg -= this.shield; this.shield = 0; }
        }

        this.hp -= dmg;
        Battle.float(this.dom, `-${Math.floor(dmg)}`, isCrit ? '#ef4444' : '#f59e0b');
        this.dom.classList.add('anim-hurt'); setTimeout(()=>this.dom.classList.remove('anim-hurt'), 300);

        if(source && source.has('Fire')) {
            let fb = source.buffs.find(b=>b.name==='Fire');
            if(fb) {
                let fireD = fb.data.atk * 0.4 + source.maxHp * 0.009;
                source.takeDirect(fireD, null);
                Battle.float(source.dom, "LỬA UẾ THỔ", "#dc2626");
            }
        }

        if(this.has('Protection')) {
            let p = this.buffs.find(x=>x.name==='Protection');
            this.heal(p.data.val);
        }

        if(this.id==='timekaishin') this.gainEn(this.hp > this.maxHp*0.8 ? 0.4 : 0.9);

        if(source && this.id==='zhuang_fa' && !this.dead) {
            source.addBuff(new Buff('Nọc Độc', 'debuff', 99, {val: 0.009}));
            if(Math.random()<0.6) {
                this.addBuff(new Buff('Trả Thù', 'buff', 1)); this.gainEn(1);
                source.takeDirect(dmg * 0.5, this);
            }
        }
        if(source && this.id==='madara' && !this.dead) {
            this.gainEn(0.5); source.addBuff(new Buff('Nọc Độc', 'debuff', 99, {val: 0.009}));
        }

        if(this.hp <= 0) {
            if(this.id === 'itachi' && this.mem.immortal) {
                this.hp = 1; this.mem.immortal = false;
                this.addBuff(new Buff('Bất Tử', 'buff', 3)); this.gainEn(4);
                Battle.log(`${this.name} Kích hoạt Bất Tử!`, this.team, 'c-sys');
            } else if (!this.has('Bất Tử')) {
                this.die(source);
            } else {
                this.hp = 1;
            }
        }
        
        if(!this.dead) {
            if(this.id==='goku_xeno' && this.hp < this.maxHp*0.5 && !this.mem.gkHealed) { this.mem.gkHealed = true; this.heal(this.maxHp*0.5); }
            if(this.id==='vegito' && this.hp < this.maxHp*0.5 && !this.mem.vgShield) { this.mem.vgShield = true; this.gainShield(this.atk*2.75); this.mem.vgEn = true; }
        }
        this.updateUI();
    }

    heal(amt) {
        if(this.dead) return;
        if((this.has('Anti-heal') || this.has('Fire')) && this.id !== 'cooler' && this.id !== 'zhuang_fa') return;
        let hBonus = this.healBonus;
        if(this.id==='zhuang_fa' && this.hp < this.maxHp*0.4) hBonus += 0.2;
        if(this.id==='omega') hBonus += 0.2;
        amt *= (1 + hBonus) * Battle.gbHeal;
        this.hp = Math.min(this.maxHp, this.hp + amt);
        Battle.float(this.dom, `+${Math.floor(amt)}`, '#34d399');
        this.updateUI();
    }

    gainShield(amt) {
        if(this.dead) return;
        this.shield += amt * Battle.gbShield;
        this.updateUI();
    }

    gainEn(amt) {
        if(this.dead || (this.id==='vegeta_xeno' && this.has('Bảo vệ'))) return;
        this.en = Math.min(this.maxEn, this.en + amt);
        this.updateUI();
    }

    die(killer) {
        this.dead = true; this.hp = 0; this.dom.classList.add('dead');
        Battle.log(`${this.name} tử trận!`, this.team, 'c-sys');
        if(killer && (killer.id==='broly_sp' || killer.has('Dũng Cảm'))) this.cantRevive = true;
        if(killer && killer.id==='jiren' && this.has('Severe wound')) this.cantRevive = true;
        Battle.getAll().filter(h=>h.id==='broly_sp').forEach(b => { b.heal(b.maxHp*0.12); b.addBuff(new Buff('Dũng Cảm', 'buff', 99)); });
        this.updateUI();
    }

    onTurnStart() {
        if(this.dead) return;
        
        let bld = this.buffs.find(b=>b.name==='Bleeding');
        if(bld) {
            let dmg = bld.data.dmg;
            if(Battle.getTeam(this.team===1?2:1).some(h=>h.id==='zamasu')) dmg *= 1.25;
            this.takeDirect(dmg, null);
        }
        let b2 = this.buffs.find(b=>b.name==='Bleeding2');
        if(b2) this.takeDirect(b2.data.dmg, null);
        let poison = this.buffs.find(b=>b.name==='Nọc Độc');
        if(poison) this.takeDirect(this.maxHp * poison.data.val * this.buffs.filter(b=>b.name==='Nọc Độc').length, null);
        let severe = this.buffs.find(b=>b.name==='Severe wound' && b.dur <= 0);
        if(severe) { this.mem.sevL=true; this.takeDirect((this.mem.sevWound||0) * 0.4, null); this.mem.sevWound = 0; this.mem.sevL=false; }

        this.buffs.forEach(b=>b.dur--);
        this.buffs = this.buffs.filter(b=>b.dur>0);

        if(this.dead) return;

        if(this.id==='cooler' && this.buffs.some(b=>b.type==='debuff')) this.heal(this.atk*1.8);
        
        if(this.id==='broly_sp') {
            if(this.hp > this.maxHp*0.8) this.gainEn(2);
            this.mem.brolyStk=(this.mem.brolyStk||0)+1; if(this.mem.brolyStk%2===0 && this.dmgBonus < 1.4) this.dmgBonus += 0.25;
        }
        if(this.id==='vegeta_xeno') {
            this.mem.vxPower = Math.min(10, this.mem.vxPower + 1);
            if(this.mem.vxSh > 0) this.mem.vxSh--; else this.buffs = this.buffs.filter(b=>b.name!=='Bảo vệ');
        }
        this.updateUI();
    }
}

const Battle = {
    t1: [], t2: [], queue: [], curIdx: -1, 
    gbAtk: 1, gbShield: 1, gbHeal: 1, inProgress: false,
    
    init(p1, p2) {
        this.t1 = p1.map((id,i) => new Hero(DB.find(x=>x.id===id), 1, i));
        this.t2 = p2.map((id,i) => new Hero(DB.find(x=>x.id===id), 2, i));
        this.inProgress = true;
        this.render(); this.startEvent();
    },
    
    render() {
        const build = (h) => {
            let el = document.createElement('div'); el.className = 'entity'; el.id = h.uid;
            el.innerHTML = `<div class="e-abbr">${h.abbr}</div><div class="e-name">${h.name}</div>
                <div class="bar-wrap"><div class="hp-bar" style="width:100%"></div><div class="shield-bar" style="width:0%"></div></div>
                <div class="bar-wrap"><div class="en-bar" style="width:0%"></div></div>
                <div class="stats-text"></div><div class="buff-zone"></div>`;
            h.dom = el; h.updateUI(); return el;
        };
        document.getElementById('team1-side').innerHTML=''; document.getElementById('team2-side').innerHTML='';
        this.t1.forEach(h => document.getElementById('team1-side').appendChild(build(h)));
        this.t2.forEach(h => document.getElementById('team2-side').appendChild(build(h)));
    },
    
    startEvent() {
        this.gbAtk=1; this.gbShield=1; this.gbHeal=1;
        document.getElementById('combat-log').innerHTML = '';
        let evs = [
            {n:"Hoả Lực", act:()=>{this.gbAtk=1.3;}}, {n:"Lá Chắn", act:()=>{this.gbShield=1.8;}},
            {n:"Liên Hoàn", act:()=>{this.gbHeal=1.4;}}, {n:"Trâu Bò", act:()=>{this.getAll().forEach(h=>{h.maxHp*=1.3;h.hp=h.maxHp;});}}
        ];
        let ev = evs[Math.floor(Math.random()*evs.length)];
        this.log(`SỰ KIỆN 5 GIÂY: [${ev.n}]`, 0, 'c-sys'); ev.act();

        this.getAll().forEach(h => {
            if(h.id==='broly_sp') h.dmgBonus += 0.65;
            if(h.id==='omega') { h.gainShield(h.maxHp*0.5); }
            if(h.id==='vegeta_xeno') { h.addBuff(new Buff('Bảo vệ','buff',2)); h.mem.vxSh=2; }
        });

        let fTeam = Math.random()<0.5 ? this.t1 : this.t2;
        fTeam.reduce((m,h)=>h.spd>m.spd?h:m, fTeam[0]).spd += 1000;
        
        setTimeout(() => { this.calcQueue(); this.nextTurn(); }, 1500);
    },
    
    calcQueue() { this.queue = this.getAll().sort((a,b)=>b.spd - a.spd); this.curIdx = -1; },
    getAll() { return [...this.t1, ...this.t2].filter(h=>!h.dead); },
    getTeam(t) { return (t===1?this.t1:this.t2).filter(h=>!h.dead); },
    getEnemies(t) { return (t===1?this.t2:this.t1).filter(h=>!h.dead); },
    
    log(msg, t, cls='') {
        let el = document.getElementById('combat-log');
        let pre = t===1 ? `<span class="c-t1">[Đội 1]</span>` : (t===2 ? `<span class="c-t2">[Đội 2]</span>` : '');
        el.innerHTML += `<div class="log-row ${cls}">${pre} ${msg}</div>`;
        el.scrollTop = el.scrollHeight;
    },
    
    float(el, txt, color) {
        let f = document.createElement('div'); f.className='dmg-text'; f.style.color=color; f.innerText=txt;
        f.style.left = (Math.random()*40+20) + 'px'; el.appendChild(f);
        setTimeout(()=>f.remove(), 1000);
    },
    
    endGame(winner) {
        this.inProgress = false;
        document.getElementById('end-overlay').style.display = 'flex';
        document.getElementById('end-title').innerText = `ĐỘI ${winner} CHIẾN THẮNG`;
        let count = 5; document.getElementById('end-cd').innerText = count;
        let int = setInterval(() => {
            count--; document.getElementById('end-cd').innerText = count;
            if(count <= 0) {
                clearInterval(int);
                document.getElementById('end-overlay').style.display = 'none';
                App.show('menu-screen');
            }
        }, 1000);
    },

    nextTurn() {
        if(!this.inProgress) return;
        if(this.getTeam(1).length===0) return this.endGame(2);
        if(this.getTeam(2).length===0) return this.endGame(1);
        
        document.querySelectorAll('.entity').forEach(e=>e.classList.remove('active-turn'));
        this.curIdx++; if(this.curIdx >= this.queue.length) { this.calcQueue(); this.curIdx=0; }
        
        let hero = this.queue[this.curIdx];
        if(hero.dead) return this.nextTurn();
        
        hero.dom.classList.add('active-turn');
        document.getElementById('turn-banner').innerText = `LƯỢT CỦA: ${hero.name}`; 
        
        hero.onTurnStart();
        if(hero.dead) return this.nextTurn();
        
        let isStun = hero.has('Choáng');
        let terror = hero.buffs.find(b=>b.name==='Terror');
        if(terror && Math.random()<0.5) isStun = true;
        
        if(isStun) {
            this.log(`${hero.name} bị Choáng/Terror, mất lượt hành động!`, hero.team, 'c-sys');
            setTimeout(()=>this.nextTurn(), 900); return;
        }
        
        document.getElementById('btn-skill').disabled = hero.en < hero.maxEn;
        document.getElementById('desc-atk').innerText = "Hồi: " + (hero.id==='timekaishin'?1.4:(hero.id==='zamasu'?1.4:(hero.id==='jiren'?1.8:1.0))) + " EN";
        document.getElementById('desc-skill').innerText = `Cần ${hero.maxEn} EN`;
    },

    getTar(hero, mode='rand') {
        let ens = this.getEnemies(hero.team); if(ens.length===0) return null;
        let zf = ens.find(e=>e.id==='zhuang_fa'); if(zf && Math.random() < zf.mem.zfTaunt) return [zf];
        
        if(mode==='back') { let b = ens.filter(e=>e.idx>0); if(b.length) return [b[Math.floor(Math.random()*b.length)]]; }
        if(mode==='all') return ens;
        if(mode==='minHp') return [ens.reduce((m,e)=>e.maxHp<m.maxHp?e:m, ens[0])];
        if(mode==='maxAtk') return [ens.reduce((m,e)=>e.atk>m.atk?e:m, ens[0])];
        return [ens[Math.floor(Math.random()*ens.length)]];
    },

    useNormal() {
        let h = this.queue[this.curIdx];
        let atk = h.atk * this.gbAtk;
        
        if(h.id==='vegeta_xeno' && h.has('Bảo vệ')) {
            this.log(`${h.name} tung Lan Toả Vô Tận!`, h.team);
            this.getEnemies(h.team).forEach(e => e.receiveDamage(atk*0.5, h, false));
        }

        let mode = 'rand'; let p = 1.0; let enGain = 1.0;
        if(h.id==='jiren') { mode='back'; p=0.98; enGain=1.8; }
        if(h.id==='goku_xeno') { p=1.0; enGain=0.9; }
        if(h.id==='cooler') { p=0.99; enGain=1.2; }
        if(h.id==='broly_sp') { enGain=1.0; if(!h.has('FirstHit')){h.addBuff(new Buff('FirstHit','mark',99)); h.gainShield(h.maxHp*0.1);} }
        if(h.id==='zamasu') { mode='all'; p=0.92; enGain=1.4; }
        if(h.id==='vegeta_ssg') { p=0.88; enGain=0.8; }
        if(h.id==='vegeta_xeno') { mode='all'; p=0.99; enGain=1.6; if(!h.mem.vxFH) { mode='minHp'; p=1.89; h.mem.vxFH=true; } }
        if(h.id==='madara') { p=0.95; enGain=1.0; }
        if(h.id==='zhuang_fa') { mode='all'; p=0.80; enGain=1.0; }
        if(h.id==='omega') { p=0.90; enGain=1.8; }
        if(h.id==='pain') { mode='all'; p=0.45; enGain=1.2; }
        if(h.id==='vegito') { p=0.98; enGain= 0.9 + (h.mem.vgEn?0.5:0); }
        if(h.id==='timekaishin') { p=0.45; enGain=1.4; }
        if(h.id==='itachi') { mode='all'; p=0.88; enGain=0.9; }

        let targets = this.getTar(h, mode); if(!targets) return;
        this.log(`${h.name} Đánh Thường!`, h.team);
        
        targets.forEach(t => {
            t.receiveDamage(atk*p, h, false);
            if(h.id==='jiren') t.addBuff(new Buff('Severe wound','debuff',2));
            if(h.id==='zamasu') { t.addBuff(new Buff('Bleeding','debuff',2,{dmg:atk*0.1})); if(Math.random()<0.8) t.addBuff(new Buff('Choáng','debuff',1)); }
            if(h.id==='vegeta_ssg' && Math.random()<0.2) t.addBuff(new Buff('Choáng','debuff',1));
            if(h.id==='vegeta_xeno' && h.mem.vxFH && mode==='minHp') t.addBuff(new Buff('VX-ArmorBreak','debuff',5));
            if(h.id==='madara') t.addBuff(new Buff('Ma đạo','debuff',2));
            if(h.id==='zhuang_fa' && Math.random()<0.3) t.addBuff(new Buff('Ánh Sáng','debuff',99));
            if(h.id==='vegito') t.addBuff(new Buff('Bleeding2','debuff',3,{dmg:atk*0.4}));
            if(h.id==='itachi') t.addBuff(new Buff('Bleeding','debuff',2,{dmg:atk*0.1}));
        });
        h.gainEn(enGain);
        setTimeout(()=>this.nextTurn(), 1000);
    },

    useSkill() {
        let h = this.queue[this.curIdx]; if(h.en < h.maxEn) return;
        h.en = 0; h.updateUI(); let atk = h.atk * this.gbAtk;
        this.log(`${h.name} tung TUYỆT KỸ!`, h.team, 'c-sys');
        
        if(h.id==='jiren') {
            let t = this.getTar(h,'back')[0]; t.receiveDamage(atk*2.75, h, true);
            if(h.critR < 0.6) h.critR += 0.15;
        }
        else if(h.id==='goku_xeno') {
            this.getTar(h,'all').forEach(t=>{ t.receiveDamage(atk*0.55, h, true); t.addBuff(new Buff('GokuDebuff','debuff',3)); });
            h.heal(h.maxHp*0.04);
            if(h.hp > h.maxHp*0.5) { let pals = this.getTeam(h.team).filter(a=>a.id!=='goku_xeno'); if(pals.length) pals.reduce((m,a)=>a.hp<m.hp?a:m, pals[0]).addBuff(new Buff('Bảo vệ','buff',1)); }
        }
        else if(h.id==='cooler') {
            let t = this.getTar(h,'back')[0];
            let dmgDealt = t.receiveDamage(atk*3.52, h, true);
            h.gainShield(dmgDealt * 0.3); 
            
            if(Math.random()<0.4) t.addBuff(new Buff('Choáng','debuff',1));
            if(Math.random()<0.6) t.buffs = t.buffs.filter(b=>b.type!=='buff');
        }
        else if(h.id==='broly_sp') {
            let t = this.getTar(h)[0]; h.critR+=0.3; t.receiveDamage(atk*2.75, h, true);
        }
        else if(h.id==='zamasu') {
            this.getTar(h,'all').forEach(t=>{ t.receiveDamage(atk*1.1, h, true); if(Math.random()<0.37) t.addBuff(new Buff('Terror','debuff',2)); });
        }
        else if(h.id==='vegeta_ssg') {
            this.getTar(h,'all').forEach(t=> t.receiveDamage(atk*1.0, h, true));
            h.gainShield(atk*1.85); h.dodge += 0.2; this.getTeam(h.team).forEach(a=>a.dodge+=0.09);
        }
        else if(h.id==='vegeta_xeno') {
            this.getTar(h,'all').forEach(t=>{ t.receiveDamage(atk*1.1, h, true); t.addBuff(new Buff('Dũng Cảm','debuff',99)); });
            h.mem.vxPower = Math.min(10, h.mem.vxPower + 1);
        }
        else if(h.id==='madara') {
            let oC = h.critR; h.critR += 0.3;
            this.getTar(h,'all').forEach(t=>{ t.receiveDamage(atk*3.0, h, true); if(Math.random()<0.53) t.addBuff(new Buff('Choáng','debuff',2)); });
            h.critR = oC;
        }
        else if(h.id==='zhuang_fa') {
            let p = this.getTeam(h.team); let lw = p.reduce((m,a)=>a.hp<m.hp?a:m, p[0]);
            lw.heal(atk*2.0 + lw.maxHp*0.01);
        }
        else if(h.id==='omega') {
            let t = this.getTar(h,'maxAtk')[0]; t.receiveDamage(atk*2.75, h, true);
            if(Math.random() < (h.mem.omFS?1.0:0.6)) { t.addBuff(new Buff('Terror','debuff',2)); h.dmgRed += 0.3; } h.mem.omFS = false;
        }
        else if(h.id==='pain') {
            this.getTar(h,'all').forEach(t=>{ t.receiveDamage(atk*1.1, h, true); if(Math.random()<0.33) t.addBuff(new Buff('Terror','debuff',2)); if(Math.random()<0.33) t.addBuff(new Buff('Thiên Đạo','debuff',3)); });
            h.addBuff(new Buff('ControlApply','mark',2));
        }
        else if(h.id==='vegito') {
            this.getTar(h,'all').forEach(t=>{ t.receiveDamage(atk*0.75, h, true); t.addBuff(new Buff('Bleeding2','debuff',3,{dmg:atk*0.44})); });
        }
        else if(h.id==='timekaishin') {
            let tot = 0; this.getTar(h,'all').forEach(t=>{ tot += t.receiveDamage(atk*0.71, h, true); });
            this.getTeam(h.team).forEach(a=>{
                a.heal(tot*0.5); a.gainShield(h.maxHp*0.08); a.addBuff(new Buff('Tỉ lệ Bạo Kích','buff',2)); a.addBuff(new Buff('DEF Tăng','buff',4));
                if(a.id !== h.id) a.addBuff(new Buff('Protection','buff',99,{val: h.maxHp*0.08}));
            });
        }
        else if(h.id==='itachi') {
            let tot = 0; this.getTar(h,'all').forEach(t=>{ tot += t.receiveDamage(atk*1.8, h, true); t.addBuff(new Buff('Fire','debuff',4,{atk: h.atk})); });
            h.addBuff(new Buff('Gian Xảo','buff',99)); h.heal(tot*0.2);
        }
        setTimeout(()=>this.nextTurn(), 1200);
    }
};

const App = {
    bans: [], p1: [], p2: [], phase: 1, timer: null, time: 30,
    show(id) { document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); document.getElementById(id).classList.add('active'); },
    
    renderInfo() {
        const g = document.getElementById('info-grid'); g.innerHTML = '';
        DB.forEach(h => {
            g.innerHTML += `<div class="info-card">
                <h3>[${h.role}] ${h.name}</h3>
                <p><strong>Chỉ số cơ bản:</strong> HP: ${h.hp.toLocaleString()} | ATK: ${h.atk.toLocaleString()} | SPD: ${h.spd}</p>
                <p><strong>Bộ kỹ năng & Tác dụng:</strong> ${h.desc}</p>
            </div>`;
        });
    },

    enterBP() { this.p1=[]; this.p2=[]; this.bans=[]; this.phase=1; this.show('bp-screen'); this.renderBP(); this.startT(); },
    
    renderBP() {
        let pool = document.getElementById('bp-pool'); pool.innerHTML='';
        let titles = ["ĐỘI 1 CẤM", "ĐỘI 2 CẤM", "ĐỘI 1 CHỌN", "ĐỘI 2 CHỌN", "ĐỘI 1 CHỌN", "ĐỘI 2 CHỌN", "ĐỘI 1 CHỌN", "ĐỘI 2 CHỌN"];
        document.getElementById('bp-title').innerText = titles[this.phase-1] || "HOÀN TẤT";
        document.getElementById('bp-skip').style.display = this.phase <= 2 ? 'inline-block' : 'none';
        
        DB.forEach(h => {
            let c = document.createElement('div'); c.className='hero-card'; c.dataset.id=h.id;
            c.innerHTML = `<div class="hero-abbr">${h.abbr}</div><div class="hero-name">${h.name}</div><div class="hero-role">${h.role}</div>`;
            if(this.bans.includes(h.id) || this.p1.includes(h.id) || this.p2.includes(h.id)) c.classList.add('banned');
            c.onclick = () => {
                if(c.classList.contains('banned')) return;
                document.querySelectorAll('.hero-card').forEach(x=>x.classList.remove('selected-t1','selected-t2'));
                c.classList.add(this.phase%2!==0 ? 'selected-t1' : 'selected-t2');
            };
            pool.appendChild(c);
        });
        document.getElementById('bp-t1-list').innerText = this.p1.length ? this.p1.map(id=>DB.find(x=>x.id===id).name).join(', ') : 'Chưa chọn';
        document.getElementById('bp-t2-list').innerText = this.p2.length ? this.p2.map(id=>DB.find(x=>x.id===id).name).join(', ') : 'Chưa chọn';
    },
    
    startT() {
        clearInterval(this.timer); this.time=30; document.getElementById('bp-timer').innerText=this.time;
        this.timer = setInterval(() => { this.time--; document.getElementById('bp-timer').innerText=this.time; if(this.time<=0) { clearInterval(this.timer); this.autoPick(); } }, 1000);
    },
    
    skipBP() { this.phase++; this.renderBP(); this.startT(); },
    confirmBP() {
        let sel = document.querySelector('.hero-card.selected-t1, .hero-card.selected-t1.selected-t2') || document.querySelector('.hero-card.selected-t1, .hero-card.selected-t2');
        if(!sel && this.phase>2) return alert("Vui lòng chọn 1 tướng!");
        let id = sel ? sel.dataset.id : null;
        if(this.phase<=2) { if(id) this.bans.push(id); }
        else { if(this.phase%2!==0) this.p1.push(id); else this.p2.push(id); }
        this.phase++;
        if(this.p1.length===3 && this.p2.length===3) { clearInterval(this.timer); this.show('battle-screen'); Battle.init(this.p1, this.p2); return; }
        this.renderBP(); this.startT();
    },
    
    autoPick() {
        let avail = document.querySelectorAll('.hero-card:not(.banned)');
        if(avail.length) avail[Math.floor(Math.random()*avail.length)].classList.add(this.phase%2!==0?'selected-t1':'selected-t2');
        this.confirmBP();
    }
};

App.renderInfo();
</script>
