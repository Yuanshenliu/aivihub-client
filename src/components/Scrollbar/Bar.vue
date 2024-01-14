<script setup lang="ts">
import {BAR_MAP, renderThumbStyle} from "./util.ts";

const props = defineProps<{ vertical?: boolean, size: string, move: number }>()
const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])
const wrap = inject('wrap')
const cursorDown = ref<boolean>(false)
const thumb = ref<HTMLDivElement>()
const barRef = ref<HTMLDivElement>()
const axis = reactive({X: 0, Y: 0})

const clickTrackHandler = (e: any) => {
  const offset = Math.abs(e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]);
  // @ts-ignore
  const thumbHalf = (thumb.value[bar.value.offset] / 2);
  // @ts-ignore
  const thumbPositionPercentage = ((offset - thumbHalf) * 100 / barRef.value[bar.value.offset]);
  // @ts-ignore
  wrap.value.scrollTo({
    // @ts-ignore
    [bar.value.direction]: (thumbPositionPercentage * wrap.value[bar.value.scrollSize] / 100),
    behavior: "smooth"
  })
}

// @ts-ignore
const clickThumbHandler = (e) => {
  if (e.ctrlKey || e.button === 2) {
    return;
  }
  startDrag(e);
  // @ts-ignore
  axis[bar.value.axis] = (e.currentTarget[bar.value.offset] - (e[bar.value.client] - e.currentTarget.getBoundingClientRect()[bar.value.direction]))
}

// @ts-ignore
const startDrag = (e) => {
  e.stopImmediatePropagation();
  cursorDown.value = true;

  document.addEventListener('mousemove', mouseMoveDocumentHandler)
  document.addEventListener('mouseup', mouseUpDocumentHandler)
  document.onselectstart = () => false;
}

const mouseMoveDocumentHandler = (e:any) => {
  if (cursorDown.value === false) return
  // @ts-ignore
  const prevPage = axis[bar.value.axis]

  if (!prevPage) return;
  // @ts-ignore
  const offset = ((barRef.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1);
  // @ts-ignore
  const thumbClickPosition = (thumb.value[bar.value.offset] - prevPage);
  // @ts-ignore
  const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / barRef.value[bar.value.offset]);
  // @ts-ignore
  wrap.value[bar.value.scroll] = (thumbPositionPercentage * wrap.value[bar.value.scrollSize] / 100);
}

const mouseUpDocumentHandler = () => {
  cursorDown.value = false
  // @ts-ignore
  axis[bar.value.axis] = 0;
  document.removeEventListener('mousemove', mouseMoveDocumentHandler)
  document.onselectstart = null;
}

onUnmounted(() => document.removeEventListener('mouseup', mouseUpDocumentHandler))
</script>

<template>
  <div ref="barRef" class="scrollbar__bar" :class="'is-' + bar.key" @mousedown="clickTrackHandler">
    <div ref="thumb" @mousedown="clickThumbHandler" class="scrollbar__thumb"
         :style="renderThumbStyle({move: props.move, size: props.size, bar: bar})"></div>
  </div>
</template>
