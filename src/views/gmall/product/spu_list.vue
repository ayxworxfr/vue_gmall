<template>
  <div class="components-container">
    <div>
      <book-type-option v-model="bookType" />
    </div>
    <div>
      spu名称<el-input style="display:inline-block;"></el-input>
    </div>
    <div style="margin-top=30px">
      spu描述
      <div>
        <tinymce
          v-if="tinymceActive"
          v-model="content"
          :height="400"
        />
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div
        class="editor-content"
        v-html="content"
      />
    </div>
    
    <div>
      图片上传
      
    </div>
    <div>
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          width="80"
          align="center"
          label="ID"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="Date"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp | parseTime }}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="Author"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="105px"
          label="Importance"
        >
          <template slot-scope="scope">
            <svg-icon
              v-for="n in +scope.row.importance"
              :key="n"
              name="star"
              class="meta-item__icon"
            />
          </template>
        </el-table-column>

        <el-table-column
          class-name="status-col"
          label="Status"
          width="110"
        >
          <template slot-scope="{row}">
            <el-tag :type="row.status | articleStatusFilter">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          min-width="300px"
          label="Title"
        >
          <template slot-scope="{row}">
            <router-link
              :to="'/example/edit/'+row.id"
              class="link-type"
            >
              <span>{{ row.title }}</span>
            </router-link>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="Actions"
          width="120"
        >
          <template slot-scope="scope">
            <router-link :to="'/example/edit/'+scope.row.id">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-edit"
              >
                Edit
              </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>

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
import BookTypeOption from './components/LevelTypeOption.vue'
import { getArticles } from '@/api/articles'
import { IArticleData } from '@/api/types'
import Tinymce from '@/components/Tinymce/index.vue'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'campusList',
  components: {
    DraggableList,
    BookTypeOption,
    Pagination,
    Tinymce
  }
})
export default class extends Vue {
  private campusList = []
  private bookType = 'xlsx'

  // table
  private total = 0
  private list: IArticleData[] = []
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 20
  }
  // tinymce
  private content =
    `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="Logo" src="./favicon.ico" alt="Logo" width="100" height="100" /><ul>
      <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
    </ul>`
  private tinymceActive = true

  deactivated() {
    this.tinymceActive = false
  }

  activated() {
    this.tinymceActive = true
  }

  created() {
    this.getList()
  }


  private async getList() {
    this.listLoading = true
    const { data } = await getArticles(this.listQuery)
    this.list = data.items
    this.total = data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
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

.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

.editor-content {
  margin-top: 20px;
}
</style>