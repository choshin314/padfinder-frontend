export function capitalizeString(string) {
    const uncappedArr = string.split(' ');
    const cappedArr = uncappedArr.map(subStr => subStr[0].toUpperCase() + subStr.slice(1));
    return cappedArr.join(' ');
}