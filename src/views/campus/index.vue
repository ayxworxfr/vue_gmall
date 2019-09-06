<template>
  <div class="components-container">
    <div>
      <el-card class="card-campus">
        <el-card>
            <el-button
              :loading="loading"
              type="primary"
              class="card-button"
              @click.native.prevent="handleGetCampus"
            >
              {{ $t('campus.campusList') }}
            </el-button>
        </el-card>
        <el-card>
          <el-button
            :loading="loading"
            type="primary"
            class="card-button add"
            @click.native.prevent="handleAddCampus"
          >
            {{ $t('campus.addCampus') }}
          </el-button>
        </el-card>
        <el-card>
          <el-button
            :loading="loading"
            class="card-button"
            type="primary"
            @click.native.prevent="handleUpdateCampus"
          >
            {{ $t('campus.updateCampus') }}
          </el-button>
        </el-card>
        <el-card>
          <el-button
            :loading="loading"
            class="card-button"
            type="primary"
            @click.native.prevent="handleDeleteCampus"
          >
            {{ $t('campus.deleteCampus') }}
          </el-button>
        </el-card>
      </el-card>
    </div>

    <div class="editor-container">
      <draggable-list
        :campusList="campusList"
        campusList-title="List"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {getCampusList, addCampus, updateCampus, deleteCampus} from '@/api/campus'
import DraggableList from '@/components/DraggableList/index.vue'

@Component({
  name: 'campusList',
  components: {
    DraggableList
  }
})
export default class extends Vue {
  private campusList = []

  created() {
    this.fetchData()
  }

  
  private async handleGetCampus() {
    const { data } = await getCampusList({})
    this.campusList = data.items.splice(0, 5)
  }
  
  private async handleAddCampus(campus:any) {
    const { data } = await addCampus(campus)
  }
  
  private async handleUpdateCampus(id: number, campus: any) {
    const { data } = await updateCampus(id, campus)
  }
  
  private async handleDeleteCampus(id: number) {
    const { data } = await deleteCampus(id)
  }

  private async fetchData() {
    const { data } = await getCampusList({ /* Your params here */ })
    this.campusList = data.items.splice(0, 5)
  }
}
</script>

<style lang="scss" scoped>
.card-campus{
  width:50%;
}

.card-button {
  width:100px; 
  margin-bottom:-5px;
  background-color: rgb(28, 221, 108);
}
</style>