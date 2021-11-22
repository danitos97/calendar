
const mesesCLD = {
    es:['enero'  ,'febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
    en:['january','february','march','abril','may','june' ,'july' ,'august','september' ,'october','november' ,'december'],
    //indones
    in:['Januari','Februari','Maret','April','Mei','Juni' ,'Juli' ,'Agustus','September','Oktober','November' ,'Desember'],
    //portuguese
    pt:['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro' ,'dezembro'],
    fr:['janvier','février','mars' ,'avril','mai' ,'juin' ,'juillet','août','septembre' ,'octobre','novembre' ,'décembre'],
    ru:['январь' ,'февраль','март' ,'апрель','май','июнь' ,'июль'  ,'август','сентябрь' ,'октябрь','ноябрь'   ,'декабрь' ],
    //Aleman - German
    de:['Januar' ,'Februar','März' ,'April','Mai' ,'Juni' ,'Juli' ,'August','September' ,'Oktober','November' ,'Dezember'],
    //Chinece fut
    zh:['一 月'   ,'二 月'  ,'三 月','四 月','五 月','六 月','七 月'  ,'八 月','九 月'     ,'十 月'   ,'十一 月'  ,'十二 月'  ],
    ja:['一 月'   ,'二 月'  ,'三 月','四 月','五 月','六 月','七 月'  ,'八 月','九 月'     ,'十 月'   ,'十一 月'  ,'十二 月'  ],
    ar:['كَانُون ٱلثَّانِي','شُبَاط','آذَار','نَيْسَان','أَيَّار','حَزِيرَان','تَمُّوز','آب','أَيْلُول','تِشْرِين ٱلْأَوَّل','تِشْرِين ٱلثَّانِي','كَانُون ٱلْأَوَّل'],
};
//http://www.ichineselearning.com/easy-chinese/months-of-year.html
const diasSemanaCLD = {
    es:['LUN','MAR','MIE','JUE','VIE','SAB','DOM'],
    en:['MON','TUE','WED','THU','FRI','SAT','SUN'],
    in:['SEN','SEL','RAB','KAM','JUM','SAB','MIN'],
    pt:['SEG','TER','QUA','QUI','SEX','SÁB','DOM'],
    fr:['LUN','MAR','MER','JEU','VEN','SAM','DIM'],
    ru:['ПНД','ВТР','СРД','ЧТВ','ПТН','СБТ','ВСК'],
    de:['MO' ,'DI' ,'MI' ,'DO' ,'FR' ,'SA' ,'SO' ],
    zh:['周一','周二','周三','周四','周五','周六','周日'],
    ja:['月曜','火曜','水曜','木曜','金曜','曜日','日曜'],
    ar:['الأثنين','الثلاثاء','الأربعاء','الخميس','الجمعه','السبت','الأحد']
};
const equivCLD = {
    'id':'in',
    'zh-Hans':'zh',
    'zh-Hant':'zh'
}
const calendariosCLD = document.getElementsByClassName("calendar");

var fechaActualCLD = new Date(); 

for (let nCalendario = 0; nCalendario < calendariosCLD.length; nCalendario++) {
    const cal = calendariosCLD[nCalendario];
    cal.setAttribute("id-cal", nCalendario);
    const value = cal.getAttribute("value");
    if (value != null)
        cal.setAttribute("selected", value);
    cargarCalendarioCLD(cal);
}

function cargarCalendarioCLD(cal) {

    const id     = cal.getAttribute("id-cal"),
        calValue = cal.getAttribute("value");

    let min = cal.getAttribute("min")?.replace(/-/g, "/"),
        max = cal.getAttribute("max")?.replace(/-/g, "/");

    if (min == "now") min = formatoFechaCLD(fechaActualCLD);
    if (max == "now") max = formatoFechaCLD(fechaActualCLD);

    let fecha = calValue? new Date(calValue + "/01") : fechaActualCLD;

    const state = cal.getAttribute("state");

    let anio = fecha.getFullYear(),
        mes = fecha.getMonth() + 1,
        inicioMes = new Date(anio + "/" + mes + "/01").getDay(),
        diasMes = diasEnMesCLD(mes, anio),
        selected = cal.getAttribute("selected"),
        diasMesAnterior = mes - 1 > 0? diasEnMesCLD(mes - 1, anio):diasEnMesCLD(12, anio - 1);

    if (inicioMes == 0) inicioMes = 7;

    cal.setAttribute("value", anio + "/" + fill(mes));
    
    let idioma = cal.getAttribute('lang');
    const idiomaDocumento = document.documentElement.lang;
 
    while(true){
        if(idioma in mesesCLD)
            break;
        if(idioma in equivCLD){
            idioma = equivCLD[idioma];
            break;
        }      
        if(idioma != idiomaDocumento){
            idioma = idiomaDocumento;
            continue;
        }
        idioma = 'en'; //idioma por defecto
        break;
    }
    const rangoFlechaAbajo  = anio + '/' + (state == "meses" ? '12' : fill(mes));
    const rangoFlechaArriba = anio + '/' + (state == "meses" ? '01' : fill(mes));
    let html = '';
    html += `<div class="cal-head">
                <span class="textCLD" onclick="mostrarMesesCLD(${id})">${(state == "meses" ? '' : mesesCLD[idioma][mes - 1] + ' ') + anio}</span>
                <span cal-id="${id}" style="${max <= (rangoFlechaAbajo + "/31") ? 'display:none;' : ''} width:18px;" class="flecha abajo"  onclick="setCalendarioCLD(${id}, 1)">
                    <svg cal-id="${id}" class="flecha" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path cal-id="${id}" class="flecha" fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>
                </span>
                <span cal-id="${id}" style="${min >= rangoFlechaArriba ? 'display:none;' : (max <= rangoFlechaAbajo ? 'margin-right:38px;' : '')} width:18px;" class="flecha arriba" onclick="setCalendarioCLD(${id},-1)">
                    <svg cal-id="${id}" class="flecha" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path cal-id="${id}" class="flecha" fill="currentColor" d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path></svg>    
                </span>
            </div><div class ="cuadricula semana" style="${state == 'meses' ? 'display:none' : ''}">`;
    for (let i = 0; i < 7; i++)
        html += `<div>${diasSemanaCLD[idioma][i]}</div>`;
    html += `</div><div class="cuadricula dias" style="${state == 'meses' ? 'display:none' : ''}">`;

    for (let i = inicioMes; i > 1; i--)
        html += `<div class="disable">${diasMesAnterior - i + 2}</div>`;

    for (let i = 1; i <= 42 - inicioMes + 1; i++) {
        const hoy = (i == fechaActualCLD.getDate() && mes == fechaActualCLD.getMonth() + 1 && anio == fechaActualCLD.getFullYear());
        const nextMes = Math.floor(i / (diasMes + 1));
        const nDia = (i % (diasMes + 1)) + nextMes;
        let className = "";
        if (hoy) className = "hoy";
        if (nextMes == 1) className = "disable";
        if (selected != null) {
            let f = selected.split("/");
            if (f[0] == anio && f[1] == mes && f[2] == nDia && nextMes == 0)
                className += " selected";
        }
        let day = '';
        if (nextMes == 0) day = anio + '/' + fill(mes) + '/' + fill(nDia);
        if(day > max || day < min)className = "disable";
        html += `<div day = "${day}" onclick="selectDiaCLD(this)" class="${className}"> ${nDia}</div>`;
    }

    html += `</div><div class="meses" style="${state == 'meses' ? '' : 'display:none'}">`;
    for (let i = 0; i < 12; i++) {
        const fecha = anio + '/' + fill(i + 1);
        const fueraDeRango = (fecha + "/31") < min || fecha > max;
        const extra = fueraDeRango ? 'class="disable"' : 'onclick="setMesCLD(' + id + ',this)"';
        const mesString = idioma != 'ar'? mesesCLD[idioma][i].substring(0, 3) : mesesCLD['ar'][i];
        const style = idioma == 'ar'? 'style="text-align:right"' :'';
        html += `<div ${style} mes="${fecha}" ${extra} >${fueraDeRango ? '' : mesString}</div>`;
    }
    html += `</div>`;

    cal.innerHTML = html;
}
function formatoFechaCLD(fecha){
    return fecha.getUTCFullYear() + "/" + fill(fecha.getMonth() + 1) + "/" + fill(fecha.getDate());
}
function setCalendarioCLD(id, i) {
    const cal = calendariosCLD[id],
        value = cal.getAttribute("value");
    if (cal.getAttribute("paused") == "true") return;
    let nuevaFecha;
    if (cal.getAttribute("state") == "meses") {
        nuevaFecha = (parseInt(value.split("/")[0]) + i);
        nuevaFecha += i == 1 ? '/12' : '/01';
    }
    else nuevaFecha = offsetFechaCLD(value, i);
    cal.setAttribute("value", nuevaFecha);
    cargarCalendarioCLD(cal);
}
function setMesCLD(id, mes) {
    const cal = calendariosCLD[id];
    if (cal.getAttribute("paused") == "true") return;
    cal.setAttribute("value", mes.getAttribute("mes"));
    cal.setAttribute("state", "");
    cargarCalendarioCLD(cal);
}
function offsetFechaCLD(fecha, offset) {
    fecha = fecha.split("/");
    let anio = parseInt(fecha[0]);
    let mes = parseInt(fecha[1]);
    let anioOffset = 0;
    mes += offset;
    if (mes <= 0) {
        anioOffset--;
        mes = 12 + mes;
    }
    if (mes > 12) {
        mes = mes % 12;
        anioOffset++;
    }
    anio += anioOffset;
    return anio + "/" + fill(mes);
}
function selectDiaCLD(div) {
    if (div.getAttribute("class") != "disable") {
        let carnales = div.parentNode.childNodes;
        for (let i = 0; i < carnales.length; i++) {
            if (carnales[i].classList.contains("selected")) {
                carnales[i].classList.remove("selected");
                break;
            }
        }
        div.classList.add("selected");
        div.parentNode.parentNode.setAttribute("selected", div.getAttribute("day"));
    }
}

function fill(num) {
    return (num < 10 ? "0" : "") + num;
}
function diasEnMesCLD(m, y) {
    return m === 2 ? y & 3 || !(y % 25) && y & 15 ? 28 : 29 : 30 + (m + (m >> 3) & 1);
}
function mostrarMesesCLD(id) {
    const cal = calendariosCLD[id];
    cal.setAttribute("state", "meses");
    cargarCalendarioCLD(cal);
}

function getValue(cal) {
    let fecha = calendariosCLD[cal.getAttribute("id-cal")].getAttribute("selected");
    if (fecha) return fecha.split("/").join("-");
    return null;
}
function dayChange(e) {
    return e.target.classList.contains("selected") &&
        e.target.getAttribute("day") != "" &&
        e.target.tagName.toUpperCase() === "DIV";
}
function monthChange(e) {
    return (e.target.classList.contains("flecha") &&
        calendariosCLD[e.target.getAttribute("cal-id")].getAttribute("state") != "meses")
        ||
        (e.target.getAttribute("mes") != undefined &&
            !e.target.classList.contains("disable"));
}
function yearChange(e) {
    return e.target.classList.contains("flecha") &&
        calendariosCLD[e.target.getAttribute("cal-id")].getAttribute("state") == "meses";
}



