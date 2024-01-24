import type { Ref } from 'vue'
import { computed } from 'vue'
/**
 *
 */
interface UseItemField {
  containerWidth: Ref<number>
  containerHeight: Ref<number>
  itemMinWidth: number
  gapX: number
  gapY: number
  picRate: number
  contextHeight: number
}

function useItem(field: UseItemField) {
  const { containerWidth, containerHeight, itemMinWidth, gapY, gapX, picRate, contextHeight } =
    field

  const itemNumber = computed<number>(() => {
    const x = (containerWidth.value + gapX) / (gapX + itemMinWidth)
    return Math.ceil(x)
  })

  const itemWidth = computed<number>(() => {
    return (containerWidth.value - gapX * (itemNumber.value - 1)) / itemNumber.value
  })

  const imgH = computed<number>(() => {
    return itemWidth.value / picRate
  })

  const itemColNum = computed<number>(() => {
    return Number(Math.ceil(containerHeight.value / (imgH.value + contextHeight + gapY)))
  })

  return {
    cardItem: function (index: number) {
      return computed(() => {
        const yus = (index - 1) % itemNumber.value

        console.log((itemNumber.value - 1) / itemNumber.value)

        return {
          width: `${Math.round(itemWidth.value - 1 / itemNumber.value)}px`,
          marginLeft: yus === 0 ? 0 : gapX / 2 + 'px',
          marginRight: yus === itemNumber.value - 1 ? 0 : gapX / 2 + 'px',
          '--poster-aspect-ratio': picRate
        }
      })
    },
    loadingTotal: itemColNum.value * itemNumber.value
  }
}

export default useItem
