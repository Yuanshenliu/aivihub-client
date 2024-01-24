import variables from '@/styles/variables.module.scss'

function useAppMainSize(gapWidth: number = 0, gapHeight: number = 0) {
  const navHeight = Number(variables.navbarHeight.match(/\d/g)?.join(''))
  const sideBarWidth = Number(variables.sideBarWidth.match(/\d/g)?.join(''))

  const windowBounding = useWindowSize()

  return {
    width: computed(() => windowBounding.width.value - sideBarWidth - gapWidth),
    height: computed(() => windowBounding.height.value - navHeight - gapHeight)
  }
}

export default useAppMainSize
