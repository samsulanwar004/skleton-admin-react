import moment from 'moment'

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
// export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
//   if (!value) return value
//   return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
// }

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === 'admin') return '/'
  if (userRole === 'client') return '/access-control'
  return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

// ** Convert rupiah
export const convertToRupiah = (angka:number, lbl = '') => {

  let negatif = ''
  let rupiah = ''

  if (angka < 0) {
    angka = Math.abs(angka)
    negatif = '-'
  }

  const angkarev = angka.toString().split('').reverse().join('')
  for (let i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += `${angkarev.substr(i, 3)}.`

  return `${negatif} ${lbl} ${rupiah.split('', rupiah.length - 1).reverse().join('')}`
}

// ** format date
export const formatDate = (value) => {
  if (null === value || undefined === value) return '-'
    return moment(value).format('DD/MM/YYYY') //dd mmm yyyy
}

export const formatDateTime = (value) => {
  if (null === value || undefined === value) return '-'
    return moment(value).format('DD/MM/YYYY HH:mm') //dd mmm yyyy
}

export const formatTime = (value) => {
  if (null === value || undefined === value) return '-'
    return moment(value).format('HH:mm') //dd mmm yyyy
}

export const formatDateFull = (value) => {
  if (null === value || undefined === value) return '-'
    return moment(value).format('DD MMMM YYYY') //dd mmm yyyy
}

//terbilang
export const terbilang = (bilangan) => {
  bilangan    = String(bilangan)
  const angka   = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')
  const kata    = new Array('', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan')
  const tingkat = new Array('', 'Ribu', 'Juta', 'Milyar', 'Triliun')

  const panjang_bilangan = bilangan.length
  let kaLimat = ""
   /* pengujian panjang bilangan */
   if (panjang_bilangan > 15) {
     kaLimat = "Diluar Batas"
     return kaLimat
   }

   /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
   for (let i = 1; i <= panjang_bilangan; i++) {
     angka[i] = bilangan.substr(-(i), 1)
   }

   let i = 1
   let j = 0

   /* mulai proses iterasi terhadap array angka */
   while (i <= panjang_bilangan) {

     let subkaLimat = ""
     let kata1 = ""
     let kata2 = ""
     let kata3 = ""

     /* untuk Ratusan */
     if (angka[i + 2] !== "0") {
       if (angka[i + 2] === "1") {
         kata1 = "Seratus"
       } else {
         kata1 = `${kata[angka[i + 2]]} Ratus`
       }
     }

     /* untuk Puluhan atau Belasan */
     if (angka[i + 1] !== "0") {
       if (angka[i + 1] === "1") {
         if (angka[i] === "0") {
           kata2 = "Sepuluh"
         } else if (angka[i] === "1") {
           kata2 = "Sebelas"
         } else {
           kata2 = `${kata[angka[i]]} Belas`
         }
       } else {
         kata2 = `${kata[angka[i + 1]]} Puluh`
       }
     }

     /* untuk Satuan */
     if (angka[i] !== "0") {
       if (angka[i + 1] !== "1") {
         kata3 = kata[angka[i]]
       }
     }

     /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
     if ((angka[i] !== "0") || (angka[i + 1] !== "0") || (angka[i + 2] !== "0")) {
       subkaLimat = `${kata1} ${kata2} ${kata3} ${tingkat[j]}`
     }

     /* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
     kaLimat = subkaLimat + kaLimat
     i = i + 3
     j = j + 1

   }

   /* mengganti Satu Ribu jadi Seribu jika diperlukan */
   if ((angka[5] === "0") && (angka[6] === "0")) {
     kaLimat = kaLimat.replace("Satu Ribu", "Seribu")
   }

   return `${kaLimat} Rupiah`
}

export const shuffle = (array) => {
  /* eslint-disable */
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
  /* eslint-enable */
}

export const timeToSeconds = (time) => {
  /* eslint-disable */
  const seconds = time.split(":")
  return (+seconds[0]) * 60 * 60 + (+seconds[1]) * 60 + (+seconds[2])
  /* eslint-enable */
}

export const days = (delta) => {
  return Math.floor(delta / 86400)
}

export const hours = (delta) => {
  return Math.floor(delta / 3600) % 24
}

export const minutes = (delta) => {
  return Math.floor(delta / 60) % 60
}

export const ipks = () => {
  let ipk = 1.00
  const ipks = []
  for (let i = 100; i <= 400; i++) {
    ipks.push({
      label: ipk.toFixed(2),
      value: ipk.toFixed(2)
    })
    ipk = parseFloat(ipk) + parseFloat(0.01)
  }

  return ipks
}
