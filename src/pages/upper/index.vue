<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';


const { height } = useAppMainSize(0, 0)

const activeTab = ref('UpperList')
const loading = ref<boolean>(true)

const tabs = [
    {
        label: '列表1',
        value: 'UpperList'
    },
    {
        label: '列表2',
        value: 'VideoList'
    }
]
</script>

<template>
    <div class="w-full bg-[#f1f2f3] dark:bg-[#232527]" :style="{ 'min-height': height + 'px' }">
        <div class="w-full h-[115px] bg-regular px-8 box-border flex justify-center">
            <div class="profile-wrap h-full max-w-[1600px] w-full flex justify-between">
                <div class="flex  h-full items-center">
                    <a-avatar v-if="!loading" :size="75" class="flex-shrink-0">
                        <template #icon>
                            <UserOutlined />
                        </template>
                    </a-avatar>

                    <div v-else class="w-[75px] h-[75px] rounded-full loading-wrap flex-shrink-0"></div>

                    
                    <div class="ml-4 flex flex-col">
                        <span v-if="!loading" class="text-lg text-regular line-clamp-2">
                            搽搽
                        </span>
                        <div v-else class="w-20 h-6 loading-wrap"></div>
                        
                        <span  v-if="!loading" class="text-sm text-secondary mt-1 line-clamp-1">
                            Tailwind lets you conditionally apply utility classes in different states using variant modifiers. For example
                        </span>

                        <div v-else class="w-60 h-4 mt-2 loading-wrap"></div>

                        <div class="mt-2 text-sm">
                          
                        </div>
                    </div>
                </div>

                
                <div class="flex flex-shrink-0 w-[255px] items-center h-full justify-end">
                    <a-button v-if="!loading" size="small" class="mr-4" type="primary">创建合集</a-button>
                    <div v-else class="w-[71px] h-6 mr-4 loading-wrap"></div>

                    <a-button v-if="!loading" size="small" type="primary">创建视频</a-button>
                    <div v-else class="w-[71px] h-6 loading-wrap"></div>
                </div>
            </div>
        </div>


        <div class="sticky top-0 bg-regular flex px-6 justify-center">
            <div class="w-full flex max-w-[1600px]">
                <Tabs :loading="loading" v-model="activeTab" :tabs="tabs" class="no-drag" slider-cls="w-3 mb-0.5" tab-cls="text-[15px]"></Tabs>
            </div>
        </div>

        <div>

        </div>
    </div>
</template>

<style lang="scss" scoped>.profile-wrap {}</style>OP                                        