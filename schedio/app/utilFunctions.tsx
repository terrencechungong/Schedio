export const truncateString = (str: string, maxLength: number): string => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength).concat("...")
}

export const generateRandom4Digit = () => {
    return Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit number
  };
  