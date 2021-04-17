export default function leadingZero(num: String): String {
  return `${num}`.length === 1 ? `0` + num : num
}
