export const isPrime = (num: number): boolean => {
  for (let i = 2; i < num; i++) if (num % i === 0) return false
  return num > 1
}

export const getMaxWidth = (itemsLength: number): number => {
    const cleanedItemLength = isPrime(itemsLength) ? itemsLength + 1 : itemsLength;
    const result = Array.from(Array(cleanedItemLength).keys()).reduce((acc, denominator) => {
      if (cleanedItemLength % denominator === 0 && denominator != 1 && denominator != cleanedItemLength) {
        const result  = cleanedItemLength / denominator
  
        if ((denominator / result) >= 1.5 && (denominator / result) <= 5) {
          return acc.concat(denominator)
        }
      }
      return acc
    }, [])
  
   
    if (result.length > 0) {
      return result[0]
    }
  
    if (itemsLength < 8 && result.length === 0) {
      return itemsLength
    }
    
    return getMaxWidth(itemsLength + 1)
  }
  