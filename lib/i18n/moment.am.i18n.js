moment.locale('am', {
    months : "ጃንዋሪ_ፌብሩዋሪ_ማርች_ኤፕሪል_ሜይ_ጁን_ጁላይ_ዖገስት_ሴፕቴምበር_ዖክቶበር_ኖቬምበር_ዲሴምበር".split("_"),
    monthsShort : "ጃን._ፌብ._ማር._ኤፕ._ሜይ_ጁን_ጁላ._ዖገ._ሴፕ._ዖክ._ኖቬ._ዲሴ.".split("_"),
    weekdays : "ዕሁድ_ሰኞ_ማክሰኞ_ዕሮብ_ሃሙስ_ዓርብ_ቅዳሜ".split("_"),
    weekdaysShort : "ዕሁ._ሰኞ_ማክ._ዕሮ._ሃሙ._ዓር._ቅዳ.".split("_"),
    weekdaysMin : "ዕሁ_ሰኞ_ማክ_ዕሮ_ሃሙ_ዓር_ቅዳ".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        LTS : "HH:mm:ss",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[ዛሬ በ] LT",
        nextDay: '[ነገ በ] LT',
        nextWeek: 'dddd [በ] LT',
        lastDay: '[ትላንት በ] LT',
        lastWeek: 'dddd [እስለ] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "በ %s ውስጥ",
        past : "%s በፊት",
        s : "ጥቂት ሴኮንዶች",
        m : "አንድ ደቂቃ",
        mm : "%d ደቂቃ",
        h : "አንድ ሰዓት",
        hh : "%d ሰዓት",
        d : "አንድ ቀን",
        dd : "%d ቀን",
        M : "አንድ ወር",
        MM : "%d ወር",
        y : "አንድ ዓመት",
        yy : "%d ዓመት"
    },
    ordinalParse : /\d{1,2}(ናት|ኛ)/,
    ordinal : function (number) {
        return number + (number === 1 ? 'ናት' : 'ኛ');
    },
    meridiemParse: /ጠዋት|ከሰዓት/,
    isPM: function (input) {
        return input.charAt(0) === 'ከ';
    },
    // in case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example)
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */
    // },
    meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'ጠዋት' : 'ከሰዓት';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

moment.locale('am');