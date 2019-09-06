<template>
  <div class="components-container">
    <div style="display:inline-block;" class="levelType">
      <label class="radio-label">一级分类: </label>
      <el-select
        v-model="levelType"
        style="width:120px;"
      >
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <div style="display:inline-block;" class="levelType">
      <label class="radio-label">二级分类: </label>
      <el-select
        v-model="levelType"
        style="width:120px;"
      >
        <el-option
          v-for="item in options2"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <div style="display:inline-block;" class="levelType">
      <label class="radio-label">三级分类: </label>
      <el-select
        v-model="levelType"
        style="width:120px;"
      >
        <el-option
          v-for="item in options3"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'LevelTypeOption'
})
export default class extends Vue {
  @Prop({ required: true }) private value!: string

  private options = ['xlsx', 'csv', 'txt']
  private options2 = ['xlsx', 'csv', 'txt']
  private options3 = ['xlsx', 'csv', 'txt']

  get levelType() {
    return this.value
  }

  set levelType(value) {
    this.$emit('input', value)
  }
}
</script>

<style lang="scss" scoped>
.levelType {
  margin-left:140px;
}
</style>