export default function numberFormater(value) {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, style: "decimal" }).format(value)
}