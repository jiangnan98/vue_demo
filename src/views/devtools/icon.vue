<template >
  <div class="icons-container" >
    <div >
      <el-card class="box-card" >
        <div slot="header" class="clearfix" >
          <span >
            图标库
            <svg-icon icon-class="table" />
          </span>
        </div>
        <div >
          <el-tabs type="border-card" >
            <el-tab-pane label="SVG图标" >
              <div
                v-for="item of svgIcons"
                :key="item"
                @click="handleClipboard(generateIconCode(item), $event)"
              >
                <el-tooltip placement="top" >
                  <div slot="content" >{{ generateIconCode(item) }}</div>
                  <div class="icon-item" >
                    <svg-icon :icon-class="item" class-name="disabled" />
                    <span >{{ item }}</span>
                  </div>
                </el-tooltip>
              </div>
            </el-tab-pane>
            <el-tab-pane label="IconFont图标" >
              <div
                v-for="item of IconFontList"
                :key="item"
                @click="handleClipboard(generateIconCode(item), $event)"
              >
                <el-tooltip placement="top" >
                  <div slot="content" >{{ generateIconFontCode(item) }}</div>
                  <div class="icon-item" >
                    <span class="iconfont f30" :class="item" />
                    <span >{{ item }}</span>
                  </div>
                </el-tooltip>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Element图标" >
              <div
                v-for="item of elementIcons"
                :key="item"
                @click="handleClipboard(generateElementIconCode(item), $event)"
              >
                <el-tooltip placement="top" >
                  <div slot="content" >{{ generateElementIconCode(item) }}</div>
                  <div class="icon-item" >
                    <i :class="'el-icon-' + item" />
                    <span >{{ item }}</span>
                  </div>
                </el-tooltip>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard'
import svgIcons from './js/svg-icons'
import elementIcons from './js/element-icons'
import IconFontList from './js/iconfont'

export default {
  name: 'Icon',
  data() {
    return {
      svgIcons,
      elementIcons,
      IconFontList
    }
  },
  created() { },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    generateElementIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`
    },
    generateIconFontCode(symbol) {
      return `<span class="iconfont ${symbol}"></span>`
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    }
  }
}
</script>
<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
    .f30 {
      font-size: 30px;
    }
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
