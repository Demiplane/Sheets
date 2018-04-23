const combineClasses = (firstClasses?: string, secondClasses?: string) => {
    firstClasses = firstClasses ? firstClasses.trim() : '';
    secondClasses = secondClasses ? secondClasses.trim() : '';

    return (firstClasses.length && secondClasses.length)
        ? firstClasses + ' ' + secondClasses
        : firstClasses + secondClasses;
};

export default combineClasses;