export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    }).format(value);
};


export const parseCurrency = (formattedValue: string): string => {
    return formattedValue.replace(/[^0-9.-]+/g, "");
};

export const generateSixYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 6 }, (_, i) => String(currentYear - i));
};

export const generatePassword = (length: number): string => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}