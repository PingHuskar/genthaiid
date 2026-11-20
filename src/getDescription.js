import verify from "./verify";

// Person types by first digit.
// Sources: https://www.wongnai.com/articles/id-number-meaning
//          https://www.jobsworkerservice.com/thai-id-number-checker/
export const personTypes = {
    "1": {
        th: "คนสัญชาติไทยที่เกิดตั้งแต่วันที่ 1 ม.ค. 2527 และแจ้งเกิดภายในกำหนดเวลา (15 วัน)",
        en: "Thai national born on or after 1 Jan 1984, birth registered on time (within 15 days)",
    },
    "2": {
        th: "คนสัญชาติไทยที่เกิดตั้งแต่วันที่ 1 ม.ค. 2527 แต่แจ้งเกิดเกินกำหนดเวลา (เกิน 15 วัน)",
        en: "Thai national born on or after 1 Jan 1984, birth registered late (after 15 days)",
    },
    "3": {
        th: "คนไทยหรือคนต่างด้าวที่มีชื่ออยู่ในทะเบียนบ้านก่อนวันที่ 31 พ.ค. 2527",
        en: "Thai or foreigner already listed in a house registration before 31 May 1984",
    },
    "4": {
        th: "คนไทยหรือคนต่างด้าวที่ย้ายเข้าทะเบียนบ้านโดยยังไม่มีเลขประจำตัวประชาชน (ช่วงเริ่มให้เลข)",
        en: "Thai or foreigner moved into a house registration without an ID number when numbering began",
    },
    "5": {
        th: "คนไทยที่ได้รับอนุมัติให้เพิ่มชื่อเข้าในทะเบียนบ้านภายหลัง เนื่องจากตกสำรวจหรือกรณีอื่น",
        en: "Thai national added to a house registration later (missed in the census or other cases)",
    },
    "6": {
        th: "ผู้ที่เข้าเมืองโดยไม่ชอบด้วยกฎหมาย หรือคนต่างด้าว/ชนกลุ่มน้อยที่อาศัยอยู่ในไทยชั่วคราว ยังไม่ได้สัญชาติไทย",
        en: "Illegal immigrant, or foreigner/ethnic minority residing in Thailand temporarily, without Thai nationality",
    },
    "7": {
        th: "บุตรของบุคคลประเภท 6 ที่เกิดในประเทศไทย",
        en: "Child of a type-6 person, born in Thailand",
    },
    "8": {
        th: "คนต่างด้าวที่เข้าเมืองโดยชอบด้วยกฎหมาย หรือผู้ที่ได้สัญชาติไทยโดยการแปลงสัญชาติ",
        en: "Legal foreign resident, or person who acquired Thai nationality by naturalization",
    },
    "0": {
        th: "บุคคลที่ไม่มีสถานะทางทะเบียน (บัตรขาว)",
        en: "Person without registration status (white card)",
    },
    "00": {
        th: "แรงงานต่างด้าว 3 สัญชาติ (เมียนมา ลาว กัมพูชา) ตามทะเบียนประวัติแรงงานต่างด้าว",
        en: "Migrant worker from Myanmar, Laos or Cambodia (foreign worker registry)",
    },
};

// Province codes (digits 2-3), Department of Provincial Administration.
export const provinces = {
    "10": ["กรุงเทพมหานคร", "Bangkok"],
    "11": ["สมุทรปราการ", "Samut Prakan"],
    "12": ["นนทบุรี", "Nonthaburi"],
    "13": ["ปทุมธานี", "Pathum Thani"],
    "14": ["พระนครศรีอยุธยา", "Phra Nakhon Si Ayutthaya"],
    "15": ["อ่างทอง", "Ang Thong"],
    "16": ["ลพบุรี", "Lop Buri"],
    "17": ["สิงห์บุรี", "Sing Buri"],
    "18": ["ชัยนาท", "Chai Nat"],
    "19": ["สระบุรี", "Saraburi"],
    "20": ["ชลบุรี", "Chon Buri"],
    "21": ["ระยอง", "Rayong"],
    "22": ["จันทบุรี", "Chanthaburi"],
    "23": ["ตราด", "Trat"],
    "24": ["ฉะเชิงเทรา", "Chachoengsao"],
    "25": ["ปราจีนบุรี", "Prachin Buri"],
    "26": ["นครนายก", "Nakhon Nayok"],
    "27": ["สระแก้ว", "Sa Kaeo"],
    "30": ["นครราชสีมา", "Nakhon Ratchasima"],
    "31": ["บุรีรัมย์", "Buri Ram"],
    "32": ["สุรินทร์", "Surin"],
    "33": ["ศรีสะเกษ", "Si Sa Ket"],
    "34": ["อุบลราชธานี", "Ubon Ratchathani"],
    "35": ["ยโสธร", "Yasothon"],
    "36": ["ชัยภูมิ", "Chaiyaphum"],
    "37": ["อำนาจเจริญ", "Amnat Charoen"],
    "38": ["บึงกาฬ", "Bueng Kan"],
    "39": ["หนองบัวลำภู", "Nong Bua Lam Phu"],
    "40": ["ขอนแก่น", "Khon Kaen"],
    "41": ["อุดรธานี", "Udon Thani"],
    "42": ["เลย", "Loei"],
    "43": ["หนองคาย", "Nong Khai"],
    "44": ["มหาสารคาม", "Maha Sarakham"],
    "45": ["ร้อยเอ็ด", "Roi Et"],
    "46": ["กาฬสินธุ์", "Kalasin"],
    "47": ["สกลนคร", "Sakon Nakhon"],
    "48": ["นครพนม", "Nakhon Phanom"],
    "49": ["มุกดาหาร", "Mukdahan"],
    "50": ["เชียงใหม่", "Chiang Mai"],
    "51": ["ลำพูน", "Lamphun"],
    "52": ["ลำปาง", "Lampang"],
    "53": ["อุตรดิตถ์", "Uttaradit"],
    "54": ["แพร่", "Phrae"],
    "55": ["น่าน", "Nan"],
    "56": ["พะเยา", "Phayao"],
    "57": ["เชียงราย", "Chiang Rai"],
    "58": ["แม่ฮ่องสอน", "Mae Hong Son"],
    "60": ["นครสวรรค์", "Nakhon Sawan"],
    "61": ["อุทัยธานี", "Uthai Thani"],
    "62": ["กำแพงเพชร", "Kamphaeng Phet"],
    "63": ["ตาก", "Tak"],
    "64": ["สุโขทัย", "Sukhothai"],
    "65": ["พิษณุโลก", "Phitsanulok"],
    "66": ["พิจิตร", "Phichit"],
    "67": ["เพชรบูรณ์", "Phetchabun"],
    "70": ["ราชบุรี", "Ratchaburi"],
    "71": ["กาญจนบุรี", "Kanchanaburi"],
    "72": ["สุพรรณบุรี", "Suphan Buri"],
    "73": ["นครปฐม", "Nakhon Pathom"],
    "74": ["สมุทรสาคร", "Samut Sakhon"],
    "75": ["สมุทรสงคราม", "Samut Songkhram"],
    "76": ["เพชรบุรี", "Phetchaburi"],
    "77": ["ประจวบคีรีขันธ์", "Prachuap Khiri Khan"],
    "80": ["นครศรีธรรมราช", "Nakhon Si Thammarat"],
    "81": ["กระบี่", "Krabi"],
    "82": ["พังงา", "Phangnga"],
    "83": ["ภูเก็ต", "Phuket"],
    "84": ["สุราษฎร์ธานี", "Surat Thani"],
    "85": ["ระนอง", "Ranong"],
    "86": ["ชุมพร", "Chumphon"],
    "90": ["สงขลา", "Songkhla"],
    "91": ["สตูล", "Satun"],
    "92": ["ตรัง", "Trang"],
    "93": ["พัทลุง", "Phatthalung"],
    "94": ["ปัตตานี", "Pattani"],
    "95": ["ยะลา", "Yala"],
    "96": ["นราธิวาส", "Narathiwat"],
};

/**
 * Describe what each part of a 13-digit Thai ID number means.
 * Dashes and spaces are ignored. Returns undefined if the input is not 13 digits.
 */
export default (strid) => {
    if (strid === undefined || strid === null) return undefined;
    const id = String(strid).replace(/[\s-]/g, "");
    if (!/^\d{13}$/.test(id)) return undefined;

    const typeCode = id.startsWith("00") ? "00" : id[0];
    const type = personTypes[typeCode];
    const provinceCode = id.slice(1, 3);
    const province = provinces[provinceCode];

    return {
        id,
        formatted: `${id[0]}-${id.slice(1, 5)}-${id.slice(5, 10)}-${id.slice(10, 12)}-${id[12]}`,
        valid: verify(id),
        personType: { code: typeCode, th: type ? type.th : null, en: type ? type.en : null },
        province: province
            ? { code: provinceCode, th: province[0], en: province[1] }
            : { code: provinceCode, th: null, en: null },
        registrationOffice: id.slice(1, 5),
        district: id.slice(3, 5),
        group: id.slice(5, 10),
        sequence: id.slice(10, 12),
        checkDigit: id[12],
    };
};
