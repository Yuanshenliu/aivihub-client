import variables from '@/styles/variables.module.scss'

function useAppMainSize(gapWidth: number = 0, gapHeight: number = 0) {
  const navHeight = Number(variables.navbarHeight.match(/\d/g)?.join(''))
  const sideBarWidth = Number(variables.sideBarWidth.match(/\d/g)?.join(''))

  const windowBounding = useWindowSize()

  const w = computed(() => windowBounding.width.value - sideBarWidth + 'px')

  return {
    width: computed(() => windowBounding.width.value - sideBarWidth - gapWidth * 2),
    height: computed(() => windowBounding.height.value - navHeight - gapHeight),
    style: computed(() => ({
      width: w.value,
      paddingLeft: gapWidth + 'px',
      paddingRight: gapWidth + 'px'
    }))
  }
}

export default useAppMainSize
