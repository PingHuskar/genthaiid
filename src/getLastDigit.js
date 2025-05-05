const getLastDigit = (firsttwelvedigits) => {
    return (
        (11 -
            (firsttwelvedigits
                .split("")
                .map((i, idx) => parseInt(i) * (13 - idx))
                .reduce((a, b) => a + b, 0) %
                11)) %
        10
    );
}

export default getLastDigit;