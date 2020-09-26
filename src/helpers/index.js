export function capitalizeString(string) {
    const uncappedArr = string.split(' ');
    const cappedArr = uncappedArr.map(subStr => subStr[0].toUpperCase() + subStr.slice(1));
    return cappedArr.join(' ');
}

export function convertToQueryString(string) {
    return string.trim().replace(/ /g, '+').replace(/,/g, '')
}

export function convertDateToMMDDYYYY(date) {
    let rawDate = new Date(date);
    let displayDate = `${rawDate.getMonth() + 1}/${rawDate.getDay() + 1}/${rawDate.getFullYear()}`;
    return displayDate;
}

export function scrollToTop() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
}